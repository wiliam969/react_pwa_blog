export default class AppApi {
    static getCategories() {
        return fetch(process.env.REACT_APP_API_URI + 'categories/', {method: 'GET'})
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
            .catch(error => {
                return error
            })
    }
}