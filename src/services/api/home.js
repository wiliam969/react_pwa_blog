import db from '../../storage/index'
export default class HomeApi {
    static getBlogList() {
        return db.table('blog').toArray().then(bitems => {
            return bitems
        })

        .then(() => fetch(process.env.REACT_APP_API_URI + 'posts/', {method: 'GET'}))
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
        }).catch(error => {
            return error
        })

    }
}