import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Helmet from 'react-helmet'
import { StaticRouter } from 'react-router-dom'

import Menu from 'components/Menu/Menu'
import Html from './Html'
import config from '../config'

export default function (assets) {
  const content = renderToStaticMarkup(
    <StaticRouter context={{}}>
      <Menu />
    </StaticRouter>
  )
  renderToStaticMarkup(<Helmet {...config.head} />)
  return `<!doctype html>${renderToStaticMarkup(
    <Html
      component={content}
      assets={assets}
      preLoadedState={{}}
    />
  )}`
}
