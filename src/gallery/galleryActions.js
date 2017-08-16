import GalleryApi from './galleryApi'

export const REQUEST_GALLERY_ITEMS = 'REQUEST_GALLERY_ITEMS'
export const RECEIVE_GALLERY_ITEMS = 'RECEIVE_GALLERY_ITEMS'
export const INVALIDATE_GALLERY_ITEMS = 'INVALIDATE_GALLERY_ITEMS'

export const REQUEST_LAZY_GALLERY_ITEMS = 'REQUEST_LAZY_GALLERY_ITEMS'
export const RECEIVE_LAZY_GALLERY_ITEMS = 'RECEIVE_LAZY_GALLERY_ITEMS'
export const STOP_LAZY_GALLERY_ITEMS = 'STOP_LAZY_GALLERY_ITEMS'

export const REQUEST_FULLSCREEN_GALLERY_ITEMS = 'REQUEST_FULLSCREEN_GALLERY_ITEMS'
export const RECEIVE_FULLSCREEN_GALLERY_ITEMS = 'RECEIVE_FULLSCREEN_GALLERY_ITEMS'

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
    return function (dispatch) {
        dispatch(requestLazyGalleryItems())

        return GalleryApi.getLazyGalleryItems(page)
            .then(ApiResponse => {
                console.log(ApiResponse)
                if(ApiResponse.length === 0) {
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

        return GalleryApi.getGallerySingleItem(gal_id)
            .then(ApiResponse => {
                console.log(ApiResponse)
                return dispatch(receiveFullscreenGalleryItems(ApiResponse))
            })
            .catch(error => {
                console.log(error)
                return dispatch(invalidateGalleryItems())
            })

    }
}