import { REQUEST_COMMENT, REQUEST_LAZY_COMMENT,RECEIVE_COMMENT,RECEIVE_LAZY_COMMENT,INVALIDATE_COMMENT,SEND_COMMENT,FAILED_COMMENT,IS_COMMENT,STOP_COMMENT } from '../actions/Comments'

function Comments(state = {
    didInvalidate: false,
    isFetching: false,
    isFetchingLazy: false,
    isComment: false,
    stopComment:false,
    comment: [],
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
                isFetching:true,
            })
        case REQUEST_LAZY_COMMENT:
            return Object.assign({}, state, {
                isFetchingLazy:true,
            })
        case SEND_COMMENT:
            return Object.assign({}, state, {
                comment:action.comment
            })
        case RECEIVE_COMMENT:
            return Object.assign({}, state, {
                comment:state.comment.concat(action.comment),
                isFetching: false,
            })
        case RECEIVE_LAZY_COMMENT:
            return {
                ...state,
                isFetchingLazy:false,
                comment: state.comment.concat(action.comment),
            }
        case IS_COMMENT:
            return Object.assign({}, state, {
                isComment:true,
            })
        case STOP_COMMENT:
            return Object.assign({}, state, {
                stopComment: true,
                isFetching:false,
                isFetchingLazy:false,
            })
        default:
            return state
    }
}

export default Comments