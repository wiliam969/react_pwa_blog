import db from '../../boot/bootIndexeddb'

export default class ProjectListApi {
    static getLatestProjectList() {
        return fetch(process.env.REACT_APP_API_URI + 'projects?per_page=3', {method: 'GET'})
        .then((response) => response.json())
        .then(responseJson => {
            return responseJson
        }).catch(error => {
            return error
        })

    }
    static getLazyProjectPreview(page) {
        return db.timestamp.get({id:1})
            .then(response => {
                const oldestDate = response.oldestDate

                return fetch(process.env.REACT_APP_API_URI + 'projects?before=' + oldestDate + '&per_page=3&page=' + page, {method: 'GET'})
                    .then((response) => response.json())
                    .then(responseJson => {
                        return responseJson
                    })
            })
    }

    static getnewProjectPreviews() {
        return db.timestamp.get({id: 1})
            .then(response => {
                let timestamp = response.latestDate
                return fetch(process.env.REACT_APP_API_URI + 'projects?after=' + timestamp, {method: 'GET'})
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