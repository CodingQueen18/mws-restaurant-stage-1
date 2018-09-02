const cacheName = 'v1';
const urlsToCache = [
'/',
'css/styles.css',
'js/dbhelper.js',
'js/main.js',
'js/restaurant_info.js',
'index.html',
'restaurant.html',
'img/1.jpg',
'img/2.jpg',
'img/3.jpg',
'img/4.jpg',
'img/5.jpg',
'img/6.jpg',
'img/7.jpg',
'img/8.jpg',
'img/9.jpg',
'img/10.jpg',
'data/restaurants.json'
];
/*===============Install The Service Worker==========*/
self.addEventListener('install', e => {
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
self.addEventListener('activate', e => {
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
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
