/* Offline enhancement for this portfolio. No API, analytics or RSC caching. */
const CACHE_PREFIX = "arsalan-portfolio-v1-";
const READY_KEY = new URL("/__portfolio_offline_ready__", self.location.origin).href;
const HOME_URL = new URL("/", self.location.origin).href;
const STATIC_FILE = /\.(?:js|css|woff2?|ttf|otf|png|jpe?g|webp|avif|svg|ico|pdf)$/i;
const METADATA_FILES = new Set(["/icon.png", "/apple-icon", "/manifest.webmanifest"]);
let warming;

self.addEventListener("install", () => {
  // Deliberately no skipWaiting: existing tabs keep their compatible worker.
});
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

async function completedCaches() {
  const names = (await caches.keys()).filter((name) => name.startsWith(CACHE_PREFIX));
  const complete = await Promise.all(names.map(async (name) => {
    const marker = await (await caches.open(name)).match(READY_KEY);
    if (!marker) return null;
    try { return { name, ...(await marker.json()) }; } catch { return null; }
  }));
  return complete.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);
}

async function savedResponse(request) {
  for (const { name } of await completedCaches()) {
    const response = await (await caches.open(name)).match(request);
    if (response) return response;
  }
  return null;
}

function safeAsset(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return false;
  const url = new URL(value, self.location.origin);
  return url.origin === self.location.origin && !url.pathname.startsWith("/api/") && !url.search && (STATIC_FILE.test(url.pathname) || METADATA_FILES.has(url.pathname));
}

async function broadcast(ready) {
  for (const client of await self.clients.matchAll({ type: "window", includeUncontrolled: true })) {
    client.postMessage({ type: "OFFLINE_CACHE_STATUS", ready });
  }
}

async function warmOfflineCache() {
  const manifestResponse = await fetch("/offline-assets.json", { cache: "no-store", credentials: "same-origin", priority: "low" });
  if (!manifestResponse.ok) return;
  const manifest = await manifestResponse.json();
  if (!/^[a-f0-9]{20}$/.test(manifest.version) || !Array.isArray(manifest.assets) || manifest.assets.length > 512 || manifest.totalBytes > 12 * 1024 * 1024 || !manifest.assets.every(safeAsset)) return;

  const name = `${CACHE_PREFIX}${manifest.version}`;
  const cache = await caches.open(name);
  if (await cache.match(READY_KEY)) {
    await broadcast(true);
    return;
  }

  // Discard abandoned partial releases, but retain the last two usable releases.
  const complete = await completedCaches();
  const keep = new Set([name, ...complete.slice(0, 2).map((entry) => entry.name)]);
  for (const old of await caches.keys()) {
    if (old.startsWith(CACHE_PREFIX) && !keep.has(old)) await caches.delete(old);
  }

  for (const asset of manifest.assets) {
    const url = new URL(asset, self.location.origin).href;
    if (!(await cache.match(url))) {
      const response = await fetch(url, { credentials: "same-origin", priority: "low" });
      // Never cache an HTML error page under a script, font or image URL.
      if (!response.ok || response.type === "opaque" || /text\/html|text\/x-component/.test(response.headers.get("content-type") || "")) throw new Error("Asset unavailable");
      await cache.put(url, response);
      // One transfer at a time, leaving room for interaction and visible media.
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  const home = await fetch(HOME_URL, { cache: "no-store", credentials: "same-origin", headers: { Accept: "text/html" }, priority: "low" });
  if (!home.ok || !home.headers.get("content-type")?.includes("text/html")) throw new Error("Home unavailable");
  const html = await home.clone().text();
  const expected = new Set(manifest.assets);
  const referencedChunks = html.match(/\/_next\/static\/[^"'<>\\\s]+/g) || [];
  if (!referencedChunks.length || referencedChunks.some((url) => !expected.has(url.split("?")[0]))) throw new Error("Release changed during caching");
  await cache.put(HOME_URL, home);
  // Commit only after all assets and the matching HTML have been saved.
  await cache.put(READY_KEY, new Response(JSON.stringify({ createdAt: Date.now() }), { headers: { "Content-Type": "application/json" } }));
  const latest = await completedCaches();
  const retained = new Set(latest.slice(0, 2).map((entry) => entry.name));
  for (const old of await caches.keys()) {
    if (old.startsWith(CACHE_PREFIX) && !retained.has(old)) await caches.delete(old);
  }
  await broadcast(true);
}

self.addEventListener("message", (event) => {
  if (event.data?.type !== "WARM_OFFLINE_CACHE" || !event.source?.url || new URL(event.source.url).origin !== self.location.origin) return;
  if (!warming) warming = warmOfflineCache().catch(() => broadcast(false)).finally(() => { warming = undefined; });
  event.waitUntil(warming);
});

async function respondWithRange(request, response) {
  const range = request.headers.get("range");
  if (!range) return response;
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  if (!match) return response;
  const buffer = await response.arrayBuffer();
  const size = buffer.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start > end || start >= size) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  const headers = new Headers(response.headers);
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  headers.set("Accept-Ranges", "bytes");
  return new Response(buffer.slice(start, end + 1), { status: 206, headers });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/") || url.searchParams.has("_rsc") || request.headers.has("RSC") || request.headers.has("Next-Router-State-Tree")) return;

  if (request.mode === "navigate" && url.pathname === "/") {
    event.respondWith(fetch(request).catch(async () => {
      const saved = await savedResponse(HOME_URL);
      return saved || new Response("You are offline. Connect once and let the portfolio finish saving, then return to browse it offline.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }));
    return;
  }

  // Only build-listed files have ever been written. Unknown routes stay real 404s.
  const metadata = METADATA_FILES.has(url.pathname);
  if ((!STATIC_FILE.test(url.pathname) && !metadata) || (url.search && !metadata)) return;
  // Next adds content-hash queries to generated icon links. Their stored body is
  // the canonical asset; only these specific metadata routes ignore that query.
  const assetUrl = metadata ? `${url.origin}${url.pathname}` : request.url;
  event.respondWith((async () => {
    if (url.pathname.startsWith("/_next/static/")) {
      const saved = await savedResponse(assetUrl);
      if (saved) return saved;
    }
    try { return await fetch(request); }
    catch {
      const saved = await savedResponse(assetUrl);
      if (saved) return respondWithRange(request, saved);
      return Response.error();
    }
  })());
});
