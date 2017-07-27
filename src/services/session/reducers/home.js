import {
    REQUEST_BLOG_PREVIEW,
    RECEIVE_BLOG_PREVIEW,
    INVALIDATE_BLOG_PREVIEW,
    REQUEST_LOCAL_BLOG_PREVIEW,
    RECEIVE_LOCAL_BLOG_PREVIEW,
    INVALIDATE_LOCAL_BLOG_PREVIEW,
    RECEIVE_LAZY_BLOG_PREVIEW,
    INVALIDATE_LAZY_BLOG_PREVIEW,
    REQUEST_LAZY_BLOG_PREVIEW,
    STOP_LAZY_BLOG_PREVIEW,
    RECEIVE_AFTER_BLOG_PREVIEW
} from '../actions/Home'

function Home(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        itemsLocal:[],
        isFetchingLocal: false,
        didInvalidateLocal: false,
        stopLazyLoad:true,
        receivedAt: ""}, action) {
    switch(action.type) {
        case INVALIDATE_LOCAL_BLOG_PREVIEW:
            return Object.assign({}, state, {
                didInvalidateLocal: true
            })
        case INVALIDATE_BLOG_PREVIEW:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case INVALIDATE_LAZY_BLOG_PREVIEW:
            return Object.assign({}, state, {
                didInvalidateLazy: true
            })
        case REQUEST_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case REQUEST_LOCAL_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetchingLocal: true,
                didInvalidateLocal: false
            })
        case REQUEST_LAZY_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetchingLazy: true,
                didInvalidateLazy: false
            })
        case RECEIVE_BLOG_PREVIEW:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: state.items.concat(action.blogs),
                receivedAt:action.receivedAt
            }
        case RECEIVE_LOCAL_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetchingLocal: false,
                didInvalidateLocal: false,
                items: action.blogs,
            })
        case RECEIVE_LAZY_BLOG_PREVIEW:
            return {
                ...state,
                items: state.items.concat(action.blogs)
            }
        case RECEIVE_AFTER_BLOG_PREVIEW:
            return {
                ...state,
                items:state.items.unshift(action.blogs)
            }
        case STOP_LAZY_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetchingLazy: false,
                didInvalidateLazy: false,
                stopLazyLoad:false,
            })
        default:
            return state
    }
}

export default Home