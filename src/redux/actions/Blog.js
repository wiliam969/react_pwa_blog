/**
 * Created by wiliam969 on 28.04.2017.
 */
import axios from 'axios'

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
        return axios.get('http://localhost:8000/wp-json/wp/v2/posts/' + id)
            .then(response => {
                return dispatch(receiveBlogSingle(response.data))
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
        return axios.get('http://localhost:8000/wp-json/wp/v2/posts?before=' + datum + '&per_page=1')
            .then(response => {
                console.log(response)



                return dispatch(receiveBlogSingle(response.data[0]))
            }).catch(error => {
                return dispatch(invalidateBlogSingle(error))
            })
    }
}
