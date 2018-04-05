/**
 * Created by wiliam969 on 28.04.2017.
 */
import { combineReducers } from 'redux'
import Home from '../blog/blogRedurcer'
import Quotations from '../blog/quotation/quotationsReducer'
import AsyncApp from '../app/appReducer'
import Picture from '../shared/picture/pictureReducer'
import BlogSingle from '../blog/blogsingle/blogsingleReducer'
import Comments from '../blog/blogsingle/comments/commentsRedurcer'
import Category from '../category/categoryReducer'
import Gallery from '../gallery/galleryReducer'

const Reducer = combineReducers({
    AsyncApp,
    Quotations,
    Home,
    Picture,
    BlogSingle,
    Comments,
    Category,
    Gallery,
})

export default Reducer;