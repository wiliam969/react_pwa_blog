/**
 * Created by wiliam969 on 28.04.2017.
 */
import { combineReducers } from 'redux'
import Blog from '../blog/blogRedurcer'
import Quotations from '../blog/quotation/quotationsReducer'
import AsyncApp from '../app/appReducer'
import Picture from '../shared/picture/pictureReducer'
import BlogSingle from '../blog/blogsingle/blogsingleReducer'
import Comments from '../blog/blogsingle/comments/commentsRedurcer'
import Category from '../category/categoryReducer'
import Gallery from '../gallery/galleryReducer'
import Slider from '../shared/slider/sliderReducer'

const Reducer = combineReducers({
    AsyncApp,
    Quotations,
    Blog,
    Picture,
    BlogSingle,
    Comments,
    Category,
    Gallery,
    Slider,
})

export default Reducer;