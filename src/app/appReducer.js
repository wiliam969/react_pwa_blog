import { IS_LOADING, STOP_LOADING, FETCH_CATEGORY} from './appActions'

function AsyncApp(state = {isLoading:false, categories: {}}, action) {
    switch(action.type) {
        case IS_LOADING:
            return Object.assign({}, state, {
                isLoading:true,
            })
        case STOP_LOADING:
            return Object.assign({}, state, {
                isLoading: false,
            })
        case FETCH_CATEGORY:
            return Object.assign({}, state, {
                categories: action.categories,
            })
        default:
            return state
    }
}

export default AsyncApp