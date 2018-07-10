import db from '../boot/bootIndexeddb'

export default class ProjectStorage {
    static checksetup() {
        return db.timestamp.get('oldestDate')
            .then(check => {
                return check
            })
    }

    static getProjectPreview() {
        return db.project.orderBy('date').reverse().limit(3).toArray()
            .then(bitems => {
                return bitems
            })
            .catch(error => {
                return error
            })

    }

    /*
        Creating the Timestamps on startup =)
     */
    static createDefaultTimestamps(post) {
        const oldestDate = post[post.length-1].date

        const latestDate = post[0].date

        return db.timestamp.put({oldestDate:oldestDate,latestDate: latestDate, id:1})
    }

    static updateLatestTimestamp(post) {
        const latestDate = post[0].date

        return db.timestamp.update(1,{latestDate:latestDate})
    }
}



