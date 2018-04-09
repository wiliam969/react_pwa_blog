import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchNewBlogPreview,
    fetchBlogPreviews
} from './blogActions'

import Loading from '../shared/loading/loading'
import LoadingBtn from '../shared/loading/loading-btn'
import LazyLoader from '../shared/lazyloader/lazyloader'
import BlogGrid from '../shared/blog/bloggrid'

// import Quotation from './quotation/index'

// import rBGColorGenerator from '../shared/background/randomBackgroundColor'

import './blog.css'

class Blog extends Component {

    FetchingStyle = {
        color:"red",
        fontSize:"40px",
        fontWeight:900,
    }

    constructor(props) {
        super(props)

        this.fetchNewPosts = this.fetchNewPosts.bind(this);
    }

    componentDidMount() {
        if(this.props.Blog.items.length === 0) {
            const { dispatch } = this.props
            dispatch(fetchBlogPreviews(this.props))
        }

        // rBGColorGenerator.randomBackgroundColor("home-loading-container", 2500)
    }

    fetchNewPosts() {
        const { dispatch } = this.props
        dispatch(fetchNewBlogPreview(this.props))
    }

    render () {
        return (
            <div className="blog-container">
                {   this.props.Blog.isFetching ?
                        <Loading></Loading>
                    :
                    <div className="blog-wrapper">
                        <div className="home-loading-container" id="home-loading-container">
                            {this.props.Blog.isFetchingNew
                                ?
                                <Loading type="reload"></Loading>
                                :
                                <LoadingBtn name="Search for new Blogs" onClick={this.fetchNewPosts}></LoadingBtn>
                            }
                        </div>
                        {   this.props.Blog.didInvalidate &&
                            <p style={this.FetchingStyle}>Something went Wrong</p>
                        }
                            <div className="data-container">
                                {/*<Quotation></Quotation>*/}
                                <div className="home-smoke"></div>
                                <BlogGrid blogs={this.props.Blog.items}></BlogGrid>
                                {/*<BlogList blogs={this.props.Blog.items}></BlogList>*/}

                                <div className="lazyloadcontainer">
                                    {
                                        this.props.Blog.isFetchingLazy &&
                                        <Loading type="Spin"></Loading>
                                    }

                                    {
                                        this.props.Blog.stopLazyLoad ?
                                            <LazyLoader type="Home"></LazyLoader>
                                            :
                                            <p style={{color: "red"}}>No older Blog found. Sorry!</p>
                                    }
                                </div>
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

