/// DROPly Vendor service worker
/// Caches the app shell and static assets only. Never caches API responses,
/// auth/session data, or authenticated pages — those always go to network.

const CACHE_NAME = "droply-vendor-v2";

// Public shell pages + assets safe to serve offline.
const PRECACHE_URLS = [
  "/",
  "/vendor",
  "/vendor/login",
  "/vendor/register",
  "/offline",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
  "/brand/droply-logo-light.png",
  "/brand/droply-logo-dark.png",
];

// Paths that must never be cached (auth, APIs, private data).
const NEVER_CACHE = ["/api/", "/api/auth"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        // Add individually so one failure doesn't abort the install.
        Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isNeverCache(url) {
  return NEVER_CACHE.some((path) => url.pathname.startsWith(path));
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    /\.(?:png|svg|ico|css|js|woff2?)$/.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only GET requests over http(s); skip everything else (auth API, mutations,
  // chrome-extension, etc.).
  if (request.method !== "GET" || !url.protocol.startsWith("http")) return;
  if (isNeverCache(url)) return;

  // Page navigations: network-first so content is always fresh; fall back to
  // a cached copy for public pages, else the offline page.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache only public shell pages — never authenticated dashboards.
          if (response.ok && PRECACHE_URLS.includes(url.pathname)) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match("/offline");
        })
    );
    return;
  }

  // Static assets: cache-first, populate on miss.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
          })
      )
    );
    return;
  }

  // Everything else: plain network, nothing stored.
});
