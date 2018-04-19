/**
 * Created by wiliam969 on 28.04.2017.
 */
import BlogApi from './blogApi'
import BlogStorage from './blogStorage'

import {
    isFetchingData,
    stopFetchingData
} from '../app/appActions'

export const REQUEST_BLOG_PREVIEW = 'REQUEST_BLOG_PREVIEW'
export const REQUEST_LAZY_BLOG_PREVIEW = 'REQUEST_LAZY_BLOG_PREVIEW'
export const REQUEST_NEW_BLOG_PREVIEW = 'REQUEST_NEW_BLOG_PREVIEW'
export const RECEIVE_BLOG_PREVIEW = 'RECEIVE_BLOG_PREVIEW'
export const RECEIVE_LOCAL_BLOG_PREVIEW = 'RECEIVE_LOCAL_BLOG_PREVIEW'
export const RECEIVE_LAZY_BLOG_PREVIEW = 'RECEIVE_LAZY_BLOG_PREVIEW'
export const INVALIDATE_BLOG_PREVIEW = 'INVALIDATE_BLOG_PREVIEW'
export const STOP_LAZY_BLOG_PREVIEW = 'STOP_LAZY_BLOG_PREVIEW'
export const RECEIVE_NEW_BLOG_PREVIEW = 'RECEIVE_NEW_BLOG_PREVIEW'


export const requestBlogPreview = (blogs) => {
    return {
        type: 'REQUEST_BLOG_PREVIEW',
        blogs
    }
}

export const requestLazyBlogPreview = () => {
    return {
        type:'REQUEST_LAZY_BLOG_PREVIEW',
    }
}

export const requestNewBlogPreview = () => {
    return {
        type:'REQUEST_NEW_BLOG_PREVIEW'
    }
}

export const receiveBlogpreview = (blogs) => {
    return {
        type: 'RECEIVE_BLOG_PREVIEW',
        blogs,
        receivedAt: Date.now(),
    }
}

export const receiveLocalBlogPreview = (blogs) => {
    return {
        type: 'RECEIVE_LOCAL_BLOG_PREVIEW',
        blogs,
        receivedAt: Date.now()
    }
}

export const receiveLazyBlogPreview = (blogs) => {
    return {
        type:'RECEIVE_LAZY_BLOG_PREVIEW',
        blogs,
    }
}

export const invalidateBlogPreview = (blogs) => {
    return {
        type:'INVALIDATE_BLOG_PREVIEW',
        blogs
    }
}

export const stopLazyBlogPreview = () => {
    return {
        type:'STOP_LAZY_BLOG_PREVIEW',
    }
}

export const receiveAfterBlogPreview = (blogs) => {
    return {
        type:'RECEIVE_NEW_BLOG_PREVIEW',
        blogs,
        receivedAt: Date.now()
    }
}

// this is it lul it wörks haha didint expected this :D

export function fetchBlogPreviews(blogs) {

    return function(dispatch) {

        dispatch(isFetchingData(blogs))


    BlogApi.getLatestBlogList()
        .then((posts) => {
            dispatch(receiveBlogpreview(posts))

            dispatch(stopFetchingData())
            return BlogStorage.updateOldestDate(posts)
        })
        .catch(error => {
            return dispatch(invalidateBlogPreview(error))
        })
    }
}


export function fetchLazyBlogPreview(page) {
    return function (dispatch) {

        dispatch(requestLazyBlogPreview())


        BlogApi.getLazyBlogPreview(page)
            .then(ApiResponse => {
                if(typeof ApiResponse.data !== "undefined") {
                    return dispatch(stopLazyBlogPreview())

                } else if(ApiResponse.length === 0){
                    return dispatch(stopLazyBlogPreview())
                }

                return dispatch(receiveLazyBlogPreview(ApiResponse))
            })
            .catch(error => {
                dispatch(invalidateBlogPreview(error))
            })
    }
}

export function fetchNewBlogPreview() {
    return function (dispatch) {
        dispatch(requestNewBlogPreview())

        return BlogApi.getnewBlogPreviews()
            .then(blogs => {
                dispatch(receiveAfterBlogPreview(blogs))

                return BlogStorage.updateLatestDate()
            })
            .catch(error => {
                return dispatch(invalidateBlogPreview(error))
            })
    }
}