export default class GalleryApi {
    static getGalleryItems() {
        return fetch('https://backend.kerstin-witte.de/wp-json/wp/v2/' + 'gallery?per_page=6', {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
    }

    static getLazyGalleryItems(page) {
        return fetch('https://backend.kerstin-witte.de/wp-json/wp/v2/' + 'gallery?per_page=6&page=' + page, {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
    }


    /**
     * TODO: HERE WE HAVE TO seperate the media api so everything is separat
     * @param id
     * @returns {Promise.<TResult>}
     */
    static getGallerySingleItem(id) {
        console.log(id)
        return fetch('https://backend.kerstin-witte.de/wp-json/wp/v2/' + 'gallery/' + id, {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)

                return responseJson
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }
}