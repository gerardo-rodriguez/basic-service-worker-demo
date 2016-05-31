'use strict';

var cacheName = 'v2';
var cacheFiles = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js'
];

// Install
self.addEventListener('install', function(e) {
  console.log('[SW] Installed');

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[SW] Caching cacheFiles');
      return cache.addAll(cacheFiles);
    })
  );
});

// Activate
self.addEventListener('activate', function(e) {
  console.log('[SW] Activated!');

  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(thisCacheName) {
        if (thisCacheName !== cacheName) {
          console.log('[SW] Removing cached files from:', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  );
});

// fetch
self.addEventListener('fetch', function(e) {
  console.log('[SW] Fetching', e.request.url);

  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        console.log('[SW] Found in cache:', e.request.url);
        return response;
      }

      var requestClone = e.request.clone();

      fetch(requestClone).then(function(response) {
        if (!response) {
          console.log('[SW] No response from fetch');
          return response;
        }

        var responseClone = response.clone();

        caches.open(cacheName).then(function(cache) {
          cache.put(e.request, responseClone);
          console.log('[SW] New data cached:', e.request.url);
          return response;
        });
      }).catch(function(err) {
        console.log('[SW] Error fetching & caching:', err);
      });
    })
  );
});
