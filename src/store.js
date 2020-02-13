import { createStore, compose, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
export default function configureStore(initialState={}) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(
   reducer,
   initialState,
   composeEnhancers(applyMiddleware(thunk), applyMiddleware(logger))
  )
}
