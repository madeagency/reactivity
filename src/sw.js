const { assets } = global.serviceWorkerOption

const CACHE_NAME = new Date().toISOString()
const assetsToCache = [
  ...assets.filter(asset => (
    asset.match(/.*\.(js|css)/) ||
    asset.match(/\.(png|jpg|jpeg|gif|svg)$/i)
  ))
].map(path => new URL(path, location.origin).toString())

self.addEventListener('install', (event) => {
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .catch((error) => {
        console.error(error)
        throw error
      })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(global.caches.keys().then((keys) => {
    const toDelete = keys.filter(key => key !== CACHE_NAME)
    return Promise.all(toDelete.map(key => global.caches.delete(key)))
  }))
})

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url)
  const requestingKnownAsset = assetsToCache.indexOf(requestUrl.toString()) !== -1
  const requestingRoute = requestUrl.pathname.indexOf('.') === -1

  if (requestUrl.origin !== location.origin && !requestingKnownAsset) {
    return
  }

  if (requestUrl.pathname.match(/\/api/)) {
    return
  }

  if (!requestingRoute && !requestingKnownAsset) {
    return
  }

  const request = requestingRoute ? new Request('/shell') : event.request
  console.log(request)
  event.respondWith(
    global.caches.match(event.request).then(cacheResponse => cacheResponse || (
      fetch(request).then((response) => {
        global.caches.open(CACHE_NAME).then(cache => cache.put(event.request, response))
        return response.clone()
      })
    ))
  )
})
