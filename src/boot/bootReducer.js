/**
 * Created by wiliam969 on 28.04.2017.
 */
import { combineReducers } from 'redux'
import Blog from '../blog/blogRedurcer'
import Quotations from '../blog/quotation/quotationsReducer'
import AsyncApp from '../app/appReducer'
import Picture from '../shared/picture/pictureReducer'
import Category from '../category/categoryReducer'
import Gallery from '../gallery/galleryReducer'
import Slider from '../shared/slider/sliderReducer'
import Alert from '../shared/Alert/alertReducer'

const Reducer = combineReducers({
    AsyncApp,
    Alert,
    Quotations,
    Blog,
    Picture,
    Category,
    Gallery,
    Slider,
})



export default Reducer;