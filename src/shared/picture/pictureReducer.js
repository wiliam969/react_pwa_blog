import { REQUEST_PICTURE, RECEIVE_PICTURE, INVALIDATE_PICTURE } from './pictureActions'

function Picture(state = {
    isFetching: false,
    didInvalidate: false,
    picture_obj: {}}, action) {
    switch(action.type) {
        case INVALIDATE_PICTURE:
            return {
                ...state,
                didInvalidate: true,
                error: action.error,
            }
        case REQUEST_PICTURE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
        case RECEIVE_PICTURE:
            return Object.assign({}, state,{
                isFetching:false,
                didInvalidate:false,
                picture_obj: {
                    ...state.picture_obj,
                        [action.id]: action.picture.media_details.sizes,
                }
            })
        default:
            return state
    }
}

export default Picture