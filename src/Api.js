/**
 * calling the WorPress API
 * @constructor
 */
export default class WordPressApi {
    /**
     * getting post type items back from the WP Api
     * @param Posts post type
     * @param Args arguments of the API call
     * @param IsSingle if you only want to return one object you have to set this var to true (optional)
     * @param PostId if IsSingle is true you have to insert an ID (optional -> depends on IsSingle)
     * @returns {Promise<any>}
     */
    static getPosts(Posts = "Posts", Args = {}, IsSingle = false, PostId=0) {
        const ArgumentString = IsSingle === false ? this.GetArgumentString(Args) : "/" + PostId;
        const URL = process.env.REACT_APP_API_URI + Posts + ArgumentString
        console.log(URL)
        return fetch(URL)
            .then(response => response.json())
            .then(responseJson => {
                return responseJson
            })
    }

    /**
     * TODO: Iterate thorugh Args and determine if JSON or Array is the best solution
     * @param Args
     * @constructor
     */
    static GetArgumentString(Args) {

        let ArgumentString = "";
        for(let key in Args)
        {
            if(!ArgumentString)
            {
                ArgumentString += "?" + key + "=" + Args[key]
            }
            else
            {
                ArgumentString += "&" + key + "=" + Args[key]
            }
        }

        return ArgumentString
    }
}