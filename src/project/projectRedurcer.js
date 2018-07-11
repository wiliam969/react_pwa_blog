import {
    REQUEST_PROJECT_LIST,
    REQUEST_LAZY_PROJECT_LIST,
    REQUEST_NEW_PROJECT_LIST,
    INVALIDATE_PROJECT_LIST,
    RECEIVE_PROJECT_LIST,
    RECEIVE_LAZY_PROJECT_LIST,
    RECEIVE_NEW_PROJECT_LIST,
    STOP_LAZY_PROJECT_LIST,
    STOP_NEW_PROJECT_LIST,
} from './actions/projectListActions'

import {
    REQUEST_PROJECT_SINGLE,
    REQUEST_LAZY_PROJECT_SINGLE,
    RECEIVE_PROJECT_SINGLE,
    RECEIVE_LAZY_PROJECT_SINGLE,
    INVALIDATE_PROJECT_SINGLE,
    STOP_LAZY_PROJECT_SINGLE,
} from './actions/projectSingleActions'


function Project(
    state = {
        isFetching: false,
        isFetchingLazy: false,
        isFetchingNew: false,
        didInvalidate: false,
        stopLazyLoad:true,
        projectsbySlug: {},
        projectsListSlugs: [],
        projectsSingleSlugs: [],
        receivedAt: "",
        LazyPage:1,
        NewPage:1,
    }, action) {
    switch(action.type) {
        case REQUEST_PROJECT_SINGLE:
        case REQUEST_PROJECT_LIST:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case REQUEST_LAZY_PROJECT_SINGLE:
        case REQUEST_LAZY_PROJECT_LIST:
            return Object.assign({}, state, {
                isFetchingLazy: true,
            })
        case REQUEST_NEW_PROJECT_LIST:
            return Object.assign({}, state, {
                isFetchingNew: true
            })
        case RECEIVE_PROJECT_SINGLE:
            let singleprojectsbySlug = prepareprojectsbySlugs(state,action)
            let singleListIds = prepareProjectsSingleOrder(state,action)

            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                projectsbySlug: singleprojectsbySlug,
                projectsSingleSlugs:singleListIds,
            })
        case RECEIVE_PROJECT_LIST:
            const projectsbySlug = prepareprojectsbySlugs(state,action)
            console.log(projectsbySlug)

            // let projectsbySlug = prepareprojectsbySlugs(state,action)
            let projectsListSlugs = prepareProjectsListOrder(state,action)

            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                projectsbySlug: projectsbySlug,
                projectsListSlugs: projectsListSlugs,
            })
        case RECEIVE_LAZY_PROJECT_SINGLE:
            let lazysingleprojectsbySlug = prepareprojectsbySlugs(state,action)
            let lazysingleListIds = prepareProjectsSingleOrder(state,action)

            return Object.assign({}, state, {
                isFetchingLazy:false,
                projectsbySlug: lazysingleprojectsbySlug,
                projectsSingleSlugs:lazysingleListIds,
            })
        case RECEIVE_LAZY_PROJECT_LIST:
            let lazyprojectsbySlug = prepareprojectsbySlugs(state,action)
            let lazyprojectsListSlugs = prepareProjectsListOrder(state,action)
            return Object.assign({}, state,{
                LazyPage: state.LazyPage +1,
                isFetchingLazy:false,
                projectsbySlug: lazyprojectsbySlug,
                projectsListSlugs:lazyprojectsListSlugs,
            })

        case RECEIVE_NEW_PROJECT_LIST:
            let newprojectsbySlug = prepareprojectsbySlugs(state,action)
            let newprojectsListSlugs = prepareNewProjectsLists(state,action)
            return Object.assign({}, state,{
                NewPage: state.NewPage +1,
                isFetchingNew:false,
                projectsbySlug: newprojectsbySlug,
                projectsListSlugs:newprojectsListSlugs,

            })
        case STOP_LAZY_PROJECT_SINGLE:
        case STOP_LAZY_PROJECT_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidateLazy: false,
                isFetchingLazy:false,
                stopLazyLoad:false,
            })
        case STOP_NEW_PROJECT_LIST:
            return Object.assign({}, state, {
                isFetchingNew: false,
            })
        case INVALIDATE_PROJECT_SINGLE:
        case INVALIDATE_PROJECT_LIST:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        default:
            return state
    }
}

/**
 * @param post
 * @param action
 * @returns {{}|projectsbySlug}
 */
function prepareprojectsbySlugs(post,action) {

    console.log(action)
    let ProjectObj = post.projectsbySlug

    const defaultProject = action.projects.map(function (action) {

        let objProjects = action.slug

        objProjects = Object.create(action)

        objProjects.date                =   action.date
        objProjects.slug                =   action.slug
        objProjects.title               =   action.title.rendered
        objProjects.content             =   action.content.rendered
        objProjects.featured_media_id   =   action.featured_media
        objProjects.meta_data           =   action.meta_data

        ProjectObj[action.slug] = Object.assign(objProjects)

        return action
    })

    return ProjectObj
}

function prepareProjectsListOrder(post,action) {
    let ProjectsIds = post.projectsListSlugs

    action.projects.forEach(function(post) {
        let temp_id = post.slug

        const checkifExists = ProjectsIds.some(x => x === temp_id)

        !checkifExists ? ProjectsIds.push(temp_id) : ""
    })

    return ProjectsIds
}

function prepareProjectsSingleOrder(post,action) {

    console.log(action)
    // Use this if you want an appending projectsingle structure so that you have multiple projectposts =)
    // let ProjectsIds = post.projectsSingleSlugs

    let ProjectsIds = []

    action.projects.forEach(function(post) {
        let temp_id = post.slug

        const checkifExists = ProjectsIds.some(x => x === temp_id)

        !checkifExists ? ProjectsIds.push(temp_id) : ""
    })

    return ProjectsIds
}

function prepareNewProjectsLists(post,action) {
    let ProjectsIds = post.projectsListSlugs

    action.projects.forEach(function (post) {
        let temp_id = post.slug

        ProjectsIds.unshift(temp_id)
    })

    return ProjectsIds
}

export default Project