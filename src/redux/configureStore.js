import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { wrapRootEpic } from 'react-redux-epic'
import app, { rootEpic } from './reducers'

export const wrappedEpic = wrapRootEpic(rootEpic)
const epicMiddleware = createEpicMiddleware(wrappedEpic)
const middleware = applyMiddleware(epicMiddleware)

export default function configureStore() {
  let store
  if (!process.env.SERVER) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    store = createStore(app, composeEnhancers(middleware))
  } else {
    store = createStore(app, middleware)
  }

  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => {
        store.replaceReducer(require('./reducers').default)
      }
    )
  }

  return store
}
