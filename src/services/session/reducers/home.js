import { REQUEST_BLOG_PREVIEW, RECEIVE_BLOG_PREVIEW, INVALIDATE_BLOG_PREVIEW,REQUEST_LOCAL_BLOG_PREVIEW,RECEIVE_LOCAL_BLOG_PREVIEW,INVALIDATE_LOCAL_BLOG_PREVIEW } from '../actions/Home'

function Home(state = {isFetching: false, didInvalidate: false, items: []}, action) {
    switch(action.type) {
        case INVALIDATE_LOCAL_BLOG_PREVIEW:
            return Object.assign({}, state, {
                didInvalidateLocal: true
            })
        case INVALIDATE_BLOG_PREVIEW:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case REQUEST_LOCAL_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetchingLocal: true,
                didInvalidateLocal: false
            })
        case RECEIVE_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.blogs,
            })
        case RECEIVE_LOCAL_BLOG_PREVIEW:
            return Object.assign({}, state, {
                isFetchingLocal: false,
                didInvalidateLocal: false,
                itemsLocal: action.blogs,
            })
        default:
            return state
    }
}

export default Home