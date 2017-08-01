import { REQUEST_BLOG_SINGLE,REQUEST_LAZY_BLOG_SINGLE, RECEIVE_BLOG_SINGLE,RECEIVE_LAZY_BLOG_SINGLE, INVALIDATE_BLOG_SINGLE } from '../actions/Blog'

function Blog(state = {
        isFetching: false,
        isFetchingLazy:false,
        didInvalidate: false,
        items: [],
    }, action) {
    switch(action.type) {
        case INVALIDATE_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: false,
            })
        case REQUEST_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                receivedBlog:false,
            })
        case REQUEST_LAZY_BLOG_SINGLE:
            return {
                ...state,
                isFetchingLazy:true,
            }
        case RECEIVE_BLOG_SINGLE:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: state.items.concat(action.blog),
            }
        case RECEIVE_LAZY_BLOG_SINGLE:
            return {
                ...state,
                items: state.items.concat(action.blog),
                isFetchingLazy: false,
                didInvalidate: false,
            }
        default:
            return state
    }
}

export default Blog