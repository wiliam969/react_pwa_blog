import {
    REQUEST_CATEGORY,
    RECEIVE_CATEGORY,
    INVALIDATE_CATEGORY,
    REQUEST_LAZY_CATEGORY,
    RECEIVE_LAZY_CATEGORY,
} from './categoryActions'

function Category(state = {
    isFetching: false,
    isFetchingLazy:false,
    didInvalidate: false,
    stopLazyLoad:false,
    items: [],
}, action) {
    switch(action.type) {
        case INVALIDATE_CATEGORY:
            return {
                ...state,
                didInvalidate:true,
            }
        case REQUEST_CATEGORY:
            return {
                ...state,
                items:[],
                isFetching:true,
            }
        case REQUEST_LAZY_CATEGORY:
            return {
                ...state,
                isFetchingLazy:true,
            }
        case RECEIVE_CATEGORY:
            return {
                ...state,
                isFetching:false,
                items: state.items.concat(action.items),
            }
        case RECEIVE_LAZY_CATEGORY:
            return {
                ...state,
                isFetchingLazy: false,
                items: state.items.concat(action.items),
            }
        default:
            return state
    }
}

export default Category