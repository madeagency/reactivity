const { assets } = global.serviceWorkerOption
const CACHE_NAME = new Date().toISOString()

const assetsToCache = [
  ...assets.filter(
    asset =>
      asset.match(/.*\.(js|css)/) || asset.match(/\.(png|jpg|jpeg|gif|svg)$/i)
  ),
  '/shell'
].map(path => new URL(path, global.location).toString())

self.addEventListener('install', event => {
  event.waitUntil(
    global.caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .catch(error => {
        console.error(error)
        throw error
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    global.caches.keys().then(keys => {
      const toDelete = keys.filter(key => key !== CACHE_NAME)
      return Promise.all(toDelete.map(key => global.caches.delete(key)))
    })
  )
})

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)

  if (requestUrl.origin !== location.origin) return
  if (requestUrl.pathname === '/__webpack_hmr') return
  if (requestUrl.pathname.match(/\/api/)) return

  const request =
    requestUrl.pathname.indexOf('.') === -1
      ? new Request('/shell')
      : event.request
  const resource = global.caches.match(request).then(response => {
    if (response) return response

    return fetch(request).then(responseNetwork => {
      if (!responseNetwork || !responseNetwork.ok) return responseNetwork

      const responseCache = responseNetwork.clone()
      return global.caches
        .open(CACHE_NAME)
        .then(cache => cache.put(request, responseCache))
        .then(() => responseNetwork)
        .catch(() => null)
    })
  })

  event.respondWith(resource)
})
