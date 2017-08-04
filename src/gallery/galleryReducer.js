import {
    REQUEST_GALLERY_ITEMS,
    RECEIVE_GALLERY_ITEMS,
    INVALIDATE_GALLERY_ITEMS,
    REQUEST_LAZY_GALLERY_ITEMS,
    RECEIVE_LAZY_GALLERY_ITEMS
} from './galleryActions'

function Gallery(state = {
    isFetching: false,
    isFetchingLazy:false,
    didInvalidate: false,
    stopLazyLoad:false,
    items: [],
}, action) {
    switch(action.type) {
        case INVALIDATE_GALLERY_ITEMS:
            return {
                ...state,
                didInvalidate:true,
            }
        case REQUEST_GALLERY_ITEMS:
            return {
                ...state,
                isFetching:true,
            }
        case REQUEST_LAZY_GALLERY_ITEMS:
            return {
                ...state,
                isFetchingLazy:true,
            }
        case RECEIVE_GALLERY_ITEMS:
            return {
                ...state,
                isFetching:false,
                items: state.items.concat(action.items),
            }
        case RECEIVE_LAZY_GALLERY_ITEMS:
            return {
                ...state,
                isFetchingLazy: false,
                items: state.items.concat(action.items),
            }
        default:
            return state
    }
}

export default Gallery