/**
 * Created by wiliam969 on 28.04.2017.
 */

import BlogApi from '../../api/blog'
import BlogStorage from '../../storage/blog'

export const REQUEST_BLOG_SINGLE = 'REQUEST_BLOG_SINGLE'
export const RECEIVE_BLOG_SINGLE = 'RECEIVE_BLOG_SINGLE'
export const INVALIDATE_BLOG_SINGLE = 'INVALIDATE_BLOG_SINGLE'

export const requestBlogSingle = (blog) => {
    return {
        type: 'REQUEST_BLOG_SINGLE',
        blog:blog
    }
}

export const receiveBlogSingle = (blog) => {
    return {
        type: 'RECEIVE_BLOG_SINGLE',
        blog:blog,
        receivedAt: Date.now(),
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
                    console.log("Storage Response")
                    dispatch(receiveBlogSingle(StorageResponse))
                } else {
                    console.log("Api Response")
                    return BlogApi.getBlogSingle(id)
                        .then(ApiResponse => {
                            console.log(ApiResponse)
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
    const datum = date.blogheader.date
    console.log(datum)
    return function (dispatch,date) {
        dispatch(requestBlogSingle(datum))
        console.log(datum)
        return BlogApi.getLazyBlogSingle(datum)
            .then(post => {
                dispatch(receiveBlogSingle(post))
            })
            .catch(error => {
                dispatch(invalidateBlogSingle(error))
            })
    }
}
