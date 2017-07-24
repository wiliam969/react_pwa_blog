import axios from 'axios'

export const REQUEST_COMMENT = 'REQUEST_COMMENT'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const INVALIDATE_COMMENT = 'INVALIDATE_COMMENT'

export const SEND_COMMENT = 'SEND_COMMENT'
export const FAILED_COMMENT = 'FAILED_COMMENT'

export const requestComment = (comment) => {
    return {
        type: 'REQUEST_COMMENT',
        comment:comment
    }
}

export const receiveComment = (comment) => {
    return {
        type: 'RECEIVE_COMMENT',
        comment:comment
    }

}

export const invalidateComment = (comment) => {
    return {
        type: 'INVALIDATE_COMMENT',
        comment: comment
    }
}

export const sendComment = (comment) => {
    return {
        type: 'SEND_COMMENT',
        comment: comment
    }
}

export const failedComment = (comment) => {
    return {
        type: 'FAILED_COMMENT',
        comment:comment,
    }
}

export function fetchComments(post) {
    const post_id = post

    return function (dispatch, comments) {
        dispatch(requestComment(post_id))
        return axios.get('http://localhost:8000/wp-json/wp/v2/comments?post=' + post_id.blogid)
            .then(response => {
                console.log(response)
                dispatch(receiveComment(response.data))
            }).catch(error => {
                console.log(error)
                dispatch(invalidateComment(error))
            })
    }
}

export function sendComments(comments) {
    const comments_data = comments

    return function(dispatch,comments) {

        console.log(comments)

        console.log(comments_data)
        console.log("hey")
        return axios.post('http://localhost:8000/wp-json/v2/comments', {
            author_name: comments_data.commentname,
            post: 1,
            content: comments_data.commentpost,
            author_url:comments_data.commentwebsite,
            author_email:comments_data.commentemail,
        })
            .then(response => {
                console.log(response)
                return dispatch(sendComment(response.data))
            }).catch(error => {
                console.log(error)
                return dispatch(failedComment(error))
            })
    }
}