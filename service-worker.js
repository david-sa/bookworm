const cacheName = 'cache-v1';
const path = '.';
const precacheResources = [
  path + '/',
  path + '/index.html',
  path + '/css/app.css',
  path + '/css/bootstrap.min.css',
  path + '/fonts/short-stack-v9-latin-regular.woff2',
  path + '/img/cat.png',
  path + '/img/hungry-cat.gif',
  path + '/img/lion.jpg',
  path + '/img/package.jpg',
  path + '/img/rabbit.jpg',
  path + '/img/success.gif',
  path + '/js/app.js',
  path + '/js/bootstrap.min.js',
  path + '/js/jquery.js',
  path + '/snd/a.mp3',
  path + '/snd/das-paket.mp3',
  path + '/snd/das.mp3',
  path + '/snd/der-hase.mp3',
  path + '/snd/der-löwe.mp3',
  path + '/snd/der.mp3',
  path + '/snd/die-katze-hat-hunger.mp3',
  path + '/snd/die-katze.mp3',
  path + '/snd/die.mp3',
  path + '/snd/e.mp3',
  path + '/snd/h.mp3',
  path + '/snd/ha.mp3',
  path + '/snd/hase.mp3',
  path + '/snd/hat.mp3',
  path + '/snd/hunger.mp3',
  path + '/snd/kat.mp3',
  path + '/snd/katze.mp3',
  path + '/snd/ket.mp3',
  path + '/snd/lö.mp3',
  path + '/snd/pa.mp3',
  path + '/snd/s.mp3',
  path + '/snd/se.mp3',
  path + '/snd/uh-oh.mp3',
  path + '/snd/we.mp3',
  path + '/snd/yay.mp3',
  path + '/snd/ze.mp3'
];

self.addEventListener('install', event => {
  //console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  //console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  //console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});