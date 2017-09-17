import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { connectRoutes } from 'redux-first-router'
import app, { rootEpic } from './reducers'
import routesMap from '../routes'

export default function configureStore(wrapEpic = (f => f), data, history) {
  const {
    reducer: routerReducer,
    middleware: routerMiddleware,
    enhancer: routerEnhancer
  } = connectRoutes(history, routesMap)

  const wrappedEpic = wrapEpic(rootEpic)
  const epicMiddleware = createEpicMiddleware(wrappedEpic)
  const middleware = applyMiddleware(epicMiddleware, routerMiddleware)
  const rootReducer = combineReducers({ ...app, location: routerReducer })

  let store
  if (!process.env.SERVER) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    store = createStore(rootReducer, data, composeEnhancers(routerEnhancer, middleware))
  } else {
    store = createStore(rootReducer, compose(routerEnhancer, middleware))
  }

  if (module.hot) {
    module.hot.accept(
      './reducers',
      () => {
        store.replaceReducer(require('./reducers').default)
      }
    )
  }

  return {
    wrappedEpic,
    store
  }
}
