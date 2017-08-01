import db from '../storage/index'

export default class CommentsApi {
    static getComments(id,page) {
        return fetch(process.env.REACT_APP_API_URI + 'comments?post=' + id + '&per_page=10&page=' + page, {method: 'GET'})
        .then((response) => response.json())
        .then(responseJson => {
            return responseJson
        }).catch(error => {
            return error
        })
    }

    static sendComment(comments_data) {
        return fetch(process.env.REACT_APP_API_URI + 'comments', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: {
                author_name: comments_data.commentname,
                post: 1,
                content: comments_data.commentpost,
                author_url:comments_data.commentwebsite,
                author_email:comments_data.commentemail,
            }
        })
            .then(response => {
                return response.json()
            }).catch(error => {
                return error
            })
    }
}