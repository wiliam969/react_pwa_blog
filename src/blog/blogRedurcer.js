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


function Blog(
    state = {
        isFetching: false,
        isFetchingLazy: false,
        isFetchingNew: false,
        didInvalidate: false,
        stopLazyLoad:true,
        blogsbySlug: {},
        blogsListSlugs: [],
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
            let singleListIds = prepareBlogsOrder(state,action)

            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                blogsbySlug: singleblogsbySlug,
                blogsSingleSlugs:singleListIds,
            })
        case RECEIVE_BLOG_LIST:
            const blogsbySlug = prepareblogsbySlugs(state,action)
            console.log(blogsbySlug)

            // let blogsbySlug = prepareblogsbySlugs(state,action)
            let blogsListSlugs = prepareBlogsOrder(state,action)

            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                blogsbySlug: blogsbySlug,
                blogsListSlugs: blogsListSlugs,
            })
        case RECEIVE_LAZY_BLOG_SINGLE:
            let lazysingleblogsbySlug = prepareblogsbySlugs(state,action)
            let lazysingleListIds = prepareBlogsOrder(state,action)

            return Object.assign({}, state, {
                isFetchingLazy:false,
                blogsbySlug: lazysingleblogsbySlug,
                blogsSingleSlugs:lazysingleListIds,
            })
        case RECEIVE_LAZY_BLOG_LIST:
            let lazyblogsbySlug = prepareblogsbySlugs(state,action)
            let lazyblogsListSlugs = prepareBlogsOrder(state,action)
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
 * Todo: Here we have to recode everything to immutable state
 * Todo: creating object instead of array :(
 *
 * @param post
 * @param action
 * @returns {{}|blogsbySlug}
 */
function prepareblogsbySlugs(post,action) {
    let BlogObj = post.blogsbySlug

    const defaultBlog = action.blogs.map(function (action) {

        let objBlogs = action.slug

        objBlogs = Object.create(action)

        objBlogs.date=       action.date
        objBlogs.slug  =    action.slug
        objBlogs.title =     action.title.rendered
        objBlogs.content=    action.content.rendered
        objBlogs.excerpt=    action.excerpt.rendered
        objBlogs.featured_media_id= action.featured_media

        BlogObj[action.slug] = Object.assign(objBlogs)

        return action
    })

    return BlogObj
}

function prepareBlogsOrder(post,action) {
    let BlogsIds = post.blogsListSlugs

    action.blogs.forEach(function(post) {
        let temp_id = post.slug

        BlogsIds.push(temp_id)
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