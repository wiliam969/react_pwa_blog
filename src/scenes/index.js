import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import AsyncApp from './AsyncApp'
import { getCategories } from '../services/session/actions/App'

const store = configureStore()

store.dispatch(getCategories())

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp/>
            </Provider>
        )
    }
}