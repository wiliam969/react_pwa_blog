import defaultPicture from './defaultPicture'

export default class PictureApi {
    static getPicture(id,postType = 'posts') {
        console.log(postType)
        console.log(id)
        return fetch(process.env.REACT_APP_API_URI + 'media?parent=' + id,{method:'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if(responseJson.length > 0) {
                    console.log(responseJson)
                    return responseJson[0]
                } else if (responseJson.length === 0) {
                    console.log(responseJson)
                    return fetch(process.env.REACT_APP_API_URI + postType + '/' + id, {method:'GET'})
                        .then(response => response.json())
                        .then(responseJson => {
                            if(responseJson.featured_media != 0) {
                                console.log(responseJson)
                                return fetch(process.env.REACT_APP_API_URI + 'media/' + responseJson.featured_media, {method:'GET'})
                                    .then(response => response.json())
                                    .then(responseJson => {
                                        console.log(responseJson)
                                        return responseJson
                                    })
                                    .catch(error => {
                                        console.log(error)
                                        return error
                                    })
                            } else {
                                return defaultPicture
                            }
                        })
                        .catch(error => {
                            return error
                        })
                } else {
                    return defaultPicture
                }
            }).catch(error => {
                return error
            })
    }
}