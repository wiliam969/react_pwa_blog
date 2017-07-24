import axios from 'axios'
import dexie from 'dexie'

export default class BlogApi {

    static url =  process.env.REACT_APP_DEF_URL
    static suffix = process.env.REACT_APP_SUFFIX
    static api = process.env.REACT_APP_API
    static api_url = BlogApi.suffix + BlogApi.url + BlogApi.api
    static db = BlogApi.db = new dexie(process.env.REACT_APP_IDB_NAME)

    constructor() {
        console.log(BlogApi.api_url)

    }

    static getBlogList() {
        BlogApi.db.bloglist.get({}, bl => {
            return bl
        }).then (
            fetch(BlogApi.api_url + 'posts/',{method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                console.log(responseJson)
                BlogApi.db.bloglist.put(responseJson)
                return responseJson
            }).catch(error => {
                return error
            })
        )
    }
}