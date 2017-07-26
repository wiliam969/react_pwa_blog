import CommentsApi from '../../api/comments'

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
        return CommentsApi.getComments(post_id.blogid)
            .then(comments => {
                dispatch(receiveComment(comments))
            })
            .catch(error => {
                dispatch(invalidateComment(error))
            })
    }
}

export function sendComments(comments) {
    const comments_data = comments
    return function(dispatch,comments) {
        return CommentsApi.sendComment(comments_data)
            .then(response => {
                dispatch(sendComment(response))
            })
            .catch(error => {
                dispatch(failedComment(error))
            })
    }
}