export default class API {
    api_url
    url
    suffix
    api

    constructor() {
        this.url =  process.env.REACT_APP_DEF_URL
        this.suffix = process.env.REACT_APP_SUFFIX
        this.api = process.env.REACT_APP_API
        this.api_url = this.suffix + this.url + this.api
    }

    /**
     * SO how does this work pretty simple i would say
     * @param arguments_array
     * @param api_type
     * @returns {string|*}
     */
    getAPIUrl(arguments_array = null,api_type = "posts") {

        const api_url = this.api_url

        if(api_type === "posts") {
            var api_reference = "posts"
        } else if (api_type === "media") {
            var api_reference = "media"
        } else if (api_type === "comments") {
            var api_reference = "comments"
        }

        if(arguments_array != null) {

            let arguments_string = "";

            for(var key in arguments_array) {
                if(key === "id") {
                    arguments_string += '/' + arguments_array[key]
                    continue;
                } else if (arguments_string.includes("?")){
                    arguments_string += "&" + key + "=" + arguments_array[key]
                } else {
                    arguments_string += "?" + key + "=" + arguments_array[key]
                }
            }

            let api_string = api_url + api_reference + arguments_string

            var api = api_string
        } else {
            let api_string = api_url + api_reference

            var api = api_string
        }

        return api
    }
}