export default class QuotationsApi {
    static getQuotations() {
        return fetch(process.env.REACT_APP_API_URI + 'quotations', { method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                return responseJson
            })
            .catch(error => {
                return error
            })
    }
}