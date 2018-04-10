export default class PictureApi {
    static getPicture(id) {
        console.log(id)
        return fetch(process.env.REACT_APP_API_URI + 'media/' + id, {method:'GET'})
            .then(response => response.json())
            .then(responseJson => {
                return responseJson
            })
            .catch(error => {
                console.log(error)
                return error
        })
    }
}