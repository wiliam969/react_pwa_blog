export default class PictureApi {

    static getPicture(blogid) {
        return fetch(process.env.REACT_APP_API_URI + 'media?parent=' + blogid,{method:'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                return responseJson[0]
            }).catch(error => {
                return error
            })
    }
}