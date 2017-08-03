import db from '../boot/bootIndexeddb'

export default class CategoryApi {
    static getCategoryItems(category) {
        console.log(category)

        return fetch(process.env.REACT_APP_API_URI + 'posts/?per_page=4&categories=' + category.id, {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
            .catch(error => {
                console.log(error)
                return error
            })
    }

    static getLazyCategoriesItems(category,id,page = 1) {
        console.log(category)
        console.log(page)

        return db.timestamp.get(1)
            .then(response => {
                console.log(response)

                const oldestDate = response.oldestDateCategory[category]

                return fetch(process.env.REACT_APP_API_URI + 'posts?before=' + oldestDate + '&categories=' + id + '&per_page=4&page=' + page)
                    .then(response => response.json())
                    .then(responseJson => {
                        console.log(responseJson)
                        return responseJson
                    })
                    .catch(error => {
                        console.log(error)
                        return error
                    })
            })



    }
}
