import favicon16 from '../static/favicon-16x16.png'
import favicon32 from '../static/favicon-32x32.png'
import appleTouchIcon from '../static/apple-touch-icon.png'
import msTile144 from '../static/mstile-144x144.png'

module.exports = {
  title: 'React Universal',
  description: 'a bleeding edge react boilerplate',
  head: {
    meta: [
      { charset: 'utf-8' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'description', content: 'All the modern best practices in one example.' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', href: appleTouchIcon },
      { rel: 'icon', type: 'image/png', href: favicon16, sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: favicon32, sizes: '16x16' },
      { rel: 'manifest', href: 'manifest.json' },
      { rel: 'mask-icon', href: 'msapplication-TileColor', content: '#000000' },
      { rel: 'mask-icon', href: 'msapplication-TileImage', content: msTile144 }
    ],
    htmlAttributes: {
      lang: 'en'
    }
  }
}
