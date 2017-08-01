/**
 * Created by wiliam969 on 28.04.2017.
 */
import HomeApi from '../../api/home'
import HomeStorage from '../../storage/home'
import Home from "../reducers/home";

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

        dispatch(requestBlogPreview(blogs))

        return HomeStorage.getBlogPreview()
            .then(LocalPost => {
                if(LocalPost.length > 0) {
                    dispatch(receiveLocalBlogPreview(LocalPost))
                } else {
                    HomeApi.getLatestBlogList()
                        .then((posts) => {
                            dispatch(receiveBlogpreview(posts))

                            HomeStorage.updateOldestDate(posts)

                            return HomeStorage.saveBlogPreviews(posts)
                        })
                        .catch(error => {
                            return dispatch(invalidateBlogPreview(error))
                        })
                }
            }).catch(error => {
                dispatch(invalidateBlogPreview(error))
            })
    }
}

export function fetchLazyBlogPreview(page) {

    return function (dispatch) {

        dispatch(requestLazyBlogPreview())

        return HomeStorage.getLazyBlogPreview(page)
            .then(StorageItems => {

                if(StorageItems.length > 0) {
                    console.log("Store")
                    console.log(StorageItems)
                    dispatch(receiveLazyBlogPreview(StorageItems))
                } else {
                    HomeApi.getLazyBlogPreview(page)
                        .then(ApiResponse => {
                            console.log("Api")
                            console.log(ApiResponse)
                            if(ApiResponse.length == 0){
                                return dispatch(stopLazyBlogPreview())
                            }

                            dispatch(receiveLazyBlogPreview(ApiResponse))

                            return HomeStorage.saveBlogPreviews(ApiResponse)
                        })
                        .catch(error => {
                            dispatch(invalidateBlogPreview(error))
                        })
                }
            })
            .catch(error => {
                dispatch(invalidateBlogPreview(error))
            })

    }
}

export function fetchNewBlogPreview() {
    return function (dispatch) {
        dispatch(requestNewBlogPreview())

        return HomeApi.getnewBlogPreviews()
            .then(blogs => {
                dispatch(receiveAfterBlogPreview(blogs))

                HomeStorage.updateLatestDate()

                return HomeStorage.saveBlogPreviews(blogs)
            })
            .catch(error => {
                return dispatch(invalidateBlogPreview(error))
            })
    }
}