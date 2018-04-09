import { REQUEST_BLOG_SINGLE,REQUEST_LAZY_BLOG_SINGLE, RECEIVE_BLOG_SINGLE,RECEIVE_LAZY_BLOG_SINGLE, INVALIDATE_BLOG_SINGLE,STOP_LAZY_BLOG_SINGLE } from './blogsingleActions'

function BlogSingle(state = {
        isFetching: false,
        isFetchingLazy:false,
        didInvalidate: false,
        stopLazyLoad:true,
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
            action.blog.stopLazyLoad = true
            return {
                ...state,
                items: state.items.concat(action.blog),
                isFetching: false,
            }
        case RECEIVE_LAZY_BLOG_SINGLE:
            action.blog.stopLazyLoad = true
            return {
                ...state,
                items: state.items.concat(action.blog),
                isFetchingLazy:false,
            }
        case STOP_LAZY_BLOG_SINGLE:
            let blogs = state.items.map(post => stopLazy(post,action))
            return Object.assign({}, state, {
                items: blogs
            })
        default:
            return state
    }
}

function stopLazy(post,action) {
    if(post.id !== action.prev_id) return post

    return Object.assign({}, post, {
        stopLazyLoad:false,
        isFetchingLazy:false,
    })
}

export default BlogSingle