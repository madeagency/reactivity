import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { withAsyncComponents } from 'react-async-component'
import configureStore from './redux/configureStore'
import App from './containers/App/App'

const supportsHistory = 'pushState' in window.history
const reactRoot = document.getElementById('root')
const store = configureStore()

function renderApp(TheApp) {
  const app = (
    <AppContainer>
      <Provider store={store} key="provider">
        <BrowserRouter forceRefresh={!supportsHistory}>
          <TheApp />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  )

  withAsyncComponents(app).then(({ appWithAsyncComponents }) =>
    render(appWithAsyncComponents, reactRoot),
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./client')
  module.hot.accept(
    './containers/App/App',
    () => renderApp(require('./containers/App/App').default)
  )
}
