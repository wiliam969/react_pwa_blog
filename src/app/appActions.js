/**
 * Created by wiliam969 on 28.04.2017.
 */
import AppApi from './appApi'
import AppStorage from './appStorage'

export const IS_LOADING = 'IS_LOADING'
export const STOP_LOADING = 'STOP_LOADING'
export const FETCH_CATEGORY = 'FETCH_CATEGORY'

export const isLoading = () => {
    return {
        type: 'IS_LOADING'
    }
}

export const stopLoading = () => {
    return {
        type: 'STOP_LOADING'
    }
}

export const fetchCategory = (categories) => {
    return {
        type: 'FETCH_CATEGORY',
        categories
    }
}

export function isFetchingData() {
    return function(dispatch) {
        return dispatch(isLoading())
    }
}

export function stopFetchingData() {
    return function(dispatch) {
        return dispatch(stopLoading())
    }
}

export function getCategories() {
    return function (dispatch) {
        return AppStorage.getCategories().then(StorageItems => {
            if(StorageItems.length > 0 ) {
                return dispatch(fetchCategory(StorageItems))
            } else {
                return AppApi.getCategories()
                    .then(ApiResponse => {

                        if(ApiResponse.length > 0) {
                            return AppStorage.saveCategories(ApiResponse)
                                .then(save => {
                                    return dispatch(fetchCategory(ApiResponse))
                                })
                        }
                    })
                    .catch(error => {
                        return error
                    })
            }
        })
        .catch(error => {
            return error
        })

    }
}