export default class BlogsingleApi {

    /*
        Catches a specific blog based on the slug of the item =)
     */
    static getBlogSingle(slug) {
        return fetch(process.env.REACT_APP_API_URI + 'posts/?slug=' + slug, {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                if(responseJson.length > 0) {
                    return responseJson[0]
                } else {
                    return responseJson
                }
            })
            .catch(error => {
                return error
            })
    }

    static getLazyBlogSingle(date) {
        console.log(date)
        return fetch(process.env.REACT_APP_API_URI +'posts?before=' + date + '&per_page=1', {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                if(responseJson.length > 0) {
                    return responseJson[0]
                } else {
                    return responseJson
                }
            })
            .catch(error => {
                return error
            })
    }
}