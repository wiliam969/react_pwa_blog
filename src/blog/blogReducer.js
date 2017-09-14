import { REQUEST_BLOG_SINGLE,REQUEST_LAZY_BLOG_SINGLE, RECEIVE_BLOG_SINGLE,RECEIVE_LAZY_BLOG_SINGLE, INVALIDATE_BLOG_SINGLE,STOP_LAZY_BLOG_SINGLE } from './blogActions'

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
            action.blog.stopLazyLoad = false
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
            console.log(state)
            let fufu = state.items.map(post => lazy(post,action))
            console.log(fufu)
            return Object.assign({}, state, {
                items: fufu
            })
        default:
            return state
    }
}

function lazy(post,action) {
    console.log(post)
    console.log(action)
    if(post.id !== action.prev_id) return post

    return Object.assign({}, post, {
        stopLazyLoad:true,
    })
}

export default Blog