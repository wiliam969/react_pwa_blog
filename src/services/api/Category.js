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
}