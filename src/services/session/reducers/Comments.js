import { REQUEST_COMMENT, REQUEST_LAZY_COMMENT,RECEIVE_COMMENT,RECEIVE_LAZY_COMMENT,INVALIDATE_COMMENT,SEND_COMMENT,FAILED_COMMENT,IS_COMMENT,STOP_COMMENT } from '../actions/Comments'

function Comments(state = {
    didInvalidate: false,
    isFetching: false,
    isFetchingLazy: false,
    isComment: false,
    stopComment:false,
    comments: {},
    }, action) {
    switch(action.type) {
        case INVALIDATE_COMMENT:
            return  {
                ...state,
                comments: {
                    ...state.comments,
                    [action.id]: {
                        ...state.comments[action.id],
                        didInvalidate: true,
                    },
                }
            }
        case FAILED_COMMENT:
            return Object.assign({}, state, {
                didInvalidate:true,
            })
        case REQUEST_COMMENT:
            return  {
                ...state,
                comments: {
                    ...state.comments,
                    [action.id]: {
                        ...state.comments[action.id],
                        isFetching: true,
                    },
                }
            }
        case REQUEST_LAZY_COMMENT:
            return  {
                ...state,
                comments: {
                    ...state.comments,
                    [action.id]: {
                        ...state.comments[action.id],
                        isFetchingLazy: true,
                    },
                }
            }
        case SEND_COMMENT:
            return Object.assign({}, state, {
                comment:action.comment
            })
        case RECEIVE_COMMENT:
            return  {
                ...state,
                comments: {
                    ...state.comments,
                    [action.id]: {
                        ...state.comments[action.id],
                        item: action.comment,
                        isFetching: false,
                        didInvalidate:false,
                    },
                }
            }
        case RECEIVE_LAZY_COMMENT:
            return  {
                ...state,
                comments: {
                    ...state.comments,
                    [action.id]: {
                        ...state.comments[action.id],
                        item: action.comment,
                        isFetchingLazy: false,
                        didInvalidate:false,
                    },
                }
            }
        case IS_COMMENT:
            return  {
                ...state,
                comments: {
                    ...state.comments,
                    [action.id]: {
                        ...state.comments[action.id],
                        isComment:true,
                    },
                }
            }
        case STOP_COMMENT:
            return  {
                ...state,
                comments: {
                    ...state.comments,
                    [action.id]: {
                        ...state.comments[action.id],
                        stopComment:true,
                        isFetchingLazy: false,
                        isFetching:false,
                    },
                }
            }
        default:
            return state
    }
}

export default Comments