import db from '../storage/index'

export default class HomeStorage {
    static getBlogPreview() {
        return db.table('blog').reverse().limit(4).toArray()
            .then(bitems => {
                return bitems
            })
            .catch(error => {
                return error
            })
    }
    static getLazyBlogPreview() {
        return db.table('timestamp').get(1)
            .then(lazyitems => {
                console.log(lazyitems)
                return db.table('blog').where('date').below(lazyitems.oldestDate).limit(4).toArray()
                    .then(bitems => {
                        console.log(bitems)
                        console.log(bitems)
                        return bitems
                    })
                    .catch(error => {
                        return error
                    })
            })
            .catch(error => {
                return error
            })
    }
}