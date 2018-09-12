import Api from '../Api'

import {
    isFetchingData,
    stopFetchingData
} from '../app/appActions'

export const REQUEST_GALLERY_ITEMS = 'REQUEST_GALLERY_ITEMS'
export const RECEIVE_GALLERY_ITEMS = 'RECEIVE_GALLERY_ITEMS'
export const INVALIDATE_GALLERY_ITEMS = 'INVALIDATE_GALLERY_ITEMS'

export const REQUEST_LAZY_GALLERY_ITEMS = 'REQUEST_LAZY_GALLERY_ITEMS'
export const RECEIVE_LAZY_GALLERY_ITEMS = 'RECEIVE_LAZY_GALLERY_ITEMS'
export const STOP_LAZY_GALLERY_ITEMS = 'STOP_LAZY_GALLERY_ITEMS'

export const REQUEST_FULLSCREEN_GALLERY_ITEMS = 'REQUEST_FULLSCREEN_GALLERY_ITEMS'
export const RECEIVE_FULLSCREEN_GALLERY_ITEMS = 'RECEIVE_FULLSCREEN_GALLERY_ITEMS'

export const FETCH_PREV_FULLSCREEN_GALLERY_ITEM = 'FETCH_PREV_FULLSCREEN_GALLERY_ITEM'
export const FETCH_NEXT_FULLSCREEN_GALLERY_ITEM = 'FETCH_NEXT_FULLSCREEN_GALLERY_ITEM'

export const STOP_FETCH_PREV_FULLSCREEN_GALLERY_ITEM = 'STOP_FETCH_PREV_FULLSCREEN_GALLERY_ITEM'
export const STOP_FETCH_NEXT_FULLSCREEN_GALLERY_ITEM = 'STOP_FETCH_NEXT_FULLSCREEN_GALLERY_ITEM'

export const CLOSE_FULLSCREEN_GALLERY_ITEM = 'CLOSE_FULLSCREEN_GALLERY_ITEM'

export const REQUEST_URL_FULLSCREEN_GALLERY_ITEM = 'REQUEST_URL_FULLSCREEN_GALLERY_ITEM'
export const RECEIVE_URL_FULLSCREEN_GALLERY_ITEM = 'RECEIVE_URL_FULLSCREEN_GALLERY_ITEM'

export const requestGalleryItems = () => {
    return {
        type: 'REQUEST_GALLERY_ITEMS'
    }
}

export const requestLazyGalleryItems = ()  => {
    return {
        type: 'REQUEST_LAZY_GALLERY_ITEMS'
    }
}

export const requestFullscreenGalleryItems = () => {
    return {
        type: 'REQUEST_FULLSCREEN_GALLERY_ITEMS'
    }
}

export const receiveGalleryItems = (Items) => {
    return {
        type:'RECEIVE_GALLERY_ITEMS',
        Items,
    }
}

export const receiveLazyGalleryItems = (Items) => {
    return {
        type:'RECEIVE_LAZY_GALLERY_ITEMS',
        Items
    }
}

export const receiveFullscreenGalleryItems = (Items,slug) => {
    return {
        type:'RECEIVE_FULLSCREEN_GALLERY_ITEMS',
        Items,
        slug
    }
}

export const invalidateGalleryItems = () => {
    return {
        type:'INVALIDATE_GALLERY_ITEMS'
    }
}

export const stopLazyGalleryItems = () => {
    return {
        type:'STOP_LAZY_GALLERY_ITEMS'
    }
}

export const fetchPrevFullscreenGalleryItem = (index,Items) => {
    return {
        type:'FETCH_PREV_FULLSCREEN_GALLERY_ITEM',
        Index:index,
        Items
    }
}

export const stopFetchPrevFullscreenGalleryItem = () => {
    return {
        type:'STOP_FETCH_PREV_FULLSCREEN_GALLERY_ITEM',
    }
}

export const fetchnextFullScreenGalleryItem = (index,Items) => {
    return {
        type:'FETCH_NEXT_FULLSCREEN_GALLERY_ITEM',
        Index:index,
        Items
    }
}

export const stopFetchnextFullScreenGalleryItem = () => {
    return {
        type:'STOP_FETCH_NEXT_FULLSCREEN_GALLERY_ITEM'
    }
}

export const closeFullscreenGalleryItem = () => {
    return {
        type:'CLOSE_FULLSCREEN_GALLERY_ITEM'
    }
}

export const requestURLFullscreenGalleryItem = (Slug) => {
    return {
        type:'REQUEST_URL_FULLSCREEN_GALLERY_ITEM',
        Slug:Slug
    }
}

export const receiveURLFullscreenGalleryItem = (Item,Slug) => {
    return {
        type:'RECEIVE_URL_FULLSCREEN_GALLERY_ITEM',
        Items:Item,
        Slug:Slug
    }
}

export function fetchGalleryItems () {
    return function (dispatch) {
        dispatch(isFetchingData())

        const Args = {
            per_page : 6,
        }

        return Api.getPosts("gallery", Args)
            .then(ApiResponse => {
                dispatch(receiveGalleryItems(ApiResponse))

                return dispatch (stopFetchingData())
            })
            .catch(error => {
                dispatch(invalidateGalleryItems())
                return error
            })
    }
}



export function fetchLazyGalleryItems (page) {
    return function (dispatch) {
        dispatch(requestLazyGalleryItems())

        const Args = {
            per_page : 6,
            page : page,
        }

        return Api.getPosts("gallery", Args)
            .then(ApiResponse => {
                return dispatch(receiveLazyGalleryItems(ApiResponse))
            })
            .catch(error => {
                dispatch(invalidateGalleryItems())
                return error
            })
    }
}

export function fetchFullscreenGalleryItem (id) {

    return function (dispatch) {
        dispatch(requestFullscreenGalleryItems())

        return dispatch(receiveFullscreenGalleryItems(id))
    }
}

export function prevFullScreenGalleryItem (index,props) {
    const date = props.item[0].date
    return function (dispatch) {
        // To check if an item before the current exists
        if(props.id > 0 ) {

        const Args = {
            after : date,
            per_page : 1,
            page : 1,
            order : "asc"
        }

        return Api.getPosts("gallery",Args)
            .then(ApiResponse => {
                return dispatch(fetchPrevFullscreenGalleryItem(index,ApiResponse))
            })
        } else {
            return dispatch(stopFetchPrevFullscreenGalleryItem())
        }
    }
}

export function nextFullScreenGalleryItem (index,props) {

    const date = props.item[0].date

    return function (dispatch) {

        // To check if an item after the current exist
        if(index < (props.last_item - 1)) {
            const Args = {
                after : date,
                per_page : 1,
                page : 1,
                order : "desc"
            }

            return Api.getPosts("gallery",Args)
                .then(ApiResponse => {
                    return dispatch(fetchnextFullScreenGalleryItem(index, ApiResponse))
                }).catch(error => {
                    return dispatch(stopFetchnextFullScreenGalleryItem())
                })
        } else {
            return dispatch(stopFetchnextFullScreenGalleryItem())
        }
    }
}




export function closeFullscreenGallery () {
    return function (dispatch) {
        return dispatch(closeFullscreenGalleryItem())
    }
}

export function fetchURLFullscreenGalleryItem(props) {
    const slug = props.match.params.slug

    return function (dispatch) {
        dispatch(requestURLFullscreenGalleryItem())

        const Args = {
            slug : slug,
        }

        return Api.getPosts("gallery", Args)
            .then(ApiResponse => {
                return dispatch(receiveURLFullscreenGalleryItem(ApiResponse,slug))
            }).catch(error => {
                return dispatch(stopFetchPrevFullscreenGalleryItem())
            })
    }
}