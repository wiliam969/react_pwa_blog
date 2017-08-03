import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './boot/bootStore'
import AsyncApp from './app/AsyncApp'
import { getCategories } from './app/appActions'

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