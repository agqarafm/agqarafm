const CACHE_NAME = 'cedvel-cache-v1';
const urlsToCache = [
  '/cedvel/',
  '/cedvel/index.html',
  '/cedvel/style.css',
  '/cedvel/script.js',
  '/cedvel/manifest.json',
  '/cedvel/icon-192.png',
  '/cedvel/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
