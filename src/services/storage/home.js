import db from '../storage/index'

export default class HomeStorage {
    static getBlogPreview() {
        return db.table('blog').limit(4).toArray().then(bitems => {
            return bitems
        })
    }

    static hasItems() {
        return db.table('blog').count()
            .then(response => {
                console.log(response)
                return response
            })
            .catch(error => {
                return error
            })
    }
 }