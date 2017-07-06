import { REQUEST_PICTURE, RECEIVE_PICTURE, INVALIDATE_PICTURE } from '../actions/Picture'

function Picture(state = {/**isFetching: false, didInvalidate: false, items: [] **/}, action) {
    switch(action.type) {
        case INVALIDATE_PICTURE:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_PICTURE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_PICTURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate:false,
                items:action.pictures
            })
        default:
            return state
    }
}

export default Picture