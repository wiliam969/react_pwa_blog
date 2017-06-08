import { IS_HOME, IS_GALLERY, IS_ABOUTME,SCROLL_TOP } from '../actions/AsyncApp'

function AsyncApp(state = {isHome: false, isGallery: false, isAboutMe: false, scrollTop: ''}, action) {
    switch(action.type) {
        case IS_HOME:
            return Object.assign({}, state, {
                isHome: true
            })
        case IS_GALLERY:
            return Object.assign({}, state, {
                isGallery: true
            })
        case IS_ABOUTME:
            return Object.assign({}, state, {
                isAboutMe: true
            })
        case SCROLL_TOP:
            return Object.assign({}, state, {
                scrollTop: action.scroll
            })
        default:
            return state
    }
}

export default AsyncApp