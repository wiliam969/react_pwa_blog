import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchNewBlogPreview,
    fetchLazyBlogPreview
} from './actions/blogListActions'

import Loading from '../shared/utilities/loading'
import LoadingBtn from '../shared/utilities/loading-btn'
import LazyLoader from '../shared/lazyloader/lazyloader'
import BlogGrid from './container/blogGrid'

// import Quotation from './quotation/index'

import './blog.css'

class BlogList extends Component {

    constructor(props) {
        super(props)

        this.fetchNewPosts = this.fetchNewPosts.bind(this)
        this.fetchLazyPosts = this.fetchLazyPosts.bind(this)
    }

    fetchNewPosts() {
        const { dispatch } = this.props
        dispatch(fetchNewBlogPreview(this.props))
    }

    fetchLazyPosts() {
        const { dispatch } = this.props
        dispatch(fetchLazyBlogPreview(this.props.Blog.LazyPage))
    }

    /*
    Todo: Here we have a to the current state random error with the FetchNewBlogs function idk what its causing but it seems to be a 404 error
     */
    render () {
        return (
            <div className="blog-list-container container">
                <div className="blog-list-wrapper">
                    {/*<div className="blog-list-loading-container" id="blog-list-loading-container">*/}
                        {/*{this.props.Blog.isFetchingNew*/}
                            {/*?*/}
                            {/*<Loading type="reload"></Loading>*/}
                            {/*:*/}
                            {/*<LoadingBtn name="Search for new Blogs" onClick={this.fetchNewPosts}></LoadingBtn>*/}
                        {/*}*/}
                    {/*</div>*/}
                    <div className="blog-list-container">
                        <BlogGrid blogsbySlug={this.props.blogsbySlug} blogsListSlugs={this.props.blogsListSlugs} location={this.props.location}></BlogGrid>

                        {/*<LazyLoader type={this.fetchLazyPosts} fetch={this.props.Blog.isFetchingLazy} stop={this.props.Blog.stopLazyLoad} name="Blog"></LazyLoader>*/}
                    </div>
                </div>
            </div>
        );
    }
}

BlogList.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state,ownProps) {
    var blog = { didInvalidate: '', isFetching: '',}

    blog = Object.assign({}, state.Blog)
    return {
        Blog: blog,
    }
}

export default BlogList

