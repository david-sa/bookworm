const cacheName = 'cache-v1';
const precacheResources = [
  '/',
  'index.html',
  'css/app.css',
  'css/bootstrap.min.css',
  'fonts/short-stack-v9-latin-regular.woff2',
  'img/cat.png',
  'img/hungry-cat.gif',
  'img/lion.jpg',
  'img/package.jpg',
  'img/rabbit.jpg',
  'img/success.gif',
  'js/app.js',
  'js/bootstrap.min.js',
  'js/jquery.js',
  'snd/a.mp3',
  'snd/das-paket.mp3',
  'snd/das.mp3',
  'snd/der-hase.mp3',
  'snd/der-löwe.mp3',
  'snd/der.mp3',
  'snd/die-katze-hat-hunger.mp3',
  'snd/die-katze.mp3',
  'snd/die.mp3',
  'snd/e.mp3',
  'snd/h.mp3',
  'snd/ha.mp3',
  'snd/hase.mp3',
  'snd/hat.mp3',
  'snd/hunger.mp3',
  'snd/kat.mp3',
  'snd/katze.mp3',
  'snd/ket.mp3',
  'snd/lö.mp3',
  'snd/pa.mp3',
  'snd/s.mp3',
  'snd/se.mp3',
  'snd/uh-oh.mp3',
  'snd/we.mp3',
  'snd/yay.mp3',
  'snd/ze.mp3',
];
console.log(2);
self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});