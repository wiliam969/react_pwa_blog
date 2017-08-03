import db from '../boot/bootIndexeddb'

export default class HomeStorage {
    static getBlogPreview() {
        return db.blog.orderBy('date').reverse().limit(4).toArray()
            .then(bitems => {
                return bitems
            })
            .catch(error => {
                return error
            })

    }
    static getLazyBlogPreview(page) {
        if(page === 1){
            page = 0

        }
        return db.table('timestamp').get(1)
            .then(lazyitems => {
                return db.table('blog').where('date').below(lazyitems.oldestDate).reverse().offset(page * 4).limit(4).toArray()
                    .then(bitems => {
                        return bitems
                    })
                    .catch(error => {
                        return error
                    })
            })
            .catch(error => {
                return error
            })
    }

    static updateOldestDate(date) {
        const oldestdate = date[3].date

        return db.timestamp.put({
            latestDate:Date.now(),
            oldestDate:oldestdate
        })
    }

    static updateLatestDate() {
        return db.timestamp.update(1, {latestDate: Date.now()}).then(()=>{
            return true
        }).catch(error => {
            return error
        })
    }

    static saveBlogPreviews(blogs) {
        return blogs.map((post,index) => {
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
    }
}