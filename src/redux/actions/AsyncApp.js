/**
 * Created by wiliam969 on 28.04.2017.
 */
export const IS_HOME = 'IS_HOME'
export const IS_GALLERY = 'IS_GALLERY'
export const IS_ABOUTME = 'IS_ABOUTME'
export const SCROLL_TOP = 'SCROLL_TOP'

export const isHome = () => {
    return {
        type: 'IS_HOME',
    }
}

export const isGallery = () => {
    return {
        type: 'IS_GALLERY',
    }
}

export const isAboutMe = () => {
    return {
        type:'IS_ABOUTME',
    }
}

export const scrollTop = (scroll) => {
    return {
        type:'SCROLL_TOP',
        scroll,
    }
}

export function fetchcorrectSite(blogs) {

    return function(dispatch) {

        return dispatch(isHome())
    }
}