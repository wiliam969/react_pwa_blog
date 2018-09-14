import Api from '../../Api'

export const REQUEST_BLOG_SINGLE = 'REQUEST_BLOG_SINGLE'
export const REQUEST_LAZY_BLOG_SINGLE = 'REQUEST_LAZY_BLOG_SINGLE'
export const RECEIVE_BLOG_SINGLE = 'RECEIVE_BLOG_SINGLE'
export const RECEIVE_LAZY_BLOG_SINGLE = 'RECEIVE_LAZY_BLOG_SINGLE'
export const INVALIDATE_BLOG_SINGLE = 'INVALIDATE_BLOG_SINGLE'
export const STOP_LAZY_BLOG_SINGLE = 'STOP_LAZY_BLOG_SINGLE'

export const requestBlogSingle = (id) => { return { type: 'REQUEST_BLOG_SINGLE', id } }
export const requestLazyBlogSingle = (id) => { return { type: 'REQUEST_LAZY_BLOG_SINGLE', prev_id:id } }
export const invalidateBlogSingle = (blog,id) => { return { type:'INVALIDATE_BLOG_SINGLE', id } }
export const stopLazyBlogSingle = (id,index) => { return { type: 'STOP_LAZY_BLOG_SINGLE', prev_id:id, index } }

export const receiveBlogSingle = (blog,ItemType) => {
    return {
        type: 'RECEIVE_BLOG_SINGLE',
        blogs:blog,
        ItemType:ItemType,
        receivedAt: Date.now(),
    }
}

export const receiveLazyBlogSingle = (blog,id) => {
    return {
        type:'RECEIVE_LAZY_BLOG_SINGLE',
        blogs:blog,
        id,
        receivedAt: Date.now(),
    }
}

/*
    Gets the Slug of the URI and returns it to the specific handlers after that it returns an object if the slug was correct
 */
export function fetchBlogSingle(props) {
    const slug = props.match.params.slug
    const ItemType = props.match.params.type

    return function (dispatch) {
        dispatch(requestBlogSingle(slug))

        const Args = { slug : slug }

        return Api.getPosts(ItemType, Args)
            .then(ApiResponse => {
                return dispatch(receiveBlogSingle(ApiResponse,ItemType))
            }).catch(error => {
                return dispatch(invalidateBlogSingle(error,slug))
            })
    }
}

export function fetchLazyBlog(date,ids,indexes) {
    const datum = date
    const id = ids
    const index = indexes
    return function (dispatch) {
        dispatch(requestLazyBlogSingle(id))

        const Args = {
            before : date,
            per_page : 1,
        }

        return Api.getPosts("posts", Args)
            .then(post => {
                if(typeof post === 'undefined' && post === null) {
                    return dispatch(stopLazyBlogSingle(id,index))
                }
                return dispatch(receiveLazyBlogSingle(post,post.id,id))
            })
            .catch(error => {
                return dispatch(invalidateBlogSingle(error))
            })
    }
}
