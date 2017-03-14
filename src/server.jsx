import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { withAsyncComponents } from 'react-async-component'
import { renderToString as renderToStringEpic } from 'react-redux-epic'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createProxyServer } from 'http-proxy'
import configureStore, { wrappedEpic } from './redux/configureStore'
import Html from './helpers/Html'
import App from './containers/App/App'

const { API_HOST, API_PORT } = process.env
const apiUrl = `http://${API_HOST}:${API_PORT}/api/`

const app = express()

const proxy = createProxyServer({
  target: apiUrl
})

app.use('/api', (req, res) => {
  proxy.web(req, res, { target: apiUrl })
})

app.use((req, res) => {
  const store = configureStore()
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

    renderToStringEpic(appWithAsyncComponents, wrappedEpic)
      .map(({ markup }) => ({
        markup,
        data: store.getState()
      }))
      .subscribe(({ markup, data }) => {
        wrappedEpic.unsubscribe()
        console.log('markup', markup)
        console.log('data', data)

        const html = renderToString(
          <Html
            component={markup}
            preLoadedState={data}
            asyncComponents={{ state, STATE_IDENTIFIER }}
          />
        )

        res.send(`<!doctype html>\n${html}`)
      })
  })
})

export default app
