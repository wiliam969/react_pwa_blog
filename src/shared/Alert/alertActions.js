export const RECEIVE_ALERT = 'RECEIVE_ALERT'
export const CLOSE_ALERT = 'CLOSE_ALERT'
export const RECEIVE_SITE_STATUS = 'RECEIVE_SITE_STATUS'

export const receiveSiteStatus = (url,params) => {
    return {
        type: 'RECEIVE_SITE_STATUS',
        currentUrl: url,
        params:params,
    }
}

export const receiveAlert = (alertType,content) => {
    return {
        type: 'RECEIVE_ALERT',
        alertType: alertType,
        content: content,
    }
}

export const closeAlert = (index) => {
    return {
        type: 'CLOSE_ALERT',
        isActive:false,
        index:index,
    }
}

export function fetchAlert (alertType, content) {
    return function (dispatch) {
        return dispatch(receiveAlert(alertType, content))
    }
}

export function closSpecificAlert(index) {
    return function (dispatch) {
        return dispatch(closeAlert(index))
    }
}

export function modifySiteStatus(props, params) {
    return function (dispatch) {
        return dispatch(receiveSiteStatus(props,params))
    }
}