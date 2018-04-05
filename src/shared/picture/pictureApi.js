import defaultPicture from './defaultPicture'

export default class PictureApi {
    static getPicture(id,postType = 'posts') {
        console.log(postType)
        console.log(id)
        return fetch('http://localhost:88/wp-json/wp/v2/' + 'media?parent=' + id,{method:'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if(responseJson.length > 0) {
                    console.log(responseJson)
                    return responseJson[0]
                } else if (responseJson.length === 0) {
                    console.log(responseJson)
                    return fetch('http://localhost:88/wp-json/wp/v2/' + postType + '/' + id, {method:'GET'})
                        .then(response => response.json())
                        .then(responseJson => {
                            if(responseJson.featured_media != 0) {
                                console.log(responseJson)
                                return fetch('http://localhost:88/wp-json/wp/v2/' + 'media/' + responseJson.featured_media, {method:'GET'})
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