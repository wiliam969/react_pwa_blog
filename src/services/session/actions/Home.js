/**
 * Created by wiliam969 on 28.04.2017.
 */
import HomeApi from '../../api/home'
import HomeStorage from '../../storage/home'

export const REQUEST_BLOG_PREVIEW = 'REQUEST_BLOG_PREVIEW'
export const REQUEST_LOCAL_BLOG_PREVIEW = 'REQUEST_LOCAL_BLOG_PREVIEW'
export const REQUEST_LAZY_BLOG_PREVIEW = 'REQUEST_LAZY_BLOG_PREVIEW'
export const RECEIVE_BLOG_PREVIEW = 'RECEIVE_BLOG_PREVIEW'
export const RECEIVE_LOCAL_BLOG_PREVIEW = 'RECEIVE_LOCAL_BLOG_PREVIEW'
export const RECEIVE_LAZY_BLOG_PREVIEW = 'RECEIVE_LAZY_BLOG_PREVIEW'
export const INVALIDATE_BLOG_PREVIEW = 'INVALIDATE_BLOG_PREVIEW'
export const INVALIDATE_LOCAL_BLOG_PREVIEW = 'INVALIDATE_LOCAL_BLOG_PREVIEW'
export const INVALIDATE_LAZY_BLOG_PREVIEW = 'INVALIDATE_LAZY_BLOG_PREVIEW'
export const STOP_LAZY_BLOG_PREVIEW = 'STOP_LAZY_BLOG_PREVIEW'
export const RECEIVE_AFTER_BLOG_PREVIEW = 'RECEIVE_AFTER_BLOG_PREVIEW'

export const requestBlogPreview = (blogs) => {
    return {
        type: 'REQUEST_BLOG_PREVIEW',
        blogs
    }
}

export const requestLocalBlogPreview = (blogs) => {
    return {
        type: 'REQUEST_LOCAL_BLOG_PREVIEW',
        blogs
    }
}

export const requestLazyBlogPreview = (blogs) => {
    return {
        type:'REQUEST_LAZY_BLOG_PREVIEW',
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

export const invalidateLocalBlogPreview = (blogs) => {
    return {
        type:'INVALIDATE_LOCAL_BLOG_PREVIEW',
        blogs
    }
}



export const invalidateLazyBlogPreview = (blogs) => {
    return {
        type:'INVALIDATE_LAZY_BLOG_PREVIEW',
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
        type:'RECEIVE_AFTER_BLOG_PREVIEW',
        blogs,
        receivedAt: Date.now()
    }
}



// this is it lul it wörks haha didint expected this :D

export function fetchBlogPreviews(blogs) {
    return function(dispatch) {
        dispatch(requestLocalBlogPreview(blogs))

        return HomeStorage.getBlogPreview()
            .then(LocalPost => {
                if(LocalPost.length > 0) {
                    dispatch(receiveLocalBlogPreview(LocalPost))
                } else {
                    dispatch(requestBlogPreview(blogs))

                    HomeApi.getLatestBlogList()
                        .then((posts) => {
                            console.log(posts)
                            return dispatch(receiveBlogpreview(posts))
                        })
                        .catch(error => {
                            return dispatch(invalidateBlogPreview(error))
                        })
                }
            }).catch(error => {
                dispatch(invalidateLocalBlogPreview(error))
            })
    }
}

export function fetchNextBlogPreviews(page) {
    return function (dispatch) {
        dispatch(requestLazyBlogPreview(page))

        return HomeApi.getPageBlogPreview(page)
            .then(blogs => {
                console.log(blogs)
                if(blogs.length != 0) {
                    return dispatch(receiveLazyBlogPreview(blogs))
                } else {
                    return dispatch(stopLazyBlogPreview())
                }
            })
            .catch(error => {
                return dispatch(invalidateLazyBlogPreview(error))
            })
    }
}

export function fetchAfterBlogPreview(date) {
    console.log("fetchnextblogpreview triggered")
    return function (dispatch) {
        // dispatch(requestBlogPreview(date))

        return HomeApi.getAfterBlogPreview(date)
            .then(blogs => {
                console.log(blogs)
                return dispatch(receiveAfterBlogPreview(blogs))
            })
            .catch(error => {
                return dispatch(invalidateBlogPreview(error))
            })
    }
}