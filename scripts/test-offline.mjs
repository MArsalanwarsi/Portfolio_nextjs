import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const source = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
const origin = "https://portfolio.test";
const version = (number) => number.toString(16).padStart(20, "0");

function harness() {
  const storage = new Map();
  const handlers = {};
  const responses = new Map();
  const requests = [];
  const messages = [];
  let offline = false;
  let time = 0;
  const key = (value) => new URL(typeof value === "string" ? value : value.url, origin).href;
  const caches = {
    keys: async () => [...storage.keys()],
    delete: async (name) => storage.delete(name),
    open: async (name) => {
      if (!storage.has(name)) storage.set(name, new Map());
      const cache = storage.get(name);
      return {
        match: async (request) => cache.get(key(request))?.clone(),
        put: async (request, response) => cache.set(key(request), response.clone()),
      };
    },
  };
  const fetch = async (request, options) => {
    const url = key(request);
    requests.push({ url, options });
    if (offline || !responses.has(url)) throw new TypeError("Network unavailable");
    return responses.get(url).clone();
  };
  vm.runInNewContext(source, {
    self: {
      location: { origin },
      addEventListener: (name, handler) => { handlers[name] = handler; },
      clients: { claim: async () => {}, matchAll: async () => [{ postMessage: (message) => messages.push(message) }] },
    },
    caches, fetch, URL, Response, Headers, Set, Promise,
    Date: { now: () => ++time },
    setTimeout: (callback) => callback(),
  });
  function set(url, body, type = "application/javascript") {
    responses.set(key(url), new Response(body, { headers: { "Content-Type": type } }));
  }
  function release(number, { files = ["/_next/static/main.js", "/_next/static/lazy.js", "/_next/static/site.css", "/_next/static/font.woff2", "/projects/project.svg", "/resume.pdf"], html = '<html><script src="/_next/static/main.js"></script></html>' } = {}) {
    set("/offline-assets.json", JSON.stringify({ version: version(number), totalBytes: 1024, assets: files }), "application/json");
    for (const file of files) set(file, file.endsWith(".pdf") ? "0123456789" : `asset:${file}`, file.endsWith(".svg") ? "image/svg+xml" : file.endsWith(".pdf") ? "application/pdf" : "application/octet-stream");
    set("/", html, "text/html");
  }
  async function warm() {
    let promise;
    handlers.message({ data: { type: "WARM_OFFLINE_CACHE" }, source: { url: `${origin}/` }, waitUntil: (value) => { promise = value; } });
    await promise;
  }
  async function request(url, options = {}) {
    let promise;
    const request = { url: key(url), method: options.method || "GET", mode: options.mode || "cors", headers: new Headers(options.headers) };
    handlers.fetch({ request, respondWith: (value) => { promise = value; } });
    return promise ? await promise : undefined;
  }
  return { release, set, warm, request, storage, requests, messages, responses, setOffline: (value) => { offline = value; } };
}

test("first warm saves HTML, all build chunks, fonts, project media and resume; offline reload works", async () => {
  const worker = harness();
  worker.release(1);
  await worker.warm();
  assert.equal(worker.messages.at(-1).ready, true);
  assert.equal(worker.storage.size, 1);
  assert.equal([...worker.storage.values()][0].size, 8);
  const htmlRequest = worker.requests.find((entry) => entry.url === `${origin}/`);
  assert.equal(htmlRequest.options.headers.Accept, "text/html");
  worker.setOffline(true);
  const home = await worker.request("/?utm_source=test", { mode: "navigate" });
  assert.equal(home.status, 200);
  assert.match(await home.text(), /<html>/);
  for (const file of ["/_next/static/lazy.js", "/_next/static/font.woff2", "/projects/project.svg"]) {
    assert.equal((await worker.request(file)).status, 200);
  }
  assert.equal(await (await worker.request("/resume.pdf")).text(), "0123456789");
});

test("POST, APIs, external requests, RSC and unknown pages never receive cached HTML", async () => {
  const worker = harness();
  worker.release(1);
  await worker.warm();
  worker.setOffline(true);
  for (const [url, options] of [
    ["/api/contact", { method: "POST" }], ["/api/contact", {}], ["https://analytics.test/event", {}],
    ["/?_rsc=flight", { mode: "navigate" }], ["/", { headers: { RSC: "1" } }],
    ["/", { headers: { "Next-Router-State-Tree": "state" } }], ["/not-found", { mode: "navigate" }],
    ["/", {}], ["/_next/static/main.js", { headers: { RSC: "1" } }],
  ]) assert.equal(await worker.request(url, options), undefined);
});

test("incomplete downloads stay uncommitted and resume without downloading completed assets", async () => {
  const worker = harness();
  worker.release(1);
  worker.responses.delete(`${origin}/_next/static/lazy.js`);
  await worker.warm();
  assert.equal(worker.messages.at(-1).ready, false);
  worker.setOffline(true);
  assert.equal((await worker.request("/", { mode: "navigate" })).status, 503);
  worker.setOffline(false);
  worker.set("/_next/static/lazy.js", "lazy chunk");
  await worker.warm();
  assert.equal(worker.messages.at(-1).ready, true);
  assert.equal(worker.requests.filter((entry) => entry.url.endsWith("/main.js")).length, 1);
});

test("RSC responses, HTML under asset URLs and mixed-deployment HTML cannot poison the cache", async () => {
  for (const poison of ["rsc", "asset", "release"]) {
    const worker = harness();
    worker.release(1);
    if (poison === "rsc") worker.set("/", "flight payload", "text/x-component");
    if (poison === "asset") worker.set("/_next/static/main.js", "<html>error</html>", "text/html");
    if (poison === "release") worker.set("/", '<html><script src="/_next/static/other.js"></script></html>', "text/html");
    await worker.warm();
    assert.equal(worker.messages.at(-1).ready, false);
    worker.setOffline(true);
    assert.equal((await worker.request("/", { mode: "navigate" })).status, 503);
  }
});

test("release cleanup retains two complete caches; failed updates preserve the last usable page", async () => {
  const worker = harness();
  for (const number of [1, 2, 3]) {
    worker.release(number);
    await worker.warm();
  }
  assert.equal(worker.storage.size, 2);
  assert.equal([...worker.storage.keys()].some((name) => name.endsWith(version(1))), false);
  worker.release(4);
  worker.responses.delete(`${origin}/_next/static/lazy.js`);
  await worker.warm();
  assert.equal(worker.storage.size, 3);
  worker.setOffline(true);
  assert.equal((await worker.request("/", { mode: "navigate" })).status, 200);
});

test("offline PDF range requests return correct bytes, headers and invalid-range errors", async () => {
  const worker = harness();
  worker.release(1);
  await worker.warm();
  worker.setOffline(true);
  const partial = await worker.request("/resume.pdf", { headers: { Range: "bytes=2-5" } });
  assert.equal(partial.status, 206);
  assert.equal(partial.headers.get("Content-Range"), "bytes 2-5/10");
  assert.equal(await partial.text(), "2345");
  const suffix = await worker.request("/resume.pdf", { headers: { Range: "bytes=-3" } });
  assert.equal(await suffix.text(), "789");
  assert.equal((await worker.request("/resume.pdf", { headers: { Range: "bytes=99-" } })).status, 416);
});

test("runtime requests cannot grow the cache; only same-origin build-listed assets are saved", async () => {
  const worker = harness();
  worker.release(1);
  await worker.warm();
  const count = [...worker.storage.values()][0].size;
  worker.set("/unlisted.svg", "unlisted", "image/svg+xml");
  assert.equal(await (await worker.request("/unlisted.svg")).text(), "unlisted");
  assert.equal([...worker.storage.values()][0].size, count);
  worker.setOffline(true);
  assert.equal((await worker.request("/unlisted.svg")).type, "error");
  const invalid = harness();
  invalid.release(1, { files: ["//external.test/script.js"] });
  await invalid.warm();
  assert.equal(invalid.storage.size, 0);
});

test("generated install metadata and hashed icon URLs remain available offline", async () => {
  const worker = harness();
  worker.release(1, { files: ["/_next/static/main.js", "/icon.png", "/apple-icon", "/manifest.webmanifest"] });
  await worker.warm();
  assert.equal(worker.messages.at(-1).ready, true);
  worker.setOffline(true);
  for (const file of ["/icon.png?icon.contenthash.png", "/apple-icon?contenthash", "/manifest.webmanifest"]) {
    assert.equal((await worker.request(file)).status, 200);
  }
});
