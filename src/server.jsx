import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { withAsyncComponents } from 'react-async-component'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Html from './helpers/Html'
import App from './containers/App/App'

const app = express()
const store = configureStore()

app.use((req, res) => {
  const reactRouterContext = {}

  const component = (
    <Provider store={store} key="provider">
      <StaticRouter
        location={req.url}
        context={reactRouterContext}
      >
        <App />
      </StaticRouter>
    </Provider>
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
