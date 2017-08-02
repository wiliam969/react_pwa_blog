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

export const receiveCATEGORY = () => {
    return {
        type:'RECEIVE_CATEGORY'
    }
}

export const invalidateCategory = () => {
    return {
        type:'INVALIDATE_CATEGORY'
    }
}

export const requestLazyCategory = () => {
    return {
        type:'REQUEST_LAZY_CATEGORY'
    }
}

export const receiveLazyCategory = () => {
    return {
        type:'RECEIVE_LAZY_CATEGORY'
    }
}

function fetchCategorieItems(category_name) {
    console.log(category_name)
    return function (dispatch) {
        dispatch(requestCategory(id))
    }
}