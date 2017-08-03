import db from '../boot/bootIndexeddb'

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

    static updateOldestDate(date,category) {
        console.log("do we even get here?!")
        var keys = Object.keys(date)
        var last = keys[keys.length-1]

        const oldestDate = date[last].date
        const cat_slug = category.slug

        return db.timestamp.get(1)
            .then(response => {
                if(typeof response.oldestDateCategory === 'undefined') {
                    console.log("im here ")
                    return db.timestamp.update(1,{
                        oldestDateCategory: { [cat_slug] : oldestDate}
                    })
                        .then(response => {
                            return response
                        })
                        .catch(error => {
                            return error
                        })
                }
                else if(Object.keys(response.oldestDateCategory).length > 0) {
                    console.log("or here ")
                    let newCat = response.oldestDateCategory
                    newCat[cat_slug] = oldestDate
                    return db.timestamp.update(1,{
                        oldestDateCategory: newCat
                    })
                    .then(response => {
                        return response
                    })
                    .catch(error => {
                    })
                }
            })
    }

}

