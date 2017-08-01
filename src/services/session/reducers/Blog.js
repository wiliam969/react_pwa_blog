import { REQUEST_BLOG_SINGLE,REQUEST_LAZY_BLOG_SINGLE, RECEIVE_BLOG_SINGLE,RECEIVE_LAZY_BLOG_SINGLE, INVALIDATE_BLOG_SINGLE } from '../actions/Blog'

function Blog(state = {
        isFetching: false,
        isFetchingLazy:false,
        didInvalidate: false,
        items: [],
    }, action) {
    switch(action.type) {
        case INVALIDATE_BLOG_SINGLE:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        didInvalidate: true,
                    },
                }
            }
        case REQUEST_BLOG_SINGLE:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        isFetching: true,
                        didInvalidate: false,
                        receivedBlog:false,
                    },
                }
            }
        case REQUEST_LAZY_BLOG_SINGLE:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        isFetchingLazy: true,
                    },
                }
            }
        case RECEIVE_BLOG_SINGLE:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        isFetching: false,
                        didInvalidate: false,
                        item:action.blog,
                    },
                }
            }
        case RECEIVE_LAZY_BLOG_SINGLE:
            return  {
                ...state,
                items: {
                    ...state.items,
                    [action.id]: {
                        ...state.items[action.id],
                        isFetchingLazy: false,
                        item:action.blog,
                    },
                }
            }
        default:
            return state
    }
}

export default Blog