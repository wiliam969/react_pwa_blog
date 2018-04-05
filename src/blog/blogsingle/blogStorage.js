import db from '../../boot/bootIndexeddb'

export default class BlogStorage {
    static getBlogSingle(id) {
        const post_id = parseInt(id)
        return db.table('blog').get(post_id)
            .then(items => {
                return items
            })
            .catch(error => {
                return error
            })
    }
    static saveBlogSingle(post) {
        return db.blog.put({
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
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
    }
}