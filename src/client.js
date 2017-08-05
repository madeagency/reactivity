import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import configureStore from './redux/configureStore'
import App from './containers/App/App'

const supportsHistory = 'pushState' in window.history
const { store } = configureStore(f => f, window.__data)

const renderApp = App =>
  render(
    <AppContainer>
      <Provider store={store} key="provider">
        <BrowserRouter forceRefresh={!supportsHistory}>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/App/App.js', () => {
    const theApp = require('./containers/App/App').default
    renderApp(theApp)
  })
}

if ('serviceWorker' in navigator) {
  runtime.register()
}

renderApp(App)
