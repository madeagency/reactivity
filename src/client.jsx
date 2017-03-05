import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router'
import { withAsyncComponents } from 'react-async-component'
import App from './containers/App/App'

const reactRoot = document.getElementById('root')

function renderApp(theApp) {
  withAsyncComponents(theApp)
    .then((result) => {
      const {
      appWithAsyncComponents
    } = result

      render(appWithAsyncComponents, reactRoot)
    })
}

const container = (
  <AppContainer>
    <BrowserRouter>
      {
        ({ location }) => <App location={location} />
      }
    </BrowserRouter>
  </AppContainer>
)

renderApp(container)

if (module.hot) {
  module.hot.accept('./client')
  module.hot.accept(
    './containers/App/App',
    () => renderApp(container),
  )
}
