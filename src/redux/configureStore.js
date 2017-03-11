import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import app, { rootEpic } from './reducers'

const epicMiddleware = createEpicMiddleware(rootEpic)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware(epicMiddleware)
const enhancer = composeEnhancers(middleware)

export default function configureStore() {
  let store
  if (process.env.BUILD_TARGET === 'client') {
    store = createStore(app, enhancer)
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
