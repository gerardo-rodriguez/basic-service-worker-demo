'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceWorker.js', { scope: './' })
    .then(function(registration) {
      console.log('Service Worker Registered');
    })
    .catch(function(err) {
      console.log('Service Worker failed to register', err);
    });
}
