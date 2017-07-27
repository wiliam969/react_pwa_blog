import db from '../storage/index'

export default class HomeApi {
    static getLatestBlogList() {
        return fetch(process.env.REACT_APP_API_URI + 'posts?per_page=4', {method: 'GET'})
        .then((response) => response.json())
        .then(responseJson => {
            console.log(responseJson)
            responseJson.map((post,index) => {
                db.blog.put({
                    id:post.id,
                    date:post.date,
                    date_gmt:post.date_gmt,
                    guid:post.guid,
                    modified:post.modified,
                    modified_gmt:post.modified_gmt,
                    slug:post.slug,
                    status:post.status,
                    type:post.type,
                    link:post.link,
                    title:post.title,
                    content:post.content,
                    excerpt:post.excerpt,
                    author:post.author,
                    featured_media:post.featured_media,
                    comment_status:post.comment_status,
                    ping_status:post.ping_status,
                    sticky:post.sticky,
                    template:post.template,
                    format:post.format,
                    meta:post.meta,
                    categories:post.categories,
                    tags:post.tags,
                    _links:post._links
                })
            })

            db.timestamp.put({
                date:Date.now()
            })
            return responseJson
        }).catch(error => {
            return error
        })

    }
    static getPageBlogPreview(page) {
        console.log(page)
        return fetch(process.env.REACT_APP_API_URI + 'posts?per_page=4&page=' + page, {method: 'GET'})
            .then((response) => {
            if(response.status == 400) {
                throw new Error("BOOM")
            }
                console.log(response)
                return response.json()
            })
            .then(responseJson => {
                console.log(responseJson)
                return responseJson
            })
    }

    static getAfterBlogPreview() {
        return db.timestamp.get({id: 1})
            .then(response => {
                let timestamp = response.date
                timestamp = new Date(timestamp)
                let latest = timestamp.toISOString()

                return fetch(process.env.REACT_APP_API_URI + 'posts?after=' + latest, {method: 'GET'})
                    .then((response) => response.json())
                    .then(responseJson => {
                        responseJson.map((post,index) => {
                            db.blog.put({
                                id:post.id,
                                date:post.date,
                                date_gmt:post.date_gmt,
                                guid:post.guid,
                                modified:post.modified,
                                modified_gmt:post.modified_gmt,
                                slug:post.slug,
                                status:post.status,
                                type:post.type,
                                link:post.link,
                                title:post.title,
                                content:post.content,
                                excerpt:post.excerpt,
                                author:post.author,
                                featured_media:post.featured_media,
                                comment_status:post.comment_status,
                                ping_status:post.ping_status,
                                sticky:post.sticky,
                                template:post.template,
                                format:post.format,
                                meta:post.meta,
                                categories:post.categories,
                                tags:post.tags,
                                _links:post._links
                            })
                        })

                        db.timestamp.update(1, {date: Date.now()}).then(()=>{
                            return true
                        }).catch(error => {
                            return error
                        })
                        console.log(responseJson)
                        return responseJson
                    })
                    .catch(error => {
                        return error
                    })
            }).catch(error => {
                return error
            })
    }
}