/**
 * Created by wiliam969 on 28.04.2017.
 */
import db from '../../storage/index'

export const REQUEST_BLOG_PREVIEW = 'REQUEST_BLOG_PREVIEW'
export const RECEIVE_BLOG_PREVIEW = 'RECEIVE_BLOG_PREVIEW'
export const INVALIDATE_BLOG_PREVIEW = 'INVALIDATE_BLOG_PREVIEW'

export const requestBlogPreview = (blogs) => {
    return {
        type: 'REQUEST_BLOG_PREVIEW',
        blogs
    }
}

export const receiveBlogpreview = (blogs) => {
    return {
        type: 'RECEIVE_BLOG_PREVIEW',
        blogs,
        receivedAt: Date.now(),
    }
}

export const invalidateBlogPreview = (blogs) => {
    return {
        type:'INVALIDATE_BLOG_PREVIEW',
        blogs
    }
}

// this is it lul it wörks haha didint expected this :D

export function fetchBlogPreviews(blogs) {
    return function(dispatch) {
        dispatch(requestBlogPreview(blogs))

        return db.table('blog').toArray().then(bitems => {
            return dispatch(receiveBlogpreview(bitems))
        })
        .then(() => fetch(process.env.REACT_APP_API_URI + 'posts/', {method: 'GET'}))
        .then((response) => response.json())
        .then(responseJson => {
            console.log(responseJson)

            responseJson.map((post,index) => {
                db.blog.put({
                    id:post.id,
                    date:post.date,
                    date_gmt:post.date_gmt,
                    guid:post.guid,
                    modified:post.modified,
                    modified_gmt:post.modified_gmt,
                    slug:post.slug,
                    status:post.status,
                    type:post.type,
                    link:post.link,
                    title:post.title,
                    content:post.content,
                    excerpt:post.excerpt,
                    author:post.author,
                    featured_media:post.featured_media,
                    comment_status:post.comment_status,
                    ping_status:post.ping_status,
                    sticky:post.sticky,
                    template:post.template,
                    format:post.format,
                    meta:post.meta,
                    categories:post.categories,
                    tags:post.tags,
                    _links:post._links
                })
            })

            return dispatch(receiveBlogpreview(responseJson))
        }).catch(error => {
            return dispatch(invalidateBlogPreview(error))
        })
    }
}