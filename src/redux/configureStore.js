import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import app, { rootEpic } from './reducers'

const epicMiddleware = createEpicMiddleware(rootEpic)

export default function configureStore() {
  const store = createStore(app, applyMiddleware(epicMiddleware))

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
