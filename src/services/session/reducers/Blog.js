import { REQUEST_BLOG_SINGLE, RECEIVE_BLOG_SINGLE, INVALIDATE_BLOG_SINGLE } from '../actions/Blog'

function Blog(state = {/** isFetching: false, didInvalidate: false, item: null **/}, action) {
    switch(action.type) {
        case INVALIDATE_BLOG_SINGLE:
            return Object.assign({}, state, {
                didInvalidate: true,
                blog:action.blog
            })
        case REQUEST_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                blog:action.blog
            })
        case RECEIVE_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                blogcontent: {
                    title: action.blog.title.rendered,
                    content: action.blog.content.rendered,
                },
                blogheader: {
                    author: action.blog.author,
                    category: action.blog.categories,
                    date:action.blog.date,
                }
            })
        default:
            return state
    }
}

export default Blog