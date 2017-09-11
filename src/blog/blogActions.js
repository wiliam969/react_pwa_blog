/**
 * Created by wiliam969 on 28.04.2017.
 */

import BlogApi from './blogApi'
import BlogStorage from './blogStorage'

export const REQUEST_BLOG_SINGLE = 'REQUEST_BLOG_SINGLE'
export const REQUEST_LAZY_BLOG_SINGLE = 'REQUEST_LAZY_BLOG_SINGLE'
export const RECEIVE_BLOG_SINGLE = 'RECEIVE_BLOG_SINGLE'
export const RECEIVE_LAZY_BLOG_SINGLE = 'RECEIVE_LAZY_BLOG_SINGLE'
export const INVALIDATE_BLOG_SINGLE = 'INVALIDATE_BLOG_SINGLE'
export const STOP_LAZY_BLOG_SINGLE = 'STOP_LAZY_BLOG_SINGLE'

export const requestBlogSingle = (id) => {
    return {
        type: 'REQUEST_BLOG_SINGLE',
        id
    }
}

export const requestLazyBlogSingle = (id) => {
    return {
        type: 'REQUEST_LAZY_BLOG_SINGLE',
        id
    }
}

export const receiveBlogSingle = (blog,id) => {
    return {
        type: 'RECEIVE_BLOG_SINGLE',
        blog,
        id,
        receivedAt: Date.now(),
    }
}

export const receiveLazyBlogSingle = (blog,id) => {
    return {
        type:'RECEIVE_LAZY_BLOG_SINGLE',
        blog:blog,
        id,
        receivedAt: Date.now(),
    }
}

export const invalidateBlogSingle = (blog,id) => {
    return {
        type:'INVALIDATE_BLOG_SINGLE',
        id
    }
}

export const stopLazyBlogSingle = (id,index) => {
    return {
        type: 'STOP_LAZY_BLOG_SINGLE',
        prev_id:id,
        index,
    }
}

export function fetchBlogSingle(blog = 1) {
    const id = blog.match.params.id

    return function (dispatch) {
        dispatch(requestBlogSingle(id))

        return BlogStorage.getBlogSingle(id)
            .then(StorageResponse => {
                if(StorageResponse != null) {
                    dispatch(receiveBlogSingle(StorageResponse,id))
                } else {
                    return BlogApi.getBlogSingle(id)
                        .then(ApiResponse => {
                            BlogStorage.saveBlogSingle(ApiResponse)
                            dispatch(receiveBlogSingle(ApiResponse,id))
                        }).catch(error => {
                            dispatch(invalidateBlogSingle(id))
                        })
                }
            })
    }
}

export function fetchLazyBlog(props) {
    console.log(props)
    const datum = props.date
    const id = props.id
    const index = props.index
    console.log(id)
    return function (dispatch,props) {
        dispatch(requestLazyBlogSingle(id))
        return BlogApi.getLazyBlogSingle(datum)
            .then(post => {
                if(typeof post === 'undefined' && post === null) {
                    return dispatch(stopLazyBlogSingle(id,index))
                }
                dispatch(receiveLazyBlogSingle(post,post.id,id))
                dispatch(stopLazyBlogSingle(id,index))
            })
            .catch(error => {
                dispatch(invalidateBlogSingle(error))
            })
    }
}
