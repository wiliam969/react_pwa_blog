export default class SliderApi {
    static getSlider(cat) {
        return fetch(process.env.REACT_APP_API_URI + 'slider', {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            }).catch(error => {
                return error
            })
    }
}