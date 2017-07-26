import db from '../storage/index'

export default class HomeStorage {
    static getBlogPreview() {
        return db.table('blog').toArray().then(bitems => {
            return bitems
        })
    }
 }