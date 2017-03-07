import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { withAsyncComponents } from 'react-async-component'
import App from './containers/App/App'

const supportsHistory = 'pushState' in window.history
const reactRoot = document.getElementById('root')

function renderApp(TheApp) {
  const app = (
    <AppContainer>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <TheApp />
      </BrowserRouter>
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
    () => renderApp(App),
  )
}
