import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString as renderToStringEpic, wrapRootEpic } from 'react-redux-epic'
import { renderToNodeStream } from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import configureStore from '../redux/configureStore'
import App from '../containers/App/App'
import Html from '../helpers/Html'

export default ({ clientStats }) => (req, res) => {
  const { wrappedEpic, store } = configureStore(wrapRootEpic)
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

  renderToStringEpic(component, wrappedEpic)
    .map(({ markup }) => ({
      markup,
      data: store.getState()
    }))
    .subscribe(({ markup, data }) => {
      const chunkNames = flushChunkNames()
      const { scripts, stylesheets, cssHashRaw } = flushChunks(clientStats, { chunkNames })
      const html = renderToNodeStream(
        <Html
          styles={stylesheets}
          cssHash={cssHashRaw}
          js={scripts}
          component={markup}
          state={data}
        />
      )

      switch (reactRouterContext.status) {
        case 301:
        case 302:
          res.status(reactRouterContext.status)
          res.location(reactRouterContext.url)
          res.end()
          break
        case 404:
          res.status(reactRouterContext.status)
          res.type('html')
          res.write('<!doctype html>')
          html.pipe(res)
          break
        default:
          res.status(200)
          res.type('html')
          res.write('<!doctype html>')
          html.pipe(res)
      }
    })
}
