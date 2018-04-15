import db from '../boot/bootIndexeddb'

export default class BlogStorage {
    static checksetup() {
        return db.timestamp.get('oldestDate')
            .then(check => {
                return check
            })
    }
    static getBlogPreview() {
        return db.blog.orderBy('date').reverse().limit(4).toArray()
            .then(bitems => {
                return bitems
            })
            .catch(error => {
                return error
            })

    }

    static updateOldestDate(date) {
        const oldestDate = date[3].date

        return db.timestamp.put({oldestDate:oldestDate, id: 1})
    }

    static updateLatestDate() {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
        return db.timestamp.put({latestDate: localISOTime, id: 1})
    }
}



