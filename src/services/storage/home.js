import db from '../storage/index'

export default class HomeStorage {
    static getBlogPreview() {
        return db.table('blog').limit(4).toArray().then(bitems => {
            return bitems
        })
    }
}