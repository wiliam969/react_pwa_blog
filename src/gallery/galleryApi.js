export default class GalleryApi {
    static getGalleryItems() {
        return fetch(process.env.REACT_APP_API_URI + 'gallery?per_page=6', {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                return responseJson
            })
    }

    static getLazyGalleryItems(page) {
        return fetch(process.env.REACT_APP_API_URI + 'gallery?per_page=6&page=' + page, {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                return responseJson
            })
    }


    /**
     * TODO: HERE WE HAVE TO seperate the media api so everything is separat
     * @param id
     * @returns {Promise.<TResult>}
     */
    static getGallerySingleItem(slug) {
        return fetch(process.env.REACT_APP_API_URI + 'gallery/?slug=' + slug, {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                return responseJson[0]
            })
            .catch(error => {
                return error
            })
    }

    static getGalleryNextPrevItem(type,date) {
        const order = type === "after" ? "asc" : "desc"
        return fetch(process.env.REACT_APP_API_URI + 'gallery/?' + type + '=' + date + '&per_page=1&page=1&order=' + order, {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                return responseJson[0]
            })
            .catch(error => {
                return error
            })

    }

    static getGalleryFullscreenItems(id) {
        return fetch(process.env.REACT_APP_API_URI + 'gallery/')
    }
}