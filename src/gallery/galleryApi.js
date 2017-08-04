export default class GalleryApi {
    static getGalleryItems() {
        return fetch("http://localhost/wp_rest_api/wp-json/wp/v2/gallery", {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
    }
}