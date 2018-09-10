import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import Reducer from './bootReducer'

const middleWare = [];

middleWare.push(thunkMiddleware);

const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
})
middleWare.push(loggerMiddleware);

export default function configureStore(preloadedState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(Reducer, preloadedState, composeEnhancers(
        applyMiddleware(...middleWare)))
}