import db from './index'

export default class AppStorage {
    static saveCategories(categories) {
        return categories.map((post,index) => {
            db.categories.put({
                id:post.id,
                count:post.count,
                link:post.link,
                name:post.name,
                slug:post.slug,
                taxonomy:post.taxonomy,
                parent:post.parent,
                meta:post.meta,
                _links:post._links
            })
        })
    }

    static getCategories() {
        return db.categories.toArray()
            .then(response => {
                console.log(response)
                return response
            })
            .catch(error => {
                return error
            })
    }
}