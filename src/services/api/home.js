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

            const oldestdate = responseJson[3].date

            db.timestamp.put({
                latestDate:Date.now(),
                oldestDate:oldestdate
            })
            return responseJson
        }).catch(error => {
            return error
        })

    }
    static getLazyBlogPreview(page) {
        console.log(page)
        return db.timestamp.get({id:1})
            .then(response => {
                const oldestDate = response.oldestDate

                return fetch(process.env.REACT_APP_API_URI + 'posts?before=' + oldestDate + '&per_page=4&page=' + page, {method: 'GET'})
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
                        return responseJson
                    })
            })
    }

    static getAfterBlogPreview() {
        return db.timestamp.get({id: 1})
            .then(response => {
                let timestamp = response.latestDate
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

                        db.timestamp.update(1, {latestDate: Date.now()}).then(()=>{
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