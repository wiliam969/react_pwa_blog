import { IS_LOADING} from '../actions/App'

function AsyncApp(state = {isLoading:true}, action) {
    switch(action.type) {
        case IS_LOADING:
            return Object.assign({}, state, {
                isLoading:false,
            })
        default:
            return state
    }
}

export default AsyncApp