import CommentsApi from '../../api/comments'

export const REQUEST_COMMENT = 'REQUEST_COMMENT'
export const REQUEST_LAZY_COMMENT = 'REQUEST_LAZY_COMMENT'
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'
export const RECEIVE_LAZY_COMMENT = 'RECEIVE_LAZY_COMMENT'
export const INVALIDATE_COMMENT = 'INVALIDATE_COMMENT'
export const STOP_COMMENT = 'STOP_COMMENT'
export const NEXT_COMMENT = 'NEXT_COMMENT'

export const SEND_COMMENT = 'SEND_COMMENT'
export const FAILED_COMMENT = 'FAILED_COMMENT'
export const IS_COMMENT = 'IS_COMMENT'

export const requestComment = (comment) => {
    return {
        type: 'REQUEST_COMMENT',
        comment:comment
    }
}

export const requestLazyComment = () => {
    return {
        type: 'REQUEST_LAZY_COMMENT',
    }
}

export const receiveComment = (comment) => {
    return {
        type: 'RECEIVE_COMMENT',
        comment:comment
    }

}

export const receiveLazyComment = (comment) => {
    return {
        type: 'RECEIVE_LAZY_COMMENT',
        comment:comment
    }
}

export const invalidateComment = (comment) => {
    return {
        type: 'INVALIDATE_COMMENT',
        comment: comment
    }
}

export const stopComment = () => {
    return {
        type: 'STOP_COMMENT',
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

export const isComment = () => {
    return {
        type:'IS_COMMENT'
    }
}

export function fetchComments(post,page) {
    const post_id = post

    return function (dispatch, comments) {
        dispatch(requestComment(post_id))
        return CommentsApi.getComments(post_id.blogid,page)
            .then(comments => {
                console.log(comments)
                if(comments.length  == 0) {
                    return dispatch(stopComment())
                }
                return dispatch(receiveComment(comments))
            })
            .catch(error => {
                dispatch(invalidateComment(error))
            })
    }
}

export function fetchLazyComments(post,page) {
    const post_id = post

    return function (dispatch, comments) {
        dispatch(requestLazyComment())
        return CommentsApi.getComments(post_id.blogid,page)
            .then(comments => {
                console.log(comments)
                if(comments.length  == 0) {
                    return dispatch(stopComment())
                }
                return dispatch(receiveLazyComment(comments))
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

export function showComments() {
    return function dispatch(dispatch) {
        dispatch(isComment())
    }
}