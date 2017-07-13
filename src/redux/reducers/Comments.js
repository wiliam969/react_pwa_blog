import { REQUEST_COMMENT,RECEIVE_COMMENT,INVALIDATE_COMMENT,SEND_COMMENT,FAILED_COMMENT } from '../actions/Comments'

function Comments(state = {}, action) {
    switch(action.type) {
        case INVALIDATE_COMMENT:
            return Object.assign({}, state, {
                didInvalidate: true,
                isFetching:false,
                comment: action.comment
            })
        case FAILED_COMMENT:
            return Object.assign({}, state, {
                didInvalidate:true,
                isFetching:false,
                comment:action.comment

            })
        case REQUEST_COMMENT:
            return Object.assign({}, state, {
                didInvalidate:false,
                isFetching:false,
                comment:action.comment,
            })
        case SEND_COMMENT:
            return Object.assign({}, state, {
                didInvalidate:false,
                isFetching:false,
                comment:action.comment,
            })
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {
                didInvalidate:false,
                isFetching:false,
                comment:action.comment
            })
        default:
            return state
    }
}

export default Comments