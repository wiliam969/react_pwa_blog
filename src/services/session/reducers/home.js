import {
    REQUEST_BLOG_PREVIEW,
    INVALIDATE_BLOG_PREVIEW,
    RECEIVE_BLOG_PREVIEW,
    RECEIVE_LOCAL_BLOG_PREVIEW,
    RECEIVE_LAZY_BLOG_PREVIEW,
    RECEIVE_AFTER_BLOG_PREVIEW,
    STOP_LAZY_BLOG_PREVIEW,
} from '../actions/Home'

function Home(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        didInvalidateLocal: false,
        stopLazyLoad:true,
        receivedAt: "",
        oldestPost: "",
        LazyPage:2,
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
                didInvalidate: false
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
                isFetching: false,
                didInvalidate: false,
                items: action.blogs,
            })
        case RECEIVE_LAZY_BLOG_PREVIEW:
            return {
                ...state,
                LazyPage: state.LazyPage +1,
                isFetching:false,
                items: state.items.concat(action.blogs),
            }
        case RECEIVE_AFTER_BLOG_PREVIEW:
            return {
                ...state,
                items: [
                    ...action.blogs,
                    ...state.items,
                ],
                NewPage: state.NewPage +1,
                isFetching:false,
            }
        case STOP_LAZY_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidateLazy: false,
                stopLazyLoad:false,
            })
        default:
            return state
    }
}

export default Home