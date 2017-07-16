import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import { renderToString as renderToStringEpic, wrapRootEpic } from 'react-redux-epic'
import { renderToStaticMarkup } from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import configureStore from '../redux/configureStore'
import App from '../containers/App/App'
import Html from '../helpers/Html'

export default ({ clientStats }) => (req, res) => {
  const { wrappedEpic, store } = configureStore(wrapRootEpic)
  const reactRouterContext = {}
  const chunkNames = flushChunkNames()
  const { scripts, stylesheets, cssHashRaw, publicPath } = flushChunks(clientStats, { chunkNames })

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
      const html = renderToStaticMarkup(
        <Html
          styles={stylesheets}
          cssHash={cssHashRaw}
          js={scripts}
          component={markup}
          state={data}
          publicPath={publicPath}
        />
      )
      if (reactRouterContext.url) {
        res.writeHead(302, {
          Location: reactRouterContext.url
        })
        res.end()
      } else {
        res.write(`<!doctype html>\n${html}`)
        res.end()
      }
    })
}
