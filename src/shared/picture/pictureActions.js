/**
 * Created by wiliam969 on 28.04.2017.
 */

import PictureApi from './pictureApi'
import PictureStorage from './pictureStorage'

export const REQUEST_PICTURE = 'REQUEST_PICTURE'
export const RECEIVE_PICTURE = 'RECEIVE_PICTURE'
export const INVALIDATE_PICTURE = 'INVALIDATE_PICTURE'

export const requestPicture = (pictureId) => {
    return {
        type: 'REQUEST_PICTURE',
        id: pictureId,
    }
}

export const receivePicture = (pictures,pictureId) => {
    return {
        type: 'RECEIVE_PICTURE',
        picture: pictures,
        id:pictureId
    }
}

export const invalidatePicture = (pictures,pictureId) => {
    return {
        type:'INVALIDATE_PICTURE',
        error:pictures,
        id:pictureId
    }
}

export function fetchPicture (id) {
    return function(dispatch) {

        dispatch(requestPicture(id))

        return PictureStorage.getPicture(id)
            .then(PictureResponse => {
                if(PictureResponse != null) {
                    dispatch(receivePicture(PictureResponse.post,id))
                } else {
                    return PictureApi.getPicture(id)
                        .then(picture => {
                            PictureStorage.savePicture(picture,id)
                            dispatch(receivePicture(picture,id))
                        })
                        .catch(error => {
                            return dispatch(invalidatePicture(error,id))
                        })
                }
            })
            .catch(error => {
                dispatch(invalidatePicture(error, id))
            })
    }
}