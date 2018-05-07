import { createStore } from 'redux'

import rootReducer     from './rootReducer'

export default function configureStore(preloadedState = {}) {
  const store = createStore(
    rootReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  )

  if (module.hot) {
    module.hot.accept('./rootReducer.js', () => {
      const nextRootReducer = require('./rootReducer.js')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
