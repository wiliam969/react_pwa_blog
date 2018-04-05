export default class BlogsingleApi {

    static getBlogSingle(id) {
        return fetch(process.env.REACT_APP_API_URI + 'posts/' + id, {method: 'GET'})
            .then((response) => {
                return response.json()
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
                return responseJson[0]
            })
            .catch(error => {
                return error
            })
    }
}