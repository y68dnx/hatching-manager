const CACHE_NAME = 'hatchery-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icons/launchericon-48x48.png',
  './icons/launchericon-72x72.png',
  './icons/launchericon-96x96.png',
  './icons/launchericon-144x144.png',
  './icons/launchericon-192x192.png',
  './icons/launchericon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
