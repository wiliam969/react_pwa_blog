import db from '../storage/index'

export default class CommentsApi {
    static getComments(id) {
        const post_id = parseInt(id)
        console.log("why we still here just to suffer?")
        return db.table('comment').where({post: post_id}).toArray().then((bitem) => {
            console.log("the conrats have lost..")
            console.log(bitem)
            return bitem
        })
            .then(() => fetch(process.env.REACT_APP_API_URI + 'comments?post=' + post_id, {method: 'GET'}))
            .then((response) => response.json())
            .then(responseJson => {
                responseJson.map((post,index) => {
                    db.comment.put({
                        id:post.id,
                        post:post.post,
                        parent:post.parent,
                        author:post.author,
                        author_name:post.author_name,
                        author_url:post.author_url,
                        date:post.date,
                        date_gmt:post.date_gmt,
                        content:post.content,
                        link:post.link,
                        status:post.status,
                        type:post.type,
                        author_avatar_urls:post.author_avatar_urls,
                        meta:post.meta,
                        _links:post._links
                    })
                })
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