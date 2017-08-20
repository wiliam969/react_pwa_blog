import {
    REQUEST_QUOTATIONS,
    RECEIVE_QUOTATIONS,
    INVALIDATE_QUOTATIONS
} from './quotationsActions'

function Quotations(
    state = {
        didInvalidate: false,
        isFetching: false,
        quotes: [],
    }, action) {
    switch(action.type) {
        case REQUEST_QUOTATIONS:
            return Object.assign({}, state, {
                isFetching:true,
            })
        case RECEIVE_QUOTATIONS:
            return Object.assign({}, state, {
                isFetching:false,
                quotes: action.Items,
            })
        case INVALIDATE_QUOTATIONS:
            return Object.assign({}, state, {
                didInvalidate:true,
            })
        default:
            return state
    }
}

export default Quotations