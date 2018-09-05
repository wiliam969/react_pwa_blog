import { combineReducers } from 'redux'
import Blog from '../blog/blogRedurcer'
import Quotations from '../blog/quotation/quotationsReducer'
import AsyncApp from '../app/appReducer'
import Picture from '../shared/picture/pictureReducer'
import Gallery from '../gallery/galleryReducer'
import Slider from '../shared/slider/sliderReducer'
import Alert from '../shared/Alert/alertReducer'
import Project from '../project/projectRedurcer'

const Reducer = combineReducers({
    AsyncApp,
    Alert,
    Quotations,
    Blog,
    Picture,
    Gallery,
    Slider,
    Project,
})



export default Reducer;