import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
// import { Helmet } from 'react-helmet'

import {
    fetchLazyBlog,
} from './actions/blogSingleActions'

import BlogSingleRender from './container/blogSingleRender'

// import LazyLoader from '../shared/lazyloader/lazyloader'

/**
    The intention behind this class is that it behaves like a wrapper for every single Blog Item
    Which means we have an Array of BlogItems which gets fully displayed and here the get wrapped
    Todo: When i already loaded a couple of single blogs and after that im going to the blogpreview page and again click on a blog its weird it should just load the next blog not every item which i already saw

*/
class BlogSingle extends Component {

    constructor() {
        super()

        this.fetchLazyBlogs = this.fetchLazyBlogs.bind(this)
        this.fetchpop = this.fetchpop.bind(this)
    }

    componentDidMount() {
        this.fetchpop()
    }
    // Fetching all Blogs AFTER the main Blog
    fetchLazyBlogs(date,id,index) {
        const { dispatch } = this.props
        dispatch(fetchLazyBlog(date,id,index))
    }

    fetchpop() {
        this.props.getBlogSingle(this.props)
    }

    render() {
        return (
            <div>
                {/*<Helmet>*/}
                    {/*<meta name="description" content={this.props.Blog.items[0].content.rendered}/>*/}
                    {/*<meta name="keywords" content={this.props.Blog.items[0].tags}/>*/}
                    {/*<title>{this.props.Blog.items[0].title.rendered}</title>*/}
                    {/*<link rel="canonical" href={window.location.href}/>*/}
                {/*</Helmet>*/}

                <BlogSingleRender blogsbySlug={this.props.blogsbySlug} blogsSingleSlugs={this.props.blogsSingleSlugs} location={this.props.location}/>

                {/*<LazyLoader*/}
                    {/*type={this.fetchLazyBlogs}*/}
                    {/*fetch={this.props.ProjectSingle.isFetchingLazy}*/}
                    {/*stop={post.stopLazyLoad}*/}
                    {/*name="Single Blog"*/}
                    {/*date={post.date}*/}
                    {/*id={post.id}*/}
                    {/*index={index}>*/}
                {/*</LazyLoader>*/}

                {/*<Comments blogid={post.id}></Comments>*/}
            </div>
        )
    }
}

export default BlogSingle