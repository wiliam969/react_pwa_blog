/**
 * Created by wiliam969 on 28.04.2017.
 */
import { combineReducers } from 'redux'
import Home from '../home/homeRedurcer'
import AsyncApp from '../app/appReducer'
import Picture from '../shared/picture/pictureReducer'
import Blog from '../blog/blogReducer'
import Comments from '../blog/comments/commentsRedurcer'
import Category from '../category/categoryReducer'

const Reducer = combineReducers({
    AsyncApp,
    Home,
    Picture,
    Blog,
    Comments,
    Category
})

export default Reducer;