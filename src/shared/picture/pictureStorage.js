import db from '../../boot/bootIndexeddb'

export default class BlogStorage {
    static getPicture(blog_id) {
        const id = parseInt(blog_id)

        return db.table('picture').get(id)
            .then(picture => {
                return picture
            })
            .catch(error => {
                return error
            })
    }

    static savePicture(post,blogid) {
        return db.picture.put({
            id:blogid,
            post:post
        })
    }
}