/**
 * TODO: Refactor the current API to a single instance thus we only make API calls from here
 * calling the WorPress API
 * @constructor
 */
export default class WordPressApi {

    /**
     * getting post type items back from the WP Api
     * @param posts post type
     * @param args arguments of the API call
     * @returns {Promise<any>}
     */
    static getPosts(posts = "posts", args = {"order" : "asc"}) {
        const ArgumentString = this.GetArgumentString(args);
        return fetch(process.env.REACT_APP_API_URI + posts + "/" + ArgumentString)
            .then(response => response.json())
            .then(responseJson => {
                if(responseJson.length > 0)
                {
                    return responseJson[0]
                }
                else
                {
                    return responseJson
                }
            })
    }

    /**
     * TODO: Iterate thorugh Args and determine if JSON or Array is the best solution
     * @param args
     * @constructor
     */
    static GetArgumentString(args) {
        console.log(args)
        const ArgumentLength = Object.keys(args).length
        console.log(ArgumentLength)
        var i;
        for(i = 0; i < ArgumentLength; i++ )
        {
            console.log(args[i]);
        }
    }
}