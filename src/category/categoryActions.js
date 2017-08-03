import CategoryApi from './categoryApi'
import CategoryStorage from './categoryStorage'

export const REQUEST_CATEGORY = 'REQUEST_CATEGORY'
export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY'
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'

export const REQUEST_LAZY_CATEGORY = 'REQUEST_LAZY_CATEGORY'
export const RECEIVE_LAZY_CATEGORY = 'RECEIVE_LAZY_CATEGORY'

export const requestCategory = () => {
    return {
        type:'REQUEST_CATEGORY'
    }
}

export const receiveCategory = (items) => {
    return {
        type:'RECEIVE_CATEGORY',
        items
    }
}


export const invalidateCategory = () => {
    return {
        type:'INVALIDATE_CATEGORY'
    }
}

export const requestLazyCategory = (items) => {
    return {
        type:'REQUEST_LAZY_CATEGORY',
        items
    }
}

export const receiveLazyCategory = () => {
    return {
        type:'RECEIVE_LAZY_CATEGORY'
    }
}

/**
 * TODO: Here we dont track the difference of the Storage Items in the current state everytime the storage iteam is full, we just dispatch it.
 * TODO: But at first load this DOES NOT work cause the storage is not ready yet
 * @param category_name
 * @returns {Function}
 */
export function fetchCategoryItems(category_name) {
    const name = category_name.match.params.name

    return function(dispatch) {
        dispatch(requestCategory())
        return CategoryStorage.getCategories(name)
            .then(StorageItems => {
                if(StorageItems.length > 0) {
                    return dispatch(receiveCategory(StorageItems))
                }
                return CategoryApi.getCategoryItems(StorageItems)
                    .then(ApiResponse => {
                        CategoryStorage.updateOldestDate(ApiResponse,StorageItems)

                        return dispatch(receiveCategory(ApiResponse))
                    })
                    .catch(error => {
                        return error
                    })
            })
            .catch(error => {
                return error
            })

    }
}

export function fetchLazyCategoryItems(category_name) {
    console.log(category_name)
    const name = category_name.category.match.params.name
    const page = 1
    return function (dispatch) {
        return CategoryApi.getLazyCategoriesItems(name,33,page)
            .then(response => {
                console.log(response)
                return response
            })
            .catch(error => {
                console.log(error)
                return error
            })
        //
        // return CategoryStorage.getLazyCategories(name)
        //     .then(StorageItems => {
        //         if(StorageItems.length > 0) {
        //             return dispatch(receiveLazyCategory(StorageItems))
        //         }
        //
        //         return CategoryApi.getLazyCategoryItems(StorageItems)
        //             .then(ApiResponse => {
        //                 return dispatch(receiveLazyCategory(ApiResponse))
        //             })
        //             .catch(error => {
        //                 return dispatch(invalidateCategory())
        //             })
        //     })
        //     .catch(error => {
        //         return dispatch(invalidateCategory())
        //     })
    }
}