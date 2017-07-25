/**
 * Created by wiliam969 on 28.04.2017.
 */

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
    console.log(id)
    return function (dispatch,blog) {
        dispatch(requestBlogSingle(id))
        return fetch(process.env.REACT_APP_API_URI + 'posts/' + id, {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return dispatch(receiveBlogSingle(responseJson))
            }).catch(error => {
                return dispatch(invalidateBlogSingle(error))
            })
    }
}

export function fetchLazyBlog(date) {
    const datum = date.blogheader.date
    console.log(datum)
    return function (dispatch,date) {
        dispatch(requestBlogSingle(datum))
        console.log(datum)
        return fetch(process.env.REACT_APP_API_URI +'posts?before=' + datum + '&per_page=1', {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return dispatch(receiveBlogSingle(responseJson))
            }).catch(error => {
                return dispatch(invalidateBlogSingle(error))
            })
    }
}
