import { RECEIVE_ALERT,CLOSE_ALERT,RECEIVE_SITE_STATUS } from "./alertActions";

function Alert(state = {
    inc:0,
    items: [],
    site: {
        site_name_url: {
            isLoading:false,
            didInvalidate: false,
            isFetching: false,
            isFetchingLazy: false,
            isFetchingNew: false,
            stopLazyLoad: false,
            LazyPage: 0,
            NewPage: 0,
            receivedAt: null,
        }
    },}, action) {
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
        case RECEIVE_SITE_STATUS:
            let SiteStatusURLObject = modifySiteStatus(state,action);

            return state
        default:
            return state
    }
}




function closeAlert(post,action) {
    return Object.assign({}, post, {
        isActive: action.isActive
    })
}

function modifySiteStatus(post,action) {

    console.log(post)
    console.log(action.params)

    return Object.assign({}, post, {
    })
}

export default Alert