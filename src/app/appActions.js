export const IS_LOADING = 'IS_LOADING'
export const STOP_LOADING = 'STOP_LOADING'

/**
 * Used as a Global Loading constant
 * @returns {{type: string}}
 */
export const isLoading = () => {
    return {
        type: 'IS_LOADING'
    }
}

/**
 * Used as a Global Loading constant
 * @returns {{type: string}}
 */
export const stopLoading = () => {
    return {
        type: 'STOP_LOADING'
    }
}

/**
 * Used as a Global Fetching constant
 * @returns {{type: string}}
 */
export function isFetchingData() {
    return function(dispatch) {
        return dispatch(isLoading())
    }
}

/**
 * Used as a Global Fetching constant
 * @returns {{type: string}}
 */
export function stopFetchingData() {
    return function(dispatch) {
        return dispatch(stopLoading())
    }
}