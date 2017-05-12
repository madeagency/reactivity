import express from 'express'
import compression from 'compression'
import React from 'react'
import { Provider } from 'react-redux'
import { AsyncComponentProvider, createAsyncContext } from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import { renderToString as renderToStringEpic, wrapRootEpic } from 'react-redux-epic'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createProxyServer } from 'http-proxy'
import path from 'path'
import configureStore from './redux/configureStore'
import Html from './helpers/Html'
import renderShell from './helpers/Shell'
import App from './containers/App/App'

const { API_HOST, API_PORT } = process.env
const apiUrl = `http://${API_HOST}:${API_PORT}/api/`

export default function (assets) {
  const app = express()
  const proxy = createProxyServer()
  const asyncContext = createAsyncContext()

  app.use(compression())
  app.disable('x-powered-by')

  app.use('/api', (req, res) => {
    proxy.web(req, res, { target: apiUrl })
  })

  app.use('/shell', (req, res) => res.send(renderShell(assets)))

  app.use(express.static(path.join(__dirname, '..', 'dist')))
  app.use(express.static(path.join(__dirname, '..', 'static')))

  app.use((req, res) => {
    const { wrappedEpic, store } = configureStore(wrapRootEpic)
    const reactRouterContext = {}

    const component = (
      <AsyncComponentProvider asyncContext={asyncContext}>
        <Provider store={store} key="provider">
          <StaticRouter
            location={req.url}
            context={reactRouterContext}
          >
            <App />
          </StaticRouter>
        </Provider>
      </AsyncComponentProvider>
    )

    asyncBootstrapper(component).then(() => {
      const asyncState = asyncContext.getState()

      renderToStringEpic(component, wrappedEpic)
        .map(({ markup }) => ({
          markup,
          data: store.getState()
        }))
        .subscribe(({ markup, data }) => {
          wrappedEpic.unsubscribe()

          const html = renderToStaticMarkup(
            <Html
              assets={assets}
              component={markup}
              preLoadedState={data}
              asyncState={asyncState}
            />
          )
          res.send(`<!doctype html>\n${html}`)
        })
    })
  })

  return app
}
