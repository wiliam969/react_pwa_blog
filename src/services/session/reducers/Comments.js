import { REQUEST_COMMENT,RECEIVE_COMMENT,INVALIDATE_COMMENT,SEND_COMMENT,FAILED_COMMENT,IS_COMMENT } from '../actions/Comments'

function Comments(state = {
    didInvalidate: false,
    isFetching: false,
    isComment: false,
    comment: { id: 1},
    }, action) {
    switch(action.type) {
        case INVALIDATE_COMMENT:
            return Object.assign({}, state, {
                didInvalidate: true,
            })
        case FAILED_COMMENT:
            return Object.assign({}, state, {
                didInvalidate:true,

            })
        case REQUEST_COMMENT:
            return Object.assign({}, state, {
                didInvalidate:false,
                isFetching:true,
            })
        case SEND_COMMENT:
            return Object.assign({}, state, {
                comment:action.comment
            })
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {
                comment:action.comment
            })
        case IS_COMMENT:
            return {
                isComment: true,
            }
        default:
            return state
    }
}

export default Comments