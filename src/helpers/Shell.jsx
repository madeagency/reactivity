import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'
import Html from './Html'

import config from '../config'

export default function () {
  renderToStaticMarkup(<Helmet {...config.head} />)
  return `<!doctype html>${renderToStaticMarkup(
    <Html
      assets={{}}
      preLoadedState={{}}
      asyncComponents={{}}
    />
  )}`
}
