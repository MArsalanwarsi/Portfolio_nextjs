import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

// Run after `next build`: the list includes lazy chunks as well as the first page.
// Original, unused photos and development files never enter the offline cache.
const root = process.cwd();
const portfolio = JSON.parse(await readFile(path.join(root, "data/portfolio.json"), "utf8"));
const buildId = (await readFile(path.join(root, ".next/BUILD_ID"), "utf8")).trim();
const assets = new Map();
const assetPattern = /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|webp|avif|svg|ico|pdf)$/i;

async function addAsset(url, file) {
  const content = await readFile(file);
  assets.set(url, { url, bytes: content.byteLength, digest: createHash("sha256").update(content).digest("hex") });
}

async function walk(directory, prefix) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    const url = `${prefix}/${encodeURIComponent(entry.name)}`;
    if (entry.isDirectory()) await walk(file, url);
    else if (assetPattern.test(entry.name)) await addAsset(url, file);
  }
}

function localReferences(value, result = new Set()) {
  if (typeof value === "string" && value.startsWith("/") && !value.startsWith("//") && assetPattern.test(value)) result.add(value);
  else if (value && typeof value === "object") Object.values(value).forEach((item) => localReferences(item, result));
  return result;
}

await walk(path.join(root, ".next/static"), "/_next/static");
for (const file of ["cursor.svg", "cursor-link.svg", "brand-mark.svg"]) {
  await addAsset(`/${file}`, path.join(root, "public", file));
}
for (const url of localReferences(portfolio)) {
  await addAsset(url, path.join(root, "public", url.slice(1)));
}
// Include conventional install icons when present; do not download social cards.
for (const entry of await readdir(path.join(root, "public"), { withFileTypes: true })) {
  if (entry.isFile() && /^(?:icon(?:-\d+)?|apple-touch-icon|favicon)\.(?:png|svg|ico)$/i.test(entry.name)) {
    await addAsset(`/${entry.name}`, path.join(root, "public", entry.name));
  }
}
if (await stat(path.join(root, "public/icons")).catch(() => null)) {
  await walk(path.join(root, "public/icons"), "/icons");
}
for (const route of ["manifest.webmanifest", "apple-icon"]) {
  const file = path.join(root, ".next/server/app", `${route}.body`);
  if (await stat(file).catch(() => null)) await addAsset(`/${route}`, file);
}

const entries = [...assets.values()].sort((a, b) => a.url.localeCompare(b.url));
const totalBytes = entries.reduce((sum, entry) => sum + entry.bytes, 0);
if (entries.length > 512 || totalBytes > 12 * 1024 * 1024) {
  throw new Error("Offline assets exceed the 512-file / 12 MiB budget. Optimize assets before publishing.");
}
const version = createHash("sha256").update(buildId).update(JSON.stringify(entries)).digest("hex").slice(0, 20);
await writeFile(path.join(root, "public/offline-assets.json"), JSON.stringify({ version, totalBytes, assets: entries.map(({ url }) => url) }));
console.log(`Offline manifest: ${entries.length} assets, ${(totalBytes / 1024 / 1024).toFixed(2)} MiB, release ${version}.`);
