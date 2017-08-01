import defaultPicture from './defaultPicture'

export default class PictureApi {
    static getPicture(blogid) {
        return fetch(process.env.REACT_APP_API_URI + 'media?parent=' + blogid,{method:'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                if(responseJson.length > 0) {
                    return responseJson[0]
                } else {
                    return defaultPicture
                }
            }).catch(error => {
                return error
            })
    }
}