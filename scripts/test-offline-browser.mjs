import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

// Run against `npm run build && npm start`. PLAYWRIGHT_MODULE can point at an
// existing Playwright installation, avoiding a production dependency.
const modulePath = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : "playwright");
const baseURL = process.env.TEST_BASE_URL || "http://localhost:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({ serviceWorkers: "allow" });
const page = await context.newPage();
const pageErrors = [];
page.on("pageerror", (error) => pageErrors.push(error.message));

try {
  await page.addInitScript(() => {
    window.offlineMessages = [];
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data?.type === "OFFLINE_CACHE_STATUS") window.offlineMessages.push({ ...event.data, at: performance.now() });
    });
  });
  const response = await page.goto(baseURL, { waitUntil: "load" });
  assert.equal(response.status(), 200);
  await page.waitForFunction(() => window.offlineMessages.some((message) => message.ready), undefined, { timeout: 60_000 });
  const warmed = await page.evaluate(async () => ({
    messages: window.offlineMessages,
    cacheNames: await caches.keys(),
    cacheEntries: await Promise.all((await caches.keys()).map(async (name) => ({ name, count: (await (await caches.open(name)).keys()).length }))),
    controlled: Boolean(navigator.serviceWorker.controller),
  }));
  assert.equal(warmed.controlled, true);
  assert.equal(warmed.cacheNames.length, 1);
  assert.ok(warmed.messages[0].at >= 2_000, "Worker must not compete with the initial page load");

  const serverHeaders = await context.request.get(`${baseURL}/sw.js`);
  assert.equal(serverHeaders.headers()["service-worker-allowed"], "/");
  assert.match(serverHeaders.headers()["cache-control"], /no-store/);
  const manifest = await (await context.request.get(`${baseURL}/offline-assets.json`)).json();
  assert.equal(warmed.cacheEntries[0].count, manifest.assets.length + 2);

  const session = await context.newCDPSession(page);
  await session.send("Network.clearBrowserCache");
  await context.setOffline(true);
  const offlinePage = await page.reload({ waitUntil: "load" });
  assert.equal(offlinePage.fromServiceWorker(), true);
  await page.locator("h1").waitFor();
  await page.getByRole("button", { name: /^Open .* gallery$/ }).first().click();
  const dialog = page.locator("dialog[open]");
  await dialog.waitFor();
  await dialog.locator("img").evaluate((image) => image.decode());
  const firstImage = await dialog.locator("img").getAttribute("src");
  await dialog.getByRole("button", { name: "Next image", exact: true }).click();
  await dialog.locator("img").evaluate((image) => image.decode());
  assert.notEqual(await dialog.locator("img").getAttribute("src"), firstImage);
  await dialog.getByRole("button", { name: "Close gallery", exact: true }).click();

  const offlineAssets = await page.evaluate(async (assets) => {
    const results = [];
    for (const asset of assets) {
      const response = await fetch(asset);
      results.push({ asset, status: response.status });
    }
    const range = await fetch("/M_Arsalan_Warsi_CV.pdf", { headers: { Range: "bytes=0-15" } });
    const metadata = await Promise.all([...document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]')].map(async (link) => ({ url: link.href, status: (await fetch(link.href)).status })));
    return { assets: results, metadata, range: { status: range.status, length: (await range.arrayBuffer()).byteLength } };
  }, manifest.assets);
  assert.ok(offlineAssets.assets.every((asset) => asset.status === 200));
  assert.equal(offlineAssets.range.status, 206);
  assert.equal(offlineAssets.range.length, 16);
  assert.ok(offlineAssets.metadata.every((asset) => asset.status === 200));
  assert.equal(pageErrors.length, 0, pageErrors.join("\n"));
  console.log(JSON.stringify({ result: "PASS", warmed, assetCount: manifest.assets.length, bytes: manifest.totalBytes, offlineReload: true, offlineGalleryNextImage: true, offlineResumeRange: true, pageErrors }, null, 2));
} finally {
  await context.close();
  await browser.close();
}
