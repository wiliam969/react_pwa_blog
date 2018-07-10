/**
 * Created by wiliam969 on 28.04.2017.
 */

import ProjectsingleApi from '../api/projectsingleApi'

export const REQUEST_PROJECT_SINGLE = 'REQUEST_PROJECT_SINGLE'
export const REQUEST_LAZY_PROJECT_SINGLE = 'REQUEST_LAZY_PROJECT_SINGLE'
export const RECEIVE_PROJECT_SINGLE = 'RECEIVE_PROJECT_SINGLE'
export const RECEIVE_LAZY_PROJECT_SINGLE = 'RECEIVE_LAZY_PROJECT_SINGLE'
export const INVALIDATE_PROJECT_SINGLE = 'INVALIDATE_PROJECT_SINGLE'
export const STOP_LAZY_PROJECT_SINGLE = 'STOP_LAZY_PROJECT_SINGLE'

export const requestProjectSingle = (id) => {
    return {
        type: 'REQUEST_PROJECT_SINGLE',
        id
    }
}

export const requestLazyProjectSingle = (id) => {
    return {
        type: 'REQUEST_LAZY_PROJECT_SINGLE',
        prev_id:id
    }
}

export const receiveProjectSingle = (project,id) => {
    return {
        type: 'RECEIVE_PROJECT_SINGLE',
        projects:project,
        id,
        receivedAt: Date.now(),
    }
}

export const receiveLazyProjectSingle = (project,id) => {
    return {
        type:'RECEIVE_LAZY_PROJECT_SINGLE',
        projects:project,
        id,
        receivedAt: Date.now(),
    }
}

export const invalidateProjectSingle = (project,id) => {
    return {
        type:'INVALIDATE_PROJECT_SINGLE',
        id
    }
}

export const stopLazyProjectSingle = (id,index) => {
    return {
        type: 'STOP_LAZY_PROJECT_SINGLE',
        prev_id:id,
        index,
    }
}

/*
    Gets the Slug of the URI and returns it to the specific handlers after that it returns an object if the slug was correct
 */
export function fetchProjectSingle(project = 1) {
    console.log(project)
    const slug = project.match.params.slug

    return function (dispatch) {
        dispatch(requestProjectSingle(slug))

        return ProjectsingleApi.getProjectSingle(slug)
            .then(ApiResponse => {
                console.log(ApiResponse)
                return dispatch(receiveProjectSingle(ApiResponse,slug))
            }).catch(error => {
                return dispatch(invalidateProjectSingle(error,slug))
            })
    }

}



export function fetchLazyProject(date,ids,indexes) {
    const datum = date
    const id = ids
    const index = indexes
    return function (dispatch) {
        dispatch(requestLazyProjectSingle(id))
        return ProjectsingleApi.getLazyProjectSingle(datum)
            .then(post => {
                if(typeof post === 'undefined' && post === null) {
                    return dispatch(stopLazyProjectSingle(id,index))
                }
                return dispatch(receiveLazyProjectSingle(post,post.id,id))
            })
            .catch(error => {
                return dispatch(invalidateProjectSingle(error))
            })
    }
}
