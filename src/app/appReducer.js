import { IS_LOADING, STOP_LOADING} from './appActions'

/**
 * Reducer for the currently only one global var
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function AsyncApp(state = {isLoading:false,}, action) {
    switch(action.type) {
        case IS_LOADING:
            return Object.assign({}, state, {
                isLoading:true,
            })
        case STOP_LOADING:
            return Object.assign({}, state, {
                isLoading: false,
            })
        default:
            return state
    }
}

export default AsyncApp