import {
    REQUEST_BLOG_PREVIEW,
    REQUEST_LAZY_BLOG_PREVIEW,
    REQUEST_NEW_BLOG_PREVIEW,
    INVALIDATE_BLOG_PREVIEW,
    RECEIVE_BLOG_PREVIEW,
    RECEIVE_LOCAL_BLOG_PREVIEW,
    RECEIVE_LAZY_BLOG_PREVIEW,
    RECEIVE_NEW_BLOG_PREVIEW,
    STOP_LAZY_BLOG_PREVIEW,
} from './blogActions'

function Blog(
    state = {
        isFetching: false,
        isFetchingLazy: false,
        isFetchingNew: false,
        didInvalidate: false,
        didInvalidateLocal: false,
        stopLazyLoad:true,
        items: [],
        receivedAt: "",
        oldestPost: "",
        LazyPage:1,
        NewPage:1,
    }, action) {
    switch(action.type) {
        case INVALIDATE_BLOG_PREVIEW:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case REQUEST_LAZY_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetchingLazy: true,
            })
        case REQUEST_NEW_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetchingNew: true
            })
        case RECEIVE_BLOG_PREVIEW:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: state.items.concat(action.blogs),
                receivedAt:action.receivedAt,
            }
        case RECEIVE_LOCAL_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: state.items.concat(action.blogs),
            })
        case RECEIVE_LAZY_BLOG_PREVIEW:
            return {
                ...state,
                LazyPage: state.LazyPage +1,
                isFetchingLazy:false,
                items: state.items.concat(action.blogs),
            }
        case RECEIVE_NEW_BLOG_PREVIEW:
            return {
                ...state,
                items: [
                    ...action.blogs,
                    ...state.items,
                ],
                NewPage: state.NewPage +1,
                isFetchingNew:false,
            }
        case STOP_LAZY_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidateLazy: false,
                isFetchingLazy:false,
                stopLazyLoad:false,
            })
        default:
            return state
    }
}

export default Blog