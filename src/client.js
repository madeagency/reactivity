import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import BrowserRouter from 'react-router-dom/BrowserRouter'
// import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import configureStore from './redux/configureStore'
import App from './containers/App/App'

const supportsHistory = 'pushState' in window.history
const reactRoot = document.getElementById('root')
const { store } = configureStore(f => f, window.__data)

const renderApp = theApp =>
  render(
    <AppContainer>
      <Provider store={store} key="provider">
        <BrowserRouter forceRefresh={!supportsHistory}>
          <theApp />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    reactRoot
  )

if (process.env.NODE_ENV === 'development') {
  module.hot.accept('./containers/App/App', () => {
    renderApp(require('./containers/App/App').default)
  })
}

renderApp(App)
