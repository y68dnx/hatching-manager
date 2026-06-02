const CACHE_NAME = 'hatchery-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/launchericon-72x72.png',
  '/icons/launchericon-96x96.png',
  '/icons/launchericon-144x144.png',
  '/icons/launchericon-192x192.png',
  '/icons/launchericon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Cache addAll failed', err))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});