export default class ProjectsingleApi {

    /*
        Catches a specific project based on the slug of the item =)
     */
    static getProjectSingle(slug) {
        return fetch(process.env.REACT_APP_API_URI + 'projects/?slug=' + slug, {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                if(responseJson.length > 0) {
                    return responseJson
                } else {
                    return responseJson
                }
            })
            .catch(error => {
                return error
            })
    }

    static getLazyProjectSingle(date) {
        return fetch(process.env.REACT_APP_API_URI +'projects?before=' + date + '&per_page=1', {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                if(responseJson.length > 0) {
                    return responseJson[0]
                } else {
                    return responseJson
                }
            })
            .catch(error => {
                return error
            })
    }
}