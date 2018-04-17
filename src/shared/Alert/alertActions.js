export const RECEIVE_ALERT = 'RECEIVE_ALERT'


export const receiveAlert = (alertType,content) => {
    return {
        type: 'RECEIVE_ALERT',
        alertType: alertType,
        content: content,
    }
}

export function fetchAlert (alertType, content) {
    console.log(alertType)
    console.log(content)
    return function (dispatch) {

        return dispatch(receiveAlert(alertType, content))
    }
}