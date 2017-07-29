import db from './index'

export default class BlogStorage {
    static getBlogSingle(id) {
        const post_id = parseInt(id)
        return db.table('blog').get(post_id)
            .then(items => {
                console.log(items)
                return items
            })
            .catch(error => {
                return error
            })
    }
}