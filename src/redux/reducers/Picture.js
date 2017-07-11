import { REQUEST_PICTURE, RECEIVE_PICTURE, INVALIDATE_PICTURE } from '../actions/Picture'

function Picture(state = {/**isFetching: false, didInvalidate: false, items: [] **/}, action) {
    switch(action.type) {
        case INVALIDATE_PICTURE:
            return Object.assign({}, state, {
                didInvalidate: true,
                error: action.error
            })
        case REQUEST_PICTURE:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                id: action.id
            })
        case RECEIVE_PICTURE:
            // return Object.assign({}, state, {
            //     id:action.id,
            //     isFetching: false,
            //     didInvalidate:false,
            //     // img_link: action.picture[0].link,
            //     picture_data:action.picture,
            //
            //     dutu: {
            //         [action.postid] : {
            //             data: action.picture
            //         }
            //     }
            // })
            return {
                dum: {
                    ...state.dum,
                        [action.postid]: action.picture[0].link,
                }
            }
        default:
            return state
    }
}

export default Picture