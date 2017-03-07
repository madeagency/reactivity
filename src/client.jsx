import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router'
import { withAsyncComponents } from 'react-async-component'
import configureStore from './redux/configureStore'
import App from './containers/App/App'

const reactRoot = document.getElementById('root')
const store = configureStore()

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
    <Provider store={store} key="provider">
      <BrowserRouter>
        {
          ({ location }) => <App location={location} />
        }
      </BrowserRouter>
    </Provider>
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
