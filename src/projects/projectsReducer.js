import {
    REQUEST_PROJECTS_ITEMS,
    RECEIVE_PROJECTS_ITEMS,
    INVALIDATE_PROJECTS_ITEMS,
    REQUEST_LAZY_PROJECTS_ITEMS,
    RECEIVE_LAZY_PROJECTS_ITEMS,
    REQUEST_SINGLE_PROJECTS_ITEMS,
    RECEIVE_SINGLE_PROJECTS_ITEMS,
    STOP_LAZY_PROJECTS_ITEMS,
} from './galleryActions'

function Projects(state = {
    isFetching: false,
    isFetchingLazy:false,
    didInvalidate: false,
    stopLazyLoad:true,
    LazyPage:2,
    isFullscreen:false,
    Items: [],
    current_item:[],
    current_id: false,
    prev_state:false,
    next_state:false,
    isPrev:false,
    isNext:false,
    isURLFullscreen:false,
}, action) {
    switch(action.type) {
        //REQUEST_PROJECTS_ITEMS
        default:
            return state
    }
}

export default Projects