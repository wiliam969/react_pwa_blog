/**
 * Created by wiliam969 on 28.04.2017.
 */

import PictureApi from '../../api/picture'

export const REQUEST_PICTURE = 'REQUEST_PICTURE'
export const RECEIVE_PICTURE = 'RECEIVE_PICTURE'
export const INVALIDATE_PICTURE = 'INVALIDATE_PICTURE'

export const requestPicture = (pictures) => {
    return {
        type: 'REQUEST_PICTURE',
        id: pictures,
    }
}

export const receivePicture = (pictures,postid) => {
    return {
        type: 'RECEIVE_PICTURE',
        picture: pictures,
        id:postid
    }
}

export const invalidatePicture = (pictures,postid) => {
    return {
        type:'INVALIDATE_PICTURE',
        error:pictures,
        id:postid
    }
}

export function fetchPicture (post_id = 1) {
    const id = post_id
    return function(dispatch,post_id) {
        dispatch(requestPicture(post_id))

        return PictureApi.getPicture(id.blogid)
            .then(picture => {
                return dispatch(receivePicture(picture,id.blogid))
            })
            .catch(error => {
                return dispatch(invalidatePicture(error,id.blogid))
            })
    }
}