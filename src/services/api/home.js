import db from '../storage/index'

export default class HomeApi {
    static getLatestBlogList() {
        return fetch(process.env.REACT_APP_API_URI + 'posts?per_page=4', {method: 'GET'})
        .then((response) => response.json())
        .then(responseJson => {
            return responseJson
        }).catch(error => {
            return error
        })

    }
    static getLazyBlogPreview(page) {
        console.log(page)
        return db.timestamp.get({id:1})
            .then(response => {
                const oldestDate = response.oldestDate

                return fetch(process.env.REACT_APP_API_URI + 'posts?before=' + oldestDate + '&per_page=4&page=' + page, {method: 'GET'})
                    .then((response) => response.json())
                    .then(responseJson => {
                        return responseJson
                    })
            })
    }

    static getnewBlogPreviews() {
        return db.timestamp.get({id: 1})
            .then(response => {
                let timestamp = response.latestDate
                timestamp = new Date(timestamp)
                let latest = timestamp.toISOString()

                return fetch(process.env.REACT_APP_API_URI + 'posts?after=' + latest, {method: 'GET'})
                    .then((response) => response.json())
                    .then(responseJson => {
                        return responseJson
                    })
                    .catch(error => {
                        return error
                    })
            }).catch(error => {
                return error
            })
    }
}