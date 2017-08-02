/**
 * Created by wiliam969 on 28.04.2017.
 */
import { combineReducers } from 'redux'
import Home from './home'
import AsyncApp from './App'
import Picture from './Picture'
import Blog from './Blog'
import Comments from './Comments'
import Category from './Category'

const Reducer = combineReducers({
    AsyncApp,
    Home,
    Picture,
    Blog,
    Comments,
    Category
})

export default Reducer;