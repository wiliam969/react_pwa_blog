/**
 * Created by wiliam969 on 28.04.2017.
 */

import BlogApi from '../../api/blog'
import BlogStorage from '../../storage/blog'

export const REQUEST_BLOG_SINGLE = 'REQUEST_BLOG_SINGLE'
export const REQUEST_LAZY_BLOG_SINGLE = 'REQUEST_LAZY_BLOG_SINGLE'
export const RECEIVE_BLOG_SINGLE = 'RECEIVE_BLOG_SINGLE'
export const RECEIVE_LAZY_BLOG_SINGLE = 'RECEIVE_LAZY_BLOG_SINGLE'
export const INVALIDATE_BLOG_SINGLE = 'INVALIDATE_BLOG_SINGLE'

export const requestBlogSingle = (blog) => {
    return {
        type: 'REQUEST_BLOG_SINGLE',
        blog:blog
    }
}

export const requestLazyBlogSingle = (id) => {
    return {
        type: 'REQUEST_LAZY_BLOG_SINGLE',
        id:id
    }
}

export const receiveBlogSingle = (blog) => {
    return {
        type: 'RECEIVE_BLOG_SINGLE',
        blog:blog,
        receivedAt: Date.now(),
    }
}

export const receiveLazyBlogSingle = (blog,id) => {
    return {
        type:'RECEIVE_LAZY_BLOG_SINGLE',
        blog:blog,
        receivedAt: Date.now(),
        id:id
    }
}

export const invalidateBlogSingle = (blog) => {
    return {
        type:'INVALIDATE_BLOG_SINGLE',
        blog:blog
    }
}

export function fetchBlogSingle(blog = 1) {
    const id = blog.match.params.id

    return function (dispatch) {
        dispatch(requestBlogSingle(id))

        return BlogStorage.getBlogSingle(id)
            .then(StorageResponse => {
                if(StorageResponse != null) {
                    dispatch(receiveBlogSingle(StorageResponse))
                } else {
                    return BlogApi.getBlogSingle(id)
                        .then(ApiResponse => {
                            BlogStorage.saveBlogSingle(ApiResponse)
                            dispatch(receiveBlogSingle(ApiResponse))
                        }).catch(error => {
                            dispatch(invalidateBlogSingle(error))
                        })
                }
            })
    }
}

export function fetchLazyBlog(date) {
    console.log(date)
    const datum = date.date
    const id = date.id
    return function (dispatch,date) {
        dispatch(requestLazyBlogSingle(id))
        return BlogApi.getLazyBlogSingle(datum)
            .then(post => {
                console.log(post)
                dispatch(receiveLazyBlogSingle(post,id))
            })
            .catch(error => {
                dispatch(invalidateBlogSingle(error))
            })
    }
}
