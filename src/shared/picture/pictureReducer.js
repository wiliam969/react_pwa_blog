import { REQUEST_PICTURE, RECEIVE_PICTURE, INVALIDATE_PICTURE } from './pictureActions'

function Picture(state = {
    isFetching: false,
    didInvalidate: false,
    picture_obj: {
        itm: {},
    }}, action) {
    switch(action.type) {
        case INVALIDATE_PICTURE:
            return {
                ...state,
                didInvalidate: true,
                error: action.error,
                picture_obj: {
                    ...state.picture_obj,
                    [action.id] : {
                        didInvalidate:true,
                        itm: [],
                    }
                }
            }
        case REQUEST_PICTURE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                picture_obj: {
                    ...state.picture_obj,
                    [action.id] : {
                        isFetching:true,
                        itm:[],
                    }
                }
            })
        case RECEIVE_PICTURE:
            return Object.assign({}, state,{
                isFetching:false,
                didInvalidate:false,
                picture_obj: {
                    ...state.picture_obj,
                    [action.id]: {
                        isFetching: false,
                        didInvalidate:false,
                        itm:action.picture.media_details.sizes
                    },
                }
            })
        default:
            return state
    }
}

export default Picture