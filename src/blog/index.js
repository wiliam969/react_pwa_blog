import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router'

import { fetchBlogPreviews } from './actions/blogListActions'
import { fetchBlogSingle } from './actions/blogSingleActions'

import Loading from '../shared/utilities/loading'
import LazyLoader from '../shared/lazyloader/lazyloader'

import BlogList from './blogList'
import BlogSingle from './blogSingle'
/*
        This is the BlogSingle Class. The Intention behind this class is that it behaves like a wrapper for every single Blog Item
        Which means we have an Array of BlogItems which gets fully displayed and here the get wrapped
        Todo: When i already loaded a couple of single blogs and after that im going to the blogpreview page and again click on a blog its weird it should just load the next blog not every item which i already saw

*/
class Blog extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
        const { dispatch } = this.props
        const slug = this.props.match.params.slug
        this.props.Blog.blogsbySlug[slug] !== slug && dispatch(fetchBlogSingle(this.props))
        this.props.Blog.blogsListSlugs.length === 0 && !this.props.match.params.slug && dispatch(fetchBlogPreviews(this.props))
    }

    // shouldComponentUpdate() {
    //     const { dispatch } = this.props
    //     const slug = this.props.match.params.slug
    //     this.props.Blog.blogsbySlug[slug] !== slug && dispatch(fetchBlogSingle(this.props)) && return true
    //     this.props.Blog.blogsListSlugs.length === 0 && !this.props.match.params.slug && dispatch(fetchBlogPreviews(this.props)) && return true
    // }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Blog</title>
                    <link rel="canonical" href={window.location.href}/>
                </Helmet>

                {   this.props.Blog.didInvalidate &&
                    <p>Something went Wrong</p>
                }

                { this.props.Blog.isFetching ?
                    <Loading></Loading>
                    :
                    <div className="blog-container">
                        {this.props.match.params.slug ?
                            <BlogSingle blogsbySlug={this.props.Blog.blogsbySlug} blogsSingleSlugs={this.props.Blog.blogsSingleSlugs}/>
                            :
                            <BlogList blogsbySlug={this.props.Blog.blogsbySlug} blogsListSlugs={this.props.Blog.blogsListSlugs}/>
                        }
                        {/*<LazyLoader*/}
                        {/*type={this.fetchLazyBlogs}*/}
                        {/*fetch={this.props.BlogSingle.isFetchingLazy}*/}
                        {/*stop={post.stopLazyLoad}*/}
                        {/*name="Single Blog"*/}
                        {/*date={post.date}*/}
                        {/*id={post.id}*/}
                        {/*index={index}>*/}
                        {/*</LazyLoader>*/}

                            {/*<Comments blogid={post.id}></Comments>*/}
                    </div>
                }


            </div>
        )
    }
}

Blog.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var Blog = { didInvalidate: '', isFetching: '', items: {}}

    Blog = Object.assign({}, state.Blog)

    return {
        Blog: Blog,
    }
}


export default connect(mapStateToProps)(Blog)