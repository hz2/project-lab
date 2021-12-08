import { createStore, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware, RouterAction} from 'connected-react-router'
import thunk from 'redux-thunk'
import rootReducer from './modules'
import history from './modules/history'

const initialState = {}
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

type Action = RouterAction 



export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
)
