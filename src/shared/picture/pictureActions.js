/**
 * Created by wiliam969 on 28.04.2017.
 */

import PictureApi from './pictureApi'
import PictureStorage from './pictureStorage'

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

export function fetchPicture (props = 1) {
    const id = props

    const PostType = props.posttype

    return function(dispatch,post_id) {

        dispatch(requestPicture(post_id))

        return PictureStorage.getPicture(id.blogid)
            .then(PictureResponse => {
                console.log(id.blogid)
                console.log(PostType)
                if(PictureResponse != null) {
                    console.log(PictureResponse)
                    dispatch(receivePicture(PictureResponse.post,id.blogid))
                } else {
                    console.log(id.blogid)
                    console.log(PostType)
                    return PictureApi.getPicture(id.blogid,PostType)
                        .then(picture => {
                            console.log(picture)
                            PictureStorage.savePicture(picture,id.blogid)
                            dispatch(receivePicture(picture,id.blogid))
                        })
                        .catch(error => {
                            console.log(error)
                            return dispatch(invalidatePicture(error,id.blogid))
                        })
                }
            })
            .catch(error => {
                dispatch(invalidatePicture(error, id.blogid))
            })
    }
}