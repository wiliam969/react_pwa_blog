import { REQUEST_SLIDER, RECEIVE_SLIDER, INVALIDATE_SLIDER } from './sliderActions'

function Slider(state= {
    isFetching: false,
    didInvalidate:false,
    items: {}}, action) {
    switch (action.type) {
        case INVALIDATE_SLIDER:
            return {
                didInvalidate: true,
                error: action.error,
            }
        case REQUEST_SLIDER:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate:false,
            })
        case RECEIVE_SLIDER:
            return {
                isFetching:false,
                didInvalidate:false,
                items: action.slider,
            }
        default:
            return state
    }
}

export default Slider