import {
    REQUEST_BLOG_LIST,
    REQUEST_LAZY_BLOG_LIST,
    REQUEST_NEW_BLOG_LIST,
    INVALIDATE_BLOG_LIST,
    RECEIVE_BLOG_LIST,
    RECEIVE_LAZY_BLOG_LIST,
    RECEIVE_NEW_BLOG_LIST,
    STOP_LAZY_BLOG_LIST,
    STOP_NEW_BLOG_LIST,
} from './actions/blogListActions'

import {
    REQUEST_BLOG_SINGLE,
    REQUEST_LAZY_BLOG_SINGLE,
    RECEIVE_BLOG_SINGLE,
    RECEIVE_LAZY_BLOG_SINGLE,
    INVALIDATE_BLOG_SINGLE,
    STOP_LAZY_BLOG_SINGLE,
} from './actions/blogSingleActions'

import {getCurrentItemType} from './ItemTypeData'


function Blog(
    state = {
        isFetching: false,
        isFetchingLazy: false,
        isFetchingNew: false,
        didInvalidate: false,
        stopLazyLoad:true,
        blogsbySlug: {},
        blogsListSlugs: {},
        blogsSingleSlugs: [],
        receivedAt: "",
        LazyPage:1,
        NewPage:1,
    }, action) {
    switch(action.type) {
        case REQUEST_BLOG_SINGLE:
        case REQUEST_BLOG_LIST:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case REQUEST_LAZY_BLOG_SINGLE:
        case REQUEST_LAZY_BLOG_LIST:
            return Object.assign({}, state, {
                isFetchingLazy: true,
            })
        case REQUEST_NEW_BLOG_LIST:
            return Object.assign({}, state, {
                isFetchingNew: true
            })
        case RECEIVE_BLOG_SINGLE:
            let singleblogsbySlug = prepareblogsbySlugs(state,action)
            let singleListIds = prepareBlogsSingleOrder(state,action)

            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                blogsbySlug: singleblogsbySlug,
                blogsSingleSlugs:singleListIds,
            })
        case RECEIVE_BLOG_LIST:
            const blogsbySlug = prepareblogsbySlugs(state,action)

            // let blogsbySlug = prepareblogsbySlugs(state,action)
            let blogsListSlugs = prepareBlogsListOrder(state,action)

            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                blogsbySlug: blogsbySlug,
                blogsListSlugs: blogsListSlugs,
            })
        case RECEIVE_LAZY_BLOG_SINGLE:
            let lazysingleblogsbySlug = prepareblogsbySlugs(state,action)
            let lazysingleListIds = prepareBlogsSingleOrder(state,action)

            return Object.assign({}, state, {
                isFetchingLazy:false,
                blogsbySlug: lazysingleblogsbySlug,
                blogsSingleSlugs:lazysingleListIds,
            })
        case RECEIVE_LAZY_BLOG_LIST:
            let lazyblogsbySlug = prepareblogsbySlugs(state,action)
            let lazyblogsListSlugs = prepareBlogsListOrder(state,action)
            return Object.assign({}, state,{
                LazyPage: state.LazyPage +1,
                isFetchingLazy:false,
                blogsbySlug: lazyblogsbySlug,
                blogsListSlugs:lazyblogsListSlugs,

            })

        case RECEIVE_NEW_BLOG_LIST:
            let newblogsbySlug = prepareblogsbySlugs(state,action)
            let newblogsListSlugs = prepareNewBlogsLists(state,action)
            return Object.assign({}, state,{
                NewPage: state.NewPage +1,
                isFetchingNew:false,
                blogsbySlug: newblogsbySlug,
                blogsListSlugs:newblogsListSlugs,

            })
        case STOP_LAZY_BLOG_SINGLE:
        case STOP_LAZY_BLOG_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidateLazy: false,
                isFetchingLazy:false,
                stopLazyLoad:false,
            })
        case STOP_NEW_BLOG_LIST:
            return Object.assign({}, state, {
                isFetchingNew: false,
            })
        case INVALIDATE_BLOG_SINGLE:
        case INVALIDATE_BLOG_LIST:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        default:
            return state
    }
}

/**
 * TODO compare both json throw the unnessecarz parts away and merge them  *
 * @param post
 * @param action
 * @returns {{}|blogsbySlug}
 */
function prepareblogsbySlugs(post,action) {
    let BlogObj = post.blogsbySlug

    const ItemTypeData = getCurrentItemType(action.ItemType)

    action.blogs.map(function (action) {
        for( var i in action ) {
            if(!ItemTypeData.api_data.hasOwnProperty(i)) {
                delete action[i]
            }
        }
        BlogObj[action.slug] = {...ItemTypeData.api_data,...action}
    })

    console.log(BlogObj)

    return BlogObj
}



function prepareBlogsListOrder(post,action) {
    let BlogsIds = post.blogsListSlugs

    if(!BlogsIds[action.ItemType])
        BlogsIds[action.ItemType] = []

    action.blogs.forEach(function(post) {
        let temp_id = post.slug

        const checkifExists = BlogsIds[action.ItemType].some(x => x === temp_id)

        !checkifExists ? BlogsIds[action.ItemType].push(temp_id) : ""
    })

    return BlogsIds
}

function prepareBlogsSingleOrder(post,action) {

    // Use this if you want an appending blogsingle structure so that you have multiple blogposts =)
    // let BlogsIds = post.blogsSingleSlugs

    let BlogsIds = []

    action.blogs.forEach(function(post) {
        let temp_id = post.slug

        const checkifExists = BlogsIds.some(x => x === temp_id)

        !checkifExists ? BlogsIds.push(temp_id) : ""
    })

    return BlogsIds
}

function prepareNewBlogsLists(post,action) {
    let BlogsIds = post.blogsListSlugs

    action.blogs.forEach(function (post) {
        let temp_id = post.slug

        BlogsIds.unshift(temp_id)
    })

    return BlogsIds
}

export default Blog