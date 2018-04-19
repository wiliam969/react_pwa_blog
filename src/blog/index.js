import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
    fetchNewBlogPreview,
    fetchBlogPreviews,
    fetchLazyBlogPreview
} from './blogActions'

import Loading from '../shared/utilities/loading'
import LoadingBtn from '../shared/utilities/loading-btn'
import LazyLoader from '../shared/lazyloader/lazyloader'
import BlogGrid from '../shared/blog/bloggrid'

// import Quotation from './quotation/index'

// import rBGColorGenerator from '../shared/background/randomBackgroundColor'

import './blog.css'

class Blog extends Component {

    constructor(props) {
        super(props)

        this.fetchNewPosts = this.fetchNewPosts.bind(this)
        this.fetchLazyPosts = this.fetchLazyPosts.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        if(this.props.Blog.items.length === 0) {
            dispatch(fetchBlogPreviews(this.props))
        }

        // rBGColorGenerator.randomBackgroundColor("home-loading-container", 2500)
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



            <div className="blog-container container">
                <Helmet>
                    {/*<meta name="description" content={this.props.BlogSingle.items[0].content.rendered}/>*/}
                    {/*<meta name="keywords" content={this.props.BlogSingle.items[0].tags}/>*/}
                    <title>Blog</title>
                    <link rel="canonical" href={window.location.href}/>
                </Helmet>
                {   this.props.Blog.isFetching ?
                        <Loading></Loading>
                    :
                    <div className="blog-wrapper">
                        <div className="blog-loading-container" id="blog-loading-container">
                            {this.props.Blog.isFetchingNew
                                ?
                                <Loading type="reload"></Loading>
                                :
                                <LoadingBtn name="Search for new Blogs" onClick={this.fetchNewPosts}></LoadingBtn>
                            }
                        </div>

                        {   this.props.Blog.didInvalidate &&
                            <p>Something went Wrong</p>
                        }
                            <div className="blog-container">
                                <BlogGrid blogs={this.props.Blog.items}></BlogGrid>

                                <LazyLoader type={this.fetchLazyPosts} fetch={this.props.Blog.isFetchingLazy} stop={this.props.Blog.stopLazyLoad} name="Blog"></LazyLoader>
                            </div>
                    </div>
                }
            </div>
        );
    }
}

Blog.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state,ownProps) {
    var blog = { didInvalidate: '', isFetching: '',}

    blog = Object.assign({}, state.Blog)
    return {
        Blog: blog,
    }
}

export default connect(mapStateToProps)(Blog)

