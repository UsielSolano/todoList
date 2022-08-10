
//asignar un nombre y versión al cache
const CACHE_NAME = 'WebDeveloper',
  urlsToCache = [
    './',
    './index.php',
    './js/app.js',
    './back.php',
    './css/style.css',
    './Service_Worker.js'    
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en cach� o continuar y buscar la url real
  e.respondWith(
    caches.open(CACHE_NAME).then((cache)=>{
      return cache.match(e.request)
      .then((response)=>{
        console.log('response', response);
        return response || fetch(e.request);
      })
    })
  )
})

