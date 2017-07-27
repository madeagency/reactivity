const { assets } = global.serviceWorkerOption

const CACHE_NAME = process.env.VERSION
const production = process.env.NODE_ENV === 'production'
const assetOrigin = production ? location.origin : 'http://localhost:3001'
const assetsToCache = [
  ...assets.filter(asset => (
    asset.match(/.*\.(js|css)/) ||
    asset.match(/\.(png|jpg|jpeg|gif|svg)$/i)
  ))
].map(path => new URL(path, assetOrigin).toString())

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME, cache => cache.addAll(assetsToCache))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => {
    const toDelete = keys.filter(key => key !== CACHE_NAME)
    return Promise.all(toDelete.map(key => caches.delete(key)))
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
  event.respondWith(
    caches.match(event.request).then(cacheResponse => cacheResponse || (
      fetch(request).then((response) => {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, response))
        return response.clone()
      })
    ))
  )
})
