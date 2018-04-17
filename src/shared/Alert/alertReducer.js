import { RECEIVE_ALERT } from "./alertActions";

function Alert(state = {
    inc:0,
    items: []}, action) {
    switch(action.type) {
        case RECEIVE_ALERT:
            return {
                ...state,
                items: state.items.concat({
                    alertType: action.alertType,
                    content: action.content,
                }),
            }
        default:
            return state
    }
}

function receiveAlert(post,action) {
    return Object.assign({}, post, {
        alertType: action.alertType,
        content: action.contze
    })
}

export default Alert