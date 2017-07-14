/**
 * Created by wiliam969 on 28.04.2017.
 */
import BlogApi from '../../api/BlogApi'

export const REQUEST_BLOG_PREVIEW = 'REQUEST_BLOG_PREVIEW'
export const RECEIVE_BLOG_PREVIEW = 'RECEIVE_BLOG_PREVIEW'
export const INVALIDATE_BLOG_PREVIEW = 'INVALIDATE_BLOG_PREVIEW'

export const requestBlogPreview = (blogs) => {
    return {
        type: 'REQUEST_BLOG_PREVIEW',
        blogs
    }
}

export const receiveBlogpreview = (blogs) => {
    return {
        type: 'RECEIVE_BLOG_PREVIEW',
        blogs,
        receivedAt: Date.now(),
    }
}

export const invalidateBlogPreview = (blogs) => {
    return {
        type:'INVALIDATE_BLOG_PREVIEW',
        blogs
    }
}

export function fetchBlogPreviews(blogs) {
    return function(dispatch) {
        dispatch(requestBlogPreview(blogs))
        return  fetch('http://localhost/wp_rest_api/wp-json/wp/v2/posts/',{method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return dispatch(receiveBlogpreview(responseJson))
            }).catch(error => {
                return dispatch(invalidateBlogPreview(error))
            })
    }
}