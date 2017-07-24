/**
 * Created by wiliam969 on 28.04.2017.
 */
import db from '../../storage/index'

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

// this is it lul it wörks haha didint expected this :D

export function fetchBlogPreviews(blogs) {
    return function(dispatch) {
        dispatch(requestBlogPreview(blogs))

        db.transaction('rw', db.bloglist, function () {
            db.bloglist.put({ id:1, content: "fuck them right in the pussy",title :"donald ... !",readmore: "http://whatdefuckareyoudoink.com"})
        })

        return db.bloglist.each(bitem => {
                console.log(bitem)
                dispatch(receiveBlogpreview(bitem))
            }).catch(error => {
                console.log(error)
                return dispatch(invalidateBlogPreview(error))
            }).then( fetch('http://localhost:8080/wp-json/wp/v2/posts/',{method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                return dispatch(receiveBlogpreview(responseJson))
            }).catch(error => {
                return dispatch(invalidateBlogPreview(error))
            })
        )
    }
}