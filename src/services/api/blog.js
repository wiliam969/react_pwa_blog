import db from '../storage/index'
export default class BlogApi {

    static getBlogSingle(id) {
        const post_id = parseInt(id)
        return db.table('blog').get(post_id).then(bitem => {
            return bitem
        })
        .then(() => fetch(process.env.REACT_APP_API_URI + 'posts/' + post_id, {method: 'GET'}))
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