export default class BlogApi {

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
        return fetch(process.env.REACT_APP_API_URI +'posts?before=' + date + '&per_page=1', {method: 'GET'})
            .then((response) => {
                return response.json()
            })
            .catch(error => {
                return error
            })
    }
}