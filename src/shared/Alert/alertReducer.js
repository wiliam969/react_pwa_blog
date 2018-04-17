import { RECEIVE_ALERT,CLOSE_ALERT } from "./alertActions";

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
                    isActive:true,
                }),
            }
        case CLOSE_ALERT:
            return state
        default:
            return state
    }
}




function closeAlert(post,action) {
    console.log(post)

    return Object.assign({}, post, {
        isActive: action.isActive
    })
}

export default Alert