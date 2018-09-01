const cacheName = 'v1';
const urlsToCache =
['css/styles.css',
'js/dbhelper.js',
'js/main.js',
'js/restaurant_info.js',
'index.html',
'restaurant.html'];
/*===============Install The Service Worker==========*/
self.addEventListener('install', (e) => {
  console.log('Service Worker Installed');
  //Open Cache
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      console.log('Service Worker File Cached');
      cache.addAll(urlsToCache);
    })
  )
});


/*================Activate The Service Worker=============*/
self.addEventListener('activate', (e) => {
  console.log('Service Worker Activated');
  //Remove Old Cache
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if(cache != cacheName) {
            console.log('Clear Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

/*================Offline Viewing==================*/
self.addEventListener('fetch', e => {
  console.log('Fetching');
  e.respondWith(
    fetch(e.request)
    .catch(() => caches.match(e.request)));
})
