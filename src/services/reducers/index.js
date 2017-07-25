/**
 * Created by wiliam969 on 28.04.2017.
 */
import { combineReducers } from 'redux'
import Home from './home'
import AsyncApp from './AsyncApp'
import Picture from './Picture'
import Blog from './Blog'
import Comments from './Comments'

const Reducer = combineReducers({
    AsyncApp,
    Home,
    Picture,
    Blog,
    Comments
})

export default Reducer;