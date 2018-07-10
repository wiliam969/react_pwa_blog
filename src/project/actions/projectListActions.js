/**
 * Created by wiliam969 on 28.04.2017.
 */
import ProjectListApi from '../api/projectListApi'
import ProjectStorage from '../projectStorage'

import {
    isFetchingData,
    stopFetchingData
} from '../../app/appActions'

export const REQUEST_PROJECT_LIST = 'REQUEST_PROJECT_PREVIEW'
export const REQUEST_LAZY_PROJECT_LIST = 'REQUEST_LAZY_PROJECT_LIST'
export const REQUEST_NEW_PROJECT_LIST = 'REQUEST_NEW_PROJECT_LIST'
export const RECEIVE_PROJECT_LIST = 'RECEIVE_PROJECT_LIST'
export const RECEIVE_LOCAL_PROJECT_LIST = 'RECEIVE_LOCAL_PROJECT_LIST'
export const RECEIVE_LAZY_PROJECT_LIST = 'RECEIVE_LAZY_PROJECT_LIST'
export const INVALIDATE_PROJECT_LIST = 'INVALIDATE_PROJECT_LIST'
export const STOP_LAZY_PROJECT_LIST = 'STOP_LAZY_PROJECT_LIST'
export const RECEIVE_NEW_PROJECT_LIST = 'RECEIVE_NEW_PROJECT_LIST'
export const STOP_NEW_PROJECT_LIST = 'STOP_NEW_PROJECT_LIST'


export const requestProjectPreview = (projects) => {
    return {
        type: 'REQUEST_PROJECT_LIST',
        projects
    }
}

export const requestLazyProjectPreview = () => {
    return {
        type:'REQUEST_LAZY_PROJECT_LIST',
    }
}

export const requestNewProjectPreview = () => {
    return {
        type:'REQUEST_NEW_PROJECT_LIST'
    }
}

export const receiveProjectpreview = (projects) => {
    return {
        type: 'RECEIVE_PROJECT_LIST',
        projects,
        receivedAt: Date.now(),
    }
}

export const receiveLazyProjectPreview = (projects) => {
    return {
        type:'RECEIVE_LAZY_PROJECT_LIST',
        projects,
    }
}

export const invalidateProjectPreview = (projects) => {
    return {
        type:'INVALIDATE_PROJECT_LIST',
        projects
    }
}

export const stopLazyProjectPreview = () => {
    return {
        type:'STOP_LAZY_PROJECT_LIST',
    }
}

export const receiveAfterProjectPreview = (projects) => {
    return {
        type:'RECEIVE_NEW_PROJECT_LIST',
        projects,
        receivedAt: Date.now()
    }
}

export const stopNewProjectPreview = () => {
    return {
        type:'STOP_NEW_PROJECT_LIST',
    }
}

// this is it lul it wörks haha didint expected this :D

export function fetchProjectPreviews(projects) {

    return function(dispatch) {

        dispatch(isFetchingData(projects))


    ProjectListApi.getLatestProjectList()
        .then((posts) => {
            dispatch(receiveProjectpreview(posts))

            dispatch(stopFetchingData())

            return ProjectStorage.createDefaultTimestamps(posts)
        })
        .catch(error => {
            return dispatch(invalidateProjectPreview(error))
        })
    }
}


export function fetchLazyProjectPreview(page) {
    console.log(page)
    return function (dispatch) {

        dispatch(requestLazyProjectPreview())


        ProjectListApi.getLazyProjectPreview(page)
            .then(ApiResponse => {
                if(typeof ApiResponse.data !== "undefined") {
                    return dispatch(stopLazyProjectPreview())

                } else if(ApiResponse.length === 0){
                    return dispatch(stopLazyProjectPreview())
                }

                return dispatch(receiveLazyProjectPreview(ApiResponse))
            })
            .catch(error => {
                dispatch(invalidateProjectPreview(error))
            })
    }
}

export function fetchNewProjectPreview() {
    return function (dispatch) {
        dispatch(requestNewProjectPreview())

        return ProjectListApi.getnewProjectPreviews()
            .then(apiResponse => {
                if(apiResponse.length === 0) {
                    return dispatch(stopNewProjectPreview())
                }

                dispatch(receiveAfterProjectPreview(apiResponse))

                return ProjectStorage.updateLatestTimestamp(apiResponse)
            })
            .catch(error => {
                return dispatch(invalidateProjectPreview(error))
            })
    }
}
