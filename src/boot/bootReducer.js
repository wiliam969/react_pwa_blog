/**
 * Created by wiliam969 on 28.04.2017.
 */
import { combineReducers } from 'redux'
import Home from '../home/homeRedurcer'
import Quotations from '../home/quotation/quotationsReducer'
import AsyncApp from '../app/appReducer'
import Picture from '../shared/picture/pictureReducer'
import Blog from '../blog/blogReducer'
import Comments from '../blog/comments/commentsRedurcer'
import Category from '../category/categoryReducer'
import Gallery from '../gallery/galleryReducer'

const Reducer = combineReducers({
    AsyncApp,
    Quotations,
    Home,
    Picture,
    Blog,
    Comments,
    Category,
    Gallery,
})

export default Reducer;