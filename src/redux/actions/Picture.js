/**
 * Created by wiliam969 on 28.04.2017.
 */
import axios from 'axios'
import inView from 'in-view'

export const REQUEST_PICTURE = 'REQUEST_PICTURE'
export const RECEIVE_PICTURE = 'RECEIVE_PICTURE'
export const INVALIDATE_PICTURE = 'INVALIDATE_PICTURE'

export const requestPicture = (pictures) => {
    return {
        type: 'REQUEST_PICTURE',
        id: pictures,
    }
}

export const receivePicture = (pictures) => {
    return {
        type: 'RECEIVE_PICTURE',
        picture: pictures,
    }
}

export const invalidatePicture = (pictures) => {
    return {
        type:'INVALIDATE_PICTURE',
        error:pictures,
    }
}

export function fetchPicture (post_id = 1) {
    const id = post_id
    console.log("asdasd" + post_id)
    return function(dispatch,post_id) {
        console.log("wtf is this shit im out" + id)
        console.log("ahahaha" + post_id)
        console.log(post_id)
        dispatch(requestPicture(post_id))

        return axios.get('http://localhost/wp_rest_api/wp-json/wp/v2/media?parent=' + post_id.blogid)
            .then(response => {
                return dispatch(receivePicture(response.data))
            }).catch(error => {
                return dispatch(invalidatePicture(error))
            })
    }
}