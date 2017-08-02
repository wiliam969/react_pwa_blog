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

export const requestComment = (id) => {
    return {
        type: 'REQUEST_COMMENT',
        id:id
    }
}

export const requestLazyComment = (id) => {
    return {
        type: 'REQUEST_LAZY_COMMENT',
        id:id
    }
}

export const receiveComment = (id,comment) => {
    return {
        type: 'RECEIVE_COMMENT',
        id:id,
        comment:comment,
    }

}

export const receiveLazyComment = (id,comment) => {
    return {
        type: 'RECEIVE_LAZY_COMMENT',
        id:id,
        comment:comment,
    }
}

export const invalidateComment = (id) => {
    return {
        type: 'INVALIDATE_COMMENT',
        id: id
    }
}

export const stopComment = (id) => {
    return {
        type: 'STOP_COMMENT',
        id:id,
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

export const isComment = (id) => {
    return {
        type:'IS_COMMENT',
        id:id
    }
}

export function fetchComments(post,page) {
    const post_id = post
    console.log(post_id)

    return function (dispatch) {
        dispatch(requestComment(post_id.blogid))
        return CommentsApi.getComments(post_id.blogid,page)
            .then(comments => {
                console.log(comments)
                if(comments.length  === 0) {
                    return dispatch(stopComment(post_id.blogid))
                }
                return dispatch(receiveComment(post_id.blogid,comments))
            })
            .catch(error => {
                dispatch(invalidateComment(post_id.blogid))
            })
    }
}

export function fetchLazyComments(post,page) {
    const post_id = post

    return function (dispatch) {
        dispatch(requestLazyComment(post_id.blogid))
        return CommentsApi.getComments(post_id.blogid,page)
            .then(comments => {
                console.log(comments)
                if(comments.length  === 0) {
                    return dispatch(stopComment(post_id.blogid))
                }
                return dispatch(receiveLazyComment(post_id.blogid,comments))
            })
            .catch(error => {
                dispatch(invalidateComment(post_id.blogid))
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

export function showComments(post) {
    console.log(post)
    const post_id = post

    return function dispatch(dispatch) {
        dispatch(isComment(post_id.blogid))
    }
}