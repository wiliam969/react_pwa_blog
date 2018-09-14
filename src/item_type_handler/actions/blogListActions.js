import BlogStorage from '../blogStorage'
import db from '../../boot/bootIndexeddb'

import Api from '../../Api'

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


export const requestBlogPreview = (blogs) => { return { type: 'REQUEST_BLOG_LIST', blogs } }
export const requestLazyBlogPreview = () => { return { type:'REQUEST_LAZY_BLOG_LIST' } }
export const requestNewBlogPreview = () => { return { type:'REQUEST_NEW_BLOG_LIST' } }
export const invalidateBlogPreview = (blogs) => { return { type:'INVALIDATE_BLOG_LIST', blogs } }
export const stopLazyBlogPreview = () => { return { type:'STOP_LAZY_BLOG_LIST' } }
export const stopNewBlogPreview = () => { return { type:'STOP_NEW_BLOG_LIST' }}

export const receiveBlogpreview = (blogs,ItemType) => {
    return {
        type: 'RECEIVE_BLOG_LIST',
        blogs,
        ItemType: ItemType,
        receivedAt: Date.now(),
    }
}

export const receiveLazyBlogPreview = (blogs,ItemType) => {
    return {
        type:'RECEIVE_LAZY_BLOG_LIST',
        blogs,
        ItemType: ItemType
    }
}

export const receiveAfterBlogPreview = (blogs) => {
    return {
        type:'RECEIVE_NEW_BLOG_LIST',
        blogs,
        receivedAt: Date.now()
    }
}

/**
 * Here we call the api to get the latest content and
 * to update our timestamps in order to receive the
 * correct blogitems for each btn *
 * @param blogs
 * @returns {Function}
 */
export function fetchBlogPreviews(props) {

    return function(dispatch) {

        dispatch(isFetchingData(props))

        const Args = { "per_page" : 3 }

        const ItemType = props.match.params.type

        return Api.getPosts(ItemType,Args)
            .then((posts) => {
                dispatch(receiveBlogpreview(posts,ItemType))

                dispatch(stopFetchingData())

                return BlogStorage.createDefaultTimestamps(posts)
            })
            .catch(error => {
                return dispatch(invalidateBlogPreview(error))
            })
    }
}

/**
 * To seperate each event on the website
 * we also have an action for the lazyload
 * of the item_type_handler
 * @param page
 * @returns {Function}
 */
export function fetchLazyBlogPreview(props) {
    return function (dispatch) {

        dispatch(requestLazyBlogPreview())

        const ItemType = props.match.params.type
        const page = props.Blog.LazyPage

        // since dexie works with promises we have to create
        // large promise statement to insure that it works
        return db.timestamp.get({id:1}).then (
            (response) => {

                const Args = { before : response.oldestDate, per_page : 3, page : page }

                return Api.getPosts(ItemType, Args)
                    .then(ApiResponse => {
                        console.log(ApiResponse)
                        if(typeof ApiResponse.data !== "undefined") {
                            return dispatch(stopLazyBlogPreview())

                        } else if(ApiResponse.length === 0){
                            return dispatch(stopLazyBlogPreview())
                        }

                        return dispatch(receiveLazyBlogPreview(ApiResponse,ItemType))
                    })
                    .catch(error => {
                        dispatch(invalidateBlogPreview(error))
                    })
        })
    }
}

/**
 * Same goes for the New item_type_handler function
 * @returns {function(*): *}
 */
export function fetchNewBlogPreview() {
    return function (dispatch) {
        dispatch(requestNewBlogPreview())

        return db.timestamp.get({id: 1})
            .then(response => {

                const Args = { before : response.latestDate }

                return Api.getPosts("posts", Args)
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
            })

    }
}
