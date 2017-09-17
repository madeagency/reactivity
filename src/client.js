import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import createHistory from 'history/createBrowserHistory'
import configureStore from './redux/configureStore'
import App from './containers/App/App'

const history = createHistory()
const { store } = configureStore(f => f, window.__data, history)

const renderApp = TheApp =>
  render(
    <AppContainer>
      <Provider store={store} key="provider">
        <TheApp />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

if (module.hot) {
  module.hot.accept('./containers/App/App.js', () => {
    const theApp = require('./containers/App/App').default
    renderApp(theApp)
  })
}

if ('serviceWorker' in navigator && process.env.ENABLE_SW === 'true') {
  runtime.register()
}

renderApp(App)
