import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from './store'
import AsyncApp from './AsyncApp'


import { fetchBlogPreviews } from '../redux/actions/Home'
import { fetchcorrectSite} from "../redux/actions/AsyncApp";

const store = configureStore()

store.dispatch(fetchBlogPreviews())
store.dispatch(fetchcorrectSite())

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp/>
            </Provider>
        )
    }
}