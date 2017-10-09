import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import app, { rootEpic } from './reducers'

export default function configureStore(wrapEpic = f => f, data) {
  const wrappedEpic = wrapEpic(rootEpic)
  const epicMiddleware = createEpicMiddleware(wrappedEpic)
  const middleware = applyMiddleware(epicMiddleware)

  let store
  if (!process.env.SERVER) {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    store = createStore(app, data, composeEnhancers(middleware))
  } else {
    store = createStore(app, middleware)
  }

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default)
    })
  }

  return {
    wrappedEpic,
    store
  }
}
