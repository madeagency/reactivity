import express from 'express'
import React from 'react'
import { withAsyncComponents } from 'react-async-component'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Html from './helpers/Html'
import App from './containers/App/App'

const app = express()

app.use((req, res) => {
  const reactRouterContext = {}

  const component = (
    <StaticRouter
      location={req.url}
      context={reactRouterContext}
    >
      <App />
    </StaticRouter>
  )

  withAsyncComponents(component).then((result) => {
    const {
      appWithAsyncComponents,
      state,
      STATE_IDENTIFIER
    } = result

    const html = renderToStaticMarkup(
      <Html
        component={renderToString(appWithAsyncComponents)}
        asyncComponents={{ state, STATE_IDENTIFIER }}
      />
    )

    res.send(`<!doctype html>\n${html}`)
  })
})

export default app
