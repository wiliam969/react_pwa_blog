import defaultPicture from './defaultPicture'

export default class PictureApi {
    static getPicture(id) {
        console.log(id)
        return fetch(process.env.REACT_APP_API_URI + 'media/' + id, {method:'GET'})
            .then(response => response.json())
            .then(responseJson => {

                if(responseJson.length > 0 ) {
                    return responseJson
                } else {
                    return defaultPicture
                }
            })
            .catch(error => {
                console.log(error)
                return error
        })
    }
}