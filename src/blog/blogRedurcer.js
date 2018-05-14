import {
    REQUEST_BLOG_LIST,
    REQUEST_LAZY_BLOG_LIST,
    REQUEST_NEW_BLOG_LIST,
    INVALIDATE_BLOG_LIST,
    RECEIVE_BLOG_LIST,
    RECEIVE_LOCAL_BLOG_LIST,
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
        blogsbyId: {},
        blogsListIds: [],
        blogsSingleIds: [],
        receivedAt: "",
        LazyPage:1,
        NewPage:1,
    }, action) {
    switch(action.type) {
        case REQUEST_BLOG_LIST:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case REQUEST_LAZY_BLOG_LIST:
            return Object.assign({}, state, {
                isFetchingLazy: true,
            })
        case REQUEST_NEW_BLOG_LIST:
            return Object.assign({}, state, {
                isFetchingNew: true
            })
        case RECEIVE_BLOG_LIST:
            let blogsbyId = prepareBlogsbyIds(state,action)
            let blogsListIds = prepareBlogsList(state,action)

            return Object.assign({}, state, {
                isFetching:false,
                didInvalidate:false,
                blogsbyId: blogsbyId,
                blogsListIds: blogsListIds,
            })
        case RECEIVE_LOCAL_BLOG_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: state.items.concat(action.blogs),
            })
        case RECEIVE_LAZY_BLOG_LIST:
            let lazyblogsbyId = prepareBlogsbyIds(state,action)
            let lazyblogsListIds = prepareBlogsList(state,action)
            return Object.assign({}, state,{
                LazyPage: state.LazyPage +1,
                isFetchingLazy:false,
                blogsbyId: lazyblogsbyId,
                blogsListIds:lazyblogsListIds,

            })

            // return {
            //     ...state,
            //     LazyPage: state.LazyPage +1,
            //     isFetchingLazy:false,
            //     items: state.items.concat(action.blogs),
            // }
        case RECEIVE_NEW_BLOG_LIST:
            return {
                ...state,
                items: [
                    ...action.blogs,
                    ...state.items,
                ],
                NewPage: state.NewPage +1,
                isFetchingNew:false,
            }
        case STOP_LAZY_BLOG_LIST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidateLazy: false,
                isFetchingLazy:false,
                stopLazyLoad:false,
            })
        case STOP_NEW_BLOG_LIST:
            return {
                ...state,
                isFetchingNew: false,
            }
        case INVALIDATE_BLOG_LIST:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        default:
            return state
    }
}

function prepareBlogsbyIds(post,action) {
    const last_items = post.blogsbyId
    console.log(post)
    let Blogs = post.blogsbyId
    console.log(Blogs)

    action.blogs.forEach(function(post) {
        let temp_blog = {
            date:       post.date,
            slug:       post.slug,
            title:      post.title.rendered,
            content:    post.content.rendered,
            excerpt:    post.excerpt.rendered,
            featured_media_id: post.featured_media,
        }

        Blogs[post.id] = temp_blog
    })

    console.log(Blogs)

    return Blogs
}

function prepareBlogsList(post,action) {
    let BlogsIds = post.blogsListIds

    action.blogs.forEach(function(post) {
        let temp_id = post.id

        BlogsIds.push(temp_id)
    })

    return BlogsIds
}

export default Blog