import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import Reducer from './bootReducer'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(Reducer, preloadedState, composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )))
}