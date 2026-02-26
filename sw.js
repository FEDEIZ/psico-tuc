// Service Worker for psychologist landing page
const CACHE_NAME = 'psico-tuc-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/critical.css',
  '/css/main.css',
  '/js/main.js',
  '/images/hero-1200.webp',
  '/images/hero-1200.jpg',
  '/images/hero-600.webp',
  '/images/hero-600.jpg',
  '/images/about-800.webp',
  '/images/about-800.jpg',
  '/images/about-400.webp',
  '/images/about-400.jpg',
  '/images/map-1200.webp',
  '/images/map-1200.jpg',
  '/images/map-600.webp',
  '/images/map-600.jpg',
  '/privacy.html',
  '/terms.html',
  '/robots.txt',
  '/sitemap.xml',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&subset=latin&display=swap',
  'https://fonts.gstatic.com/s/opensans/v34/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2'
];

// Install event: cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(networkResponse => {
          // Optionally cache new requests
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      }).catch(() => {
        // If both cache and network fail, return offline page
        return caches.match('/index.html');
      })
  );
});