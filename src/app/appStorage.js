import db from '../boot/bootIndexeddb'

export default class AppStorage {
    static saveCategories(categories) {
        return categories.map((post) => {
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
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
    }

    static getCategories() {
        return db.categories.toArray()
            .then(response => {
                return response
            })
            .catch(error => {
                return error
            })
    }
}