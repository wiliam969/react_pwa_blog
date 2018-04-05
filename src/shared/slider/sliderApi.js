export default class SliderApi {
    static getSlider(cat) {
        return fetch('http://localhost:88/wp-json/wp/v2/slider', {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            }).catch(error => {
                return error
            })
    }
}