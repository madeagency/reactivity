import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { AsyncComponentProvider } from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import configureStore from './redux/configureStore'
import App from './containers/App/App'

const supportsHistory = 'pushState' in window.history
const reactRoot = document.getElementById('root')
const { store } = configureStore(f => f, window.__data)
const rehydrateState = window.ASYNC_COMPONENTS_STATE

function renderApp(TheApp) {
  const app = (
    <AppContainer>
      <AsyncComponentProvider rehydrateState={rehydrateState}>
        <Provider store={store} key="provider">
          <BrowserRouter forceRefresh={!supportsHistory}>
            <TheApp />
          </BrowserRouter>
        </Provider>
      </AsyncComponentProvider>
    </AppContainer>
  )

  asyncBootstrapper(app).then(() => {
    render(app, reactRoot)
  })
}

renderApp(App)

if ('serviceWorker' in navigator) {
  runtime.register()
}

if (module.hot) {
  module.hot.accept('./client')
  module.hot.accept(
    './containers/App/App',
    () => renderApp(require('./containers/App/App').default)
  )
}
