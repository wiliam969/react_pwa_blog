import db from './index'

export default class CategoryStorage {
    static getCategories(name) {
        return db.categories.get({ slug:name }).then(categorie => {
            console.log(categorie)
            return db.blog.where({categories:[categorie.id]}).reverse().limit(4).sortBy('date').then(response => {
                if(response.length > 0){
                    return response
                } else {
                    return categorie
                }
            })
        })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
    }
}