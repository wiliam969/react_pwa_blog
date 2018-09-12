import Api from '../../Api'

export const REQUEST_SLIDER = 'REQUEST_SLIDER'
export const RECEIVE_SLIDER = 'RECEIVE_SLIDER'
export const INVALIDATE_SLIDER = 'INVALIDATE_SLIDER'

export const requestSlider = (slider) => {
    return {
        type: 'REQUEST_SLIDER',
        id: slider,
    }
}

export const receiveSlider = (slider) => {
    return {
        type: 'RECEIVE_SLIDER',
        slider:slider,
    }
}

export const invalidateSlider = (slider) => {
    return {
        type:'INVALIDATE_SLIDER',
        error:slider,
    }
}

export function fetchSlider (cat = 1) {
    return function (dispatch,cat) {
        dispatch(requestSlider(cat))

        return Api.getPosts("slider")
            .then(SliderResponse => {
                if(SliderResponse != null) {
                    dispatch(receiveSlider(SliderResponse))
                } else {
                    dispatch(invalidateSlider(SliderResponse))
                }
            })
    }
}