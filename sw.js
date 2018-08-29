/*===============Install The Service Worker==========*/
self.addEventListener('install', (e) => {
  console.log('Service Worker Installed');
});


/*================Activate The Service Worker=============*/
self.addEventListener('activate', (e) => {
  console.log('Service Worker Activated');
});
