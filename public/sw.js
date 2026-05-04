const CACHE_NAME = "app-contable-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/icon-192.png",
  "/icon-512.png"
];

// INSTALAR
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// ACTIVAR
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// FETCH (offline first)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
