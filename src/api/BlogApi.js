import axios from 'axios'
import PictureApi from './PictureApi'

export default class BlogApi {

    static url =  process.env.REACT_APP_DEF_URL
    static suffix = process.env.REACT_APP_SUFFIX
    static api = process.env.REACT_APP_API
    static api_url = BlogApi.suffix + BlogApi.url + BlogApi.api

    constructor() {
        console.log(this.api_url)
    }

    static getBlogList() {
        console.log(process.env)
        const api = BlogApi.api_url

        return axios.get(api + 'posts')
    }

    getSingleBlog(id) {
        console.log(id)
        const api = BlogApi.api_url

        return axios.get(api + 'posts/' + id)
    }

    static getBlogAttachments(id) {
        let checkpic = PictureApi.checkPicture(id)

        if(!checkpic) {
            let thumbnail
            let small
            let fullscreen
            let large
            let medium
        }

        return false
    }
}