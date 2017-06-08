/**
 * Created by wiliam969 on 28.04.2017.
 */
import BlogApi from '../../api/BlogApi'

export const REQUEST_BLOG_SINGLE = 'REQUEST_BLOG_SINGLE'
export const RECEIVE_BLOG_SINGLE = 'RECEIVE_BLOG_SINGLE'
export const INVALIDATE_BLOG_SINGLE = 'INVALIDATE_BLOG_SINGLE'

export const requestBlogSingle = (blog) => {
    return {
        type: 'REQUEST_BLOG_SINGLE',
        blog
    }
}

export const receiveBlogSingle = (blog) => {
    return {
        type: 'RECEIVE_BLOG_SINGLE',
        blog,
        receivedAt: Date.now(),
    }
}

export const invalidateBlogSingle = (blog) => {
    return {
        type:'INVALIDATE_BLOG_SINGLE',
        blog
    }
}

export function fetchBlogSingle(blog) {

    return function (dispatch) {

        dispatch(requestBlogSingle(blog))

        let api = new BlogApi()

        return api.getSingleBlog(blog)
            .then(response => {
                let ResponseObj = Object.assign({}, response.data)
                return dispatch(receiveBlogSingle(ResponseObj))
            }).catch(error => {
                return dispatch(invalidateBlogSingle(error))
            })
    }
}
