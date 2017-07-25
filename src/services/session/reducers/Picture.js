import { REQUEST_PICTURE, RECEIVE_PICTURE, INVALIDATE_PICTURE } from '../actions/Picture'

function Picture(state = {/**isFetching: false, didInvalidate: false, items: [] **/}, action) {
    switch(action.type) {
        case INVALIDATE_PICTURE:
            return {
                didInvalidate: true,
                error: action.error,
            }
        case REQUEST_PICTURE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                id: action.id
            })
        case RECEIVE_PICTURE:
            return {
                picture_obj: {
                    ...state.picture_obj,
                        [action.id]: action.picture,
                }
            }
        default:
            return state
    }
}

export default Picture