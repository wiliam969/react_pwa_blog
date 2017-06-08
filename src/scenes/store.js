import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import Reducer from '../redux/reducers/index'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
    return createStore(
        Reducer,
        preloadedState,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}