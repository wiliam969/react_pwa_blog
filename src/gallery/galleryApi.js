export default class GalleryApi {
    static getGalleryItems() {
        return fetch(process.env.REACT_APP_API_URI + 'gallery?per_page=6', {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
    }

    static getLazyGalleryItems(page) {
        return fetch(process.env.REACT_APP_API_URI + 'gallery?per_page=6&page=2', {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
    }
}