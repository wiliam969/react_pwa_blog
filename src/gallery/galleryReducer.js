import {
    REQUEST_GALLERY_ITEMS,
    RECEIVE_GALLERY_ITEMS,
    INVALIDATE_GALLERY_ITEMS,
    REQUEST_LAZY_GALLERY_ITEMS,
    RECEIVE_LAZY_GALLERY_ITEMS,
    REQUEST_FULLSCREEN_GALLERY_ITEMS,
    RECEIVE_FULLSCREEN_GALLERY_ITEMS,
    FETCH_PREV_FULLSCREEN_GALLERY_ITEM,
    FETCH_NEXT_FULLSCREEN_GALLERY_ITEM,
    STOP_FETCH_PREV_FULLSCREEN_GALLERY_ITEM,
    STOP_FETCH_NEXT_FULLSCREEN_GALLERY_ITEM,
} from './galleryActions'

function Gallery(state = {
    isFetching: false,
    isFetchingLazy:false,
    didInvalidate: false,
    stopLazyLoad:false,
    isFullscreen:false,
    Items: [],
    current_item:[],
    current_id: false,
    prev_state:false,
    next_state:false,
    isPrev:false,
    isNext:false,
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
                Items: [],
            }
        case REQUEST_LAZY_GALLERY_ITEMS:
            return {
                ...state,
                isFetchingLazy:true,
            }
        case REQUEST_FULLSCREEN_GALLERY_ITEMS:
            return {
                ...state,
                current_item:[]
            }
        case RECEIVE_GALLERY_ITEMS:
            return {
                ...state,
                isFetching:false,
                Items: state.Items.concat(action.Items),
            }
        case RECEIVE_LAZY_GALLERY_ITEMS:
            return {
                ...state,
                isFetchingLazy: false,
                Items: state.Items.concat(action.Items),
            }
        case RECEIVE_FULLSCREEN_GALLERY_ITEMS:
            return {
                ...state,
                isFullscreen:true,
                current_item: state.current_item.concat(state.Items[action.Items]),
                current_id: action.Items,
                isPrev:false,
                isNext:false,
            }
        case FETCH_PREV_FULLSCREEN_GALLERY_ITEM:
            state.current_item = [];
            return {
                ...state,
                current_item: state.current_item.concat(state.Items[action.Items - 1]),
                current_id:action.Items - 1,
                prev_state: action.Items - 1,
                isPrev:false,
                isNext:false,
            }
        case FETCH_NEXT_FULLSCREEN_GALLERY_ITEM:
            state.current_item = [];

            return {
                ...state,
                current_item: state.current_item.concat(state.Items[action.Items + 1]),
                current_id:action.Items + 1,
                next_state: action.Items + 1,
                isPrev:false,
                isNext:false,
            }
        case STOP_FETCH_PREV_FULLSCREEN_GALLERY_ITEM:
            return {
                ...state,
                isPrev:true,
                isNext:false,
            }
        case STOP_FETCH_NEXT_FULLSCREEN_GALLERY_ITEM:
            return {
                ...state,
                isPrev:false,
                isNext:true,
            }
        default:
            return state
    }
}

export default Gallery