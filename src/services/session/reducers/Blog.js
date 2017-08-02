import { REQUEST_BLOG_SINGLE,REQUEST_LAZY_BLOG_SINGLE, RECEIVE_BLOG_SINGLE,RECEIVE_LAZY_BLOG_SINGLE, INVALIDATE_BLOG_SINGLE,STOP_LAZY_BLOG_SINGLE } from '../actions/Blog'

function Blog(state = {
        isFetching: false,
        isFetchingLazy:false,
        didInvalidate: false,
        stopLazyLoad:false,
        items: [],
    }, action) {
    switch(action.type) {
        case INVALIDATE_BLOG_SINGLE:
            return {
                ...state,
                didInvalidate:true,
            }
        case REQUEST_BLOG_SINGLE:
            return {
                ...state,
                items: [],
                isFetching:true,
            }
        case REQUEST_LAZY_BLOG_SINGLE:
            return {
                ...state,
                isFetchingLazy:true,
            }
        case RECEIVE_BLOG_SINGLE:
            return {
                ...state,
                items: state.items.concat(action.blog),
                isFetching: false,
            }
        case RECEIVE_LAZY_BLOG_SINGLE:
            return {
                ...state,
                items: state.items.concat(action.blog),
                isFetchingLazy:false,
            }
        case STOP_LAZY_BLOG_SINGLE:
            return {
                ...state,
                stopLazyLoad: true,
            }
        default:
            return state
    }
}

export default Blog