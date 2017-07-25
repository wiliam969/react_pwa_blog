import { REQUEST_BLOG_SINGLE, RECEIVE_BLOG_SINGLE, INVALIDATE_BLOG_SINGLE } from '../actions/Blog'

function Blog(state = {/** isFetching: false, didInvalidate: false, item: null **/}, action) {
    switch(action.type) {
        case INVALIDATE_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: true,
                receivedBlog:false,
                blog:action.blog
            })
        case REQUEST_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                receivedBlog:false,
                blog:action.blog
            })
        case RECEIVE_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                receivedBlog:true,
                bloginformation: action.blog
            })
        default:
            return state
    }
}

export default Blog