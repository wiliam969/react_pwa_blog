import GalleryApi from './galleryApi'

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

export const receiveFullscreenGalleryItems = (Items) => {
    return {
        type:'RECEIVE_FULLSCREEN_GALLERY_ITEMS',
        Items
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

export const fetchPrevFullscreenGalleryItem = (Items) => {
    return {
        type:'FETCH_PREV_FULLSCREEN_GALLERY_ITEM',
        Items
    }
}

export const stopFetchPrevFullscreenGalleryItem = () => {
    return {
        type:'STOP_FETCH_PREV_FULLSCREEN_GALLERY_ITEM',
    }
}

export const fetchNextFullscreenGalleryItem = (Items) => {
    return {
        type:'FETCH_NEXT_FULLSCREEN_GALLERY_ITEM',
        Items
    }
}

export const stopFetchNextFullscreenGalleryItem = () => {
    return {
        type:'STOP_FETCH_NEXT_FULLSCREEN_GALLERY_ITEM'
    }
}

export const closeFullscreenGalleryItem = () => {
    return {
        type:'CLOSE_FULLSCREEN_GALLERY_ITEM'
    }
}

export function fetchGalleryItems () {
    return function (dispatch) {
        dispatch(requestGalleryItems())

        return GalleryApi.getGalleryItems()
            .then(ApiResponse => {
                console.log(ApiResponse)

                return dispatch(receiveGalleryItems(ApiResponse))
            })
            .catch(error => {
                dispatch(invalidateGalleryItems())
                console.log(error)
                return error
            })
    }

}

export function fetchLazyGalleryItems (page) {
    console.log(page)
    return function (dispatch) {
        dispatch(requestLazyGalleryItems())

        return GalleryApi.getLazyGalleryItems(page)
            .then(ApiResponse => {
                console.log(ApiResponse)
                if(ApiResponse.length === 0) {
                    console.log(ApiResponse)
                    return dispatch(stopLazyGalleryItems())
                } else{
                    return dispatch(receiveLazyGalleryItems(ApiResponse))
                }
            })
            .catch(error => {
                dispatch(invalidateGalleryItems())
                console.log(error)
                return error
            })
    }
}

export function fetchFullscreenGalleryItem (id) {
    const gal_id = id

    return function (dispatch) {
        dispatch(requestFullscreenGalleryItems())

        return dispatch(receiveFullscreenGalleryItems(id))
    }
}

export function prevFullScreenGalleryItem (index,props) {
    return function (dispatch) {
        if(props.id > 0 ) {
            return dispatch(fetchPrevFullscreenGalleryItem(index))
        } else {
            return dispatch(stopFetchPrevFullscreenGalleryItem())
        }
    }
}

export function nextFullScreenGalleryitem (index,props) {
    return function (dispatch) {
        if(index < (props.last_item - 1)) {
            return dispatch(fetchNextFullscreenGalleryItem(index))
        } else {
            return dispatch(stopFetchNextFullscreenGalleryItem())
        }
    }
}

export function closeFullscreenGallery () {
    return function (dispatch) {
        return dispatch(closeFullscreenGalleryItem())
    }
}