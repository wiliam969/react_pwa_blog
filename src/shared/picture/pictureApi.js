import defaultPicture from './defaultPicture'

export default class PictureApi {
    static getPicture(id,postType = 'posts') {
        return fetch('https://www.business-cloud.de/wp-json/wp/v2/' + 'media?parent=' + id,{method:'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if(responseJson.length > 0) {
                    return responseJson[0]
                } else if (responseJson.length === 0) {
                    return fetch('https://www.business-cloud.de/wp-json/wp/v2/' + postType + '/' + id, {method:'GET'})
                        .then(response => response.json())
                        .then(responseJson => {
                            if(responseJson.featured_media != 0) {
                                return fetch('https://www.business-cloud.de/wp-json/wp/v2/' + 'media/' + responseJson.featured_media, {method:'GET'})
                                    .then(response => response.json())
                                    .then(responseJson => {
                                        return responseJson
                                    })
                                    .catch(error => {
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