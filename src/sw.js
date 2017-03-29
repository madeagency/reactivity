const { assets } = global.serviceWorkerOption

const CACHE_NAME = (new Date()).toISOString()

const assetsToCache = [
  ...assets,
  '/'
].map(path => new URL(path, global.location).toString())

self.addEventListener('install', () => {
  console.log(CACHE_NAME, assetsToCache)
})
