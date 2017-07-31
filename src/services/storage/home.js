import db from '../storage/index'

export default class HomeStorage {
    static getBlogPreview() {
        return db.table('blog').reverse().limit(4).sortBy('date')
            .then(bitems => {
                return bitems
            })
            .catch(error => {
                return error
            })

    }
    static getLazyBlogPreview(page) {
        return db.table('timestamp').get(1)
            .then(lazyitems => {
                return db.table('blog').where('date').below(lazyitems.oldestDate).offset(page * 4).limit(4).toArray()
                    .then(bitems => {
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