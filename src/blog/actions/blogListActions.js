/**
 * Created by wiliam969 on 28.04.2017.
 */
import BlogListApi from '../api/blogListApi'
import BlogStorage from '../blogStorage'

import {
    isFetchingData,
    stopFetchingData
} from '../../app/appActions'

export const REQUEST_BLOG_LIST = 'REQUEST_BLOG_PREVIEW'
export const REQUEST_LAZY_BLOG_LIST = 'REQUEST_LAZY_BLOG_LIST'
export const REQUEST_NEW_BLOG_LIST = 'REQUEST_NEW_BLOG_LIST'
export const RECEIVE_BLOG_LIST = 'RECEIVE_BLOG_LIST'
export const RECEIVE_LOCAL_BLOG_LIST = 'RECEIVE_LOCAL_BLOG_LIST'
export const RECEIVE_LAZY_BLOG_LIST = 'RECEIVE_LAZY_BLOG_LIST'
export const INVALIDATE_BLOG_LIST = 'INVALIDATE_BLOG_LIST'
export const STOP_LAZY_BLOG_LIST = 'STOP_LAZY_BLOG_LIST'
export const RECEIVE_NEW_BLOG_LIST = 'RECEIVE_NEW_BLOG_LIST'
export const STOP_NEW_BLOG_LIST = 'STOP_NEW_BLOG_LIST'


export const requestBlogPreview = (blogs) => {
    return {
        type: 'REQUEST_BLOG_LIST',
        blogs
    }
}

export const requestLazyBlogPreview = () => {
    return {
        type:'REQUEST_LAZY_BLOG_LIST',
    }
}

export const requestNewBlogPreview = () => {
    return {
        type:'REQUEST_NEW_BLOG_LIST'
    }
}

export const receiveBlogpreview = (blogs) => {
    return {
        type: 'RECEIVE_BLOG_LIST',
        blogs,
        receivedAt: Date.now(),
    }
}

export const receiveLazyBlogPreview = (blogs) => {
    return {
        type:'RECEIVE_LAZY_BLOG_LIST',
        blogs,
    }
}

export const invalidateBlogPreview = (blogs) => {
    return {
        type:'INVALIDATE_BLOG_LIST',
        blogs
    }
}

export const stopLazyBlogPreview = () => {
    return {
        type:'STOP_LAZY_BLOG_LIST',
    }
}

export const receiveAfterBlogPreview = (blogs) => {
    return {
        type:'RECEIVE_NEW_BLOG_LIST',
        blogs,
        receivedAt: Date.now()
    }
}

export const stopNewBlogPreview = () => {
    return {
        type:'STOP_NEW_BLOG_LIST',
    }
}

// this is it lul it wörks haha didint expected this :D

export function fetchBlogPreviews(blogs) {

    return function(dispatch) {

        dispatch(isFetchingData(blogs))


    BlogListApi.getLatestBlogList()
        .then((posts) => {
            dispatch(receiveBlogpreview(posts))

            dispatch(stopFetchingData())

            return BlogStorage.createDefaultTimestamps(posts)
        })
        .catch(error => {
            return dispatch(invalidateBlogPreview(error))
        })
    }
}


export function fetchLazyBlogPreview(page) {
    console.log(page)
    return function (dispatch) {

        dispatch(requestLazyBlogPreview())


        BlogListApi.getLazyBlogPreview(page)
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

        return BlogListApi.getnewBlogPreviews()
            .then(apiResponse => {
                if(apiResponse.length === 0) {
                    return dispatch(stopNewBlogPreview())
                }

                dispatch(receiveAfterBlogPreview(apiResponse))

                return BlogStorage.updateLatestTimestamp(apiResponse)
            })
            .catch(error => {
                return dispatch(invalidateBlogPreview(error))
            })
    }
}
