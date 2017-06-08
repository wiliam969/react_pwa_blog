import axios from 'axios'

export default class PictureApi {

    static url =  process.env.REACT_APP_DEF_URL
    static suffix = process.env.REACT_APP_SUFFIX
    static api = process.env.REACT_APP_API
    static api_url = PictureApi.suffix + PictureApi.url + PictureApi.api

    constructor() {
        console.log(this.api_url)
    }


    /**
     * With this function we can check if a Post has a Attachment
     */
    static checkPicture(postid) {
        return axios.get(PictureApi.api_url + '/media?parent=' + postid)
            .then(response => {
                return response.data
            }).catch(error => {
                return error
            })
    }

    getThumbnailPicture(postid) {
        return this.ApiRequest(postid,'thumbnail')
    }

    getSmallPicture(postid) {
        return this.ApiRequest(postid,'medium')
    }

    getFullscreenPicture(postid) {
        return this.ApiRequest(postid,'full')
    }
    getLargePicture(postid) {
        return this.ApiRequest(postid,'medium_large')
    }

    getMediumPicture(postid) {
        return this.ApiRequest(postid,'large')
    }

    getAllPicture(postid) {
        return this.ApiRequest(postid,'all')
    }

    ApiRequest(postid = null,size = 'thumbnail') {
        if(postid != null) {
            var args_array = { 'parent' : postid }
        } else {
            var args_array = {}
        }

        let api_url = PictureApi.api_url

        axios.get(api_url + '/media?parent=' + postid)
            .then(data => {
                const picture = data.data
                this.setState({picture: data})
            })

        return this.preparePicture(size)
    }

    preparePicture(size = 'thumbnail') {

        var data = this.picture



        // var picture_obj = data['media_details']['sizes'][size]

        return data
    }

}