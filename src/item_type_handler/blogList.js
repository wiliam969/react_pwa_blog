import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    fetchNewBlogPreview,
    fetchLazyBlogPreview
} from './actions/blogListActions'
import BlogGrid from './container/blogGrid'
import ProjectGrid from './container/projectGrid'
import {getCurrentItemType} from "./ItemTypeData";
import './blog.css'

class BlogList extends Component {

    constructor(props) {
        super(props)

        this.fetchNewPosts = this.fetchNewPosts.bind(this)
        this.fetchLazyPosts = this.fetchLazyPosts.bind(this)
        this.getwthf = this.getwthf.bind(this)
    }

    componentDidMount() {
        this.getwthf()
    }

    fetchNewPosts() {
        const { dispatch } = this.props
        dispatch(fetchNewBlogPreview(this.props))
    }

    fetchLazyPosts() {
        const { dispatch } = this.props
        dispatch(fetchLazyBlogPreview(this.props.Blog.LazyPage))
    }

    getwthf() {
        this.props.getBlogList(this.props)
    }

    renderSwitch() {

        const CurrentType = this.props.match.params.type

        switch(CurrentType) {
            case "projects":
                return <ProjectGrid
                    projectsbySlug={this.props.blogsbySlug}
                    projectsListSlugs={this.props.blogsListSlugs[CurrentType]}
                    location={this.props.location}
                    match={this.props.match}/>
                break;
            default:
                return <BlogGrid
                    blogsbySlug={this.props.blogsbySlug}
                    blogsListSlugs={this.props.blogsListSlugs[CurrentType]}
                    location={this.props.location}
                    match={this.props.match}/>
                break;
        }
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
                        {this.renderSwitch()}

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

export default BlogList

