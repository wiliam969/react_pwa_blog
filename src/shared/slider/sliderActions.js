import SliderApi from './sliderApi'

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
    const category = cat

    return function (dispatch,category) {
        dispatch(requestSlider(category))

        return SliderApi.getSlider(category)
            .then(SliderResponse => {
                if(SliderResponse != null) {
                    dispatch(receiveSlider(SliderResponse))
                } else {
                    dispatch(invalidateSlider(SliderResponse))
                }
            })
    }
}