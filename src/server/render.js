import React from 'react'
import { Provider } from 'react-redux'
import { renderToString as renderToStringEpic, wrapRootEpic } from 'react-redux-epic'
import { renderToStaticMarkup } from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import createHistory from 'history/createMemoryHistory'
import configureStore from '../redux/configureStore'
import App from '../containers/App/App'
import Html from '../helpers/Html'

export default ({ clientStats }) => (req, res) => {
  const history = createHistory(req.originalUrl)
  const { wrappedEpic, store } = configureStore(wrapRootEpic, {}, history)

  const component = (
    <Provider store={store} key="provider">
      <App />
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
      const html = renderToStaticMarkup(
        <Html
          styles={stylesheets}
          cssHash={cssHashRaw}
          js={scripts}
          component={markup}
          state={data}
        />
      )

      res.write(`<!doctype html>\n${html}`)
      res.end()

      // switch (reactRouterContext.status) {
      //   case 301:
      //   case 302:
      //     res.writeHead(reactRouterContext.status, {
      //       Location: reactRouterContext.url
      //     })
      //     res.end()
      //     break
      //   case 404:
      //     res.writeHead(reactRouterContext.status)
      //     res.write(`<!doctype html>\n${html}`)
      //     res.end()
      //     break
      //   default:
      //     res.write(`<!doctype html>\n${html}`)
      //     res.end()
      // }
    })
}
