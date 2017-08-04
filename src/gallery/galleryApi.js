export default class GalleryApi {
    static getGalleryItems() {
        return fetch("http://localhost/wp_rest_api/wp-json/wp/v2/gallery?per_page=6", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
    }

    static getLazyGalleryItems(page) {
        return fetch("http://localhost/wp_rest_api/wp-json/wp/v2/gallery?per_page=6&page=2", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
    }
}