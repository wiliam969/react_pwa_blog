import { REQUEST_BLOG_PREVIEW, RECEIVE_BLOG_PREVIEW, INVALIDATE_BLOG_PREVIEW } from '../actions/Home'

function Home(state = {isFetching: false, didInvalidate: false, items: []}, action) {
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
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.blogs,
            })
        default:
            return state
    }
}

export default Home