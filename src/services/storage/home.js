import db from '../storage/index'

export default class HomeStorage {
    static getBlogPreview() {
        return db.table('blog').reverse().limit(4).toArray().then(bitems => {
            return bitems
        })
    }
}