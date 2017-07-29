import { REQUEST_BLOG_SINGLE, RECEIVE_BLOG_SINGLE, INVALIDATE_BLOG_SINGLE } from '../actions/Blog'

function Blog(state = {
        isFetching: false,
        didInvalidate: false,
        item: {
            id: 1,
            content:"fut",
            title:"ze",
            date:"1q2323",
            author:"hure"
        },
    }, action) {
    switch(action.type) {
        case INVALIDATE_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate: false,
                item:action.blog
            })
        case REQUEST_BLOG_SINGLE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                receivedBlog:false,
                item:action.blog
            })
        case RECEIVE_BLOG_SINGLE:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                item: {
                    content: action.blog.content.rendered,
                    title: action.blog.content.rendered,
                    date: action.blog.date,
                    author: action.blog.author,
                    id:action.blog.id,
                },
            }
        default:
            return state
    }
}

export default Blog