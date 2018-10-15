import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

import {fetchBlogPreviews, fetchLazyBlogPreview} from './actions/blogListActions'
import { fetchBlogSingle } from './actions/blogSingleActions'

import { modifySiteStatus } from '../shared/Alert/alertActions'

import Loading from '../shared/utilities/loading'
import LazyLoader from '../shared/lazyloader/lazyloader'

import BlogList from './blogList'
import BlogSingle from './blogSingle'

/**
        The Intention behind this class is that it behaves like a wrapper for every single Blog Item
        Which means we have an Array of BlogItems which gets fully displayed and here the get wrapped
        Todo: When i already loaded a couple of single blogs and after that im going to the blogpreview page and again click on a item_type_handler its weird it should just load the next item_type_handler not every item which i already saw

*/
class ItemTypeHandler extends Component {

    constructor(props) {
        super(props)

        this.state = {
            type: this.props.match.params.type
        }

        this.getBlogList = this.getBlogList.bind(this)
        this.getBlogSingle = this.getBlogSingle.bind(this)
    }

    componentDidMount() {
        this.getBlogList()
        this.getBlogSingle()

        // const { dispatch } = this.props
        // const slug = this.props.match.params.slug
        // this.props.Blog.blogsbySlug[slug] !== slug && dispatch(fetchBlogSingle(this.props))
        // this.props.Blog.blogsListSlugs.length === 0 && !this.props.match.params.slug && dispatch(fetchBlogPreviews(this.props))

        this.props.setSiteStatus(this.props, {lazyload: 1, haha: 2, fufu: 2});
    }

    getLazyBlogList(props) {
        this.props.getLazyBlogList(props)
    }

    getBlogList() {
        if(!this.props.Blog.blogsListSlugs[this.state.type] && !this.props.match.params.slug) {
            this.props.getBlogList(this.props)
        }
    }

    getBlogSingle() {
        const checkifExists = this.props.Blog.blogsSingleSlugs.some(x => x === this.props.match.params.slug)

        if(this.props.Blog.blogsSingleSlugs.length === 0 || !this.props.Blog.isFetching && this.props.match.params.slug && !checkifExists) {
            this.props.getBlogSingle(this.props)
        }
    }

    updateType() {
        this.setState ({ type: this.props.match.params.type })
        this.forceUpdate()
        console.log(this.state.type)
    }

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
                    <div>
                        { this.props.match.params.type === this.state.type ?
                            <div className="blog-container">
                                {this.props.match.params.slug ?
                                    <BlogSingle getBlogSingle={this.getBlogSingle}
                                                blogsbySlug={this.props.Blog.blogsbySlug}
                                                blogsSingleSlugs={this.props.Blog.blogsSingleSlugs}
                                                location={this.props.location} history={this.props.history}
                                                match={this.props.match}/>
                                    :
                                    <div>
                                        <BlogList getBlogList={this.getBlogList}
                                                  blogsbySlug={this.props.Blog.blogsbySlug}
                                                  blogsListSlugs={this.props.Blog.blogsListSlugs}
                                                  location={this.props.location} history={this.props.history}
                                                  match={this.props.match}/>
                                        <LazyLoader
                                            type={() => {
                                                this.getLazyBlogList(this.props)
                                            }}
                                            fetch={this.props.Blog.isFetchingLazy}
                                            stop={this.props.Blog.stopLazyLoad}
                                            name="Blog">
                                        </LazyLoader>
                                    </div>

                                }
                            </div>
                            :
                            <div>
                                {this.updateType()}
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

ItemTypeHandler.propTypes = {
    dispatch: PropTypes.func,
    getBlogList: PropTypes.func.isRequired,
    getBlogSingle: PropTypes.func.isRequired,
    getLazyBlogList: PropTypes.func.isRequired,
    setSiteStatus: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    var Blog = { didInvalidate: '', isFetching: '', items: {}}

    Blog = Object.assign({}, state.Blog)

    return {
        Blog: Blog,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBlogList: (props) => { dispatch(fetchBlogPreviews(props))},
        getBlogSingle: (props) => { dispatch(fetchBlogSingle(props))},
        getLazyBlogList: (props) => { dispatch(fetchLazyBlogPreview(props))},
        setSiteStatus: (props,params) => { dispatch(modifySiteStatus(props,params))},
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ItemTypeHandler))