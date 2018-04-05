import db from '../boot/bootIndexeddb'

export default class BlogApi {
    static getLatestBlogList() {
        return fetch('https://www.business-cloud.de/wp-json/wp/v2/' + 'posts?per_page=4', {method: 'GET'})
        .then((response) => response.json())
        .then(responseJson => {
            return responseJson
        }).catch(error => {
            return error
        })

    }
    static getLazyBlogPreview(page) {
        return db.timestamp.get({id:1})
            .then(response => {
                const oldestDate = response.oldestDate

                return fetch('https://www.business-cloud.de/wp-json/wp/v2/' + 'posts?before=' + oldestDate + '&per_page=4&page=' + page, {method: 'GET'})
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

                return fetch('https://www.business-cloud.de/wp-json/wp/v2/' + 'posts?after=' + timestamp, {method: 'GET'})
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