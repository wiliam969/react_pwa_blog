/**
 * Created by wiliam969 on 28.04.2017.
 */
export const IS_LOADING = 'IS_LOADING'

export const isLoading = () => {
    return {
        type: 'IS_LOADING'
    }
}

export function FetchingData() {
    return function(dispatch) {
        return dispatch(isLoading())
    }
}