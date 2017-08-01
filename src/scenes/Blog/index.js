import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBlogSingle } from '../../services/session/actions/Blog'
import { showComments } from "../../services/session/actions/Comments"

import BlogWrapper from './components/index'
import LazyBlog from './components/blog/blog-lazy'
import Loading from '../../components/loading'

class BlogSingle extends Component {

    constructor(props) {
        super(props)

        this.loadComments = this.loadComments.bind(this);
    }


    componentDidMount() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    loadComments() {
        const { dispatch, ownProps } = this.props
        dispatch(showComments(this.props))
    }

    render() {
        return (
            <div>
                {   this.props.Blog.isFetching &&
                        <Loading type="Spin"></Loading>
                }

                {   this.props.Blog.didInvalidate &&
                    <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }
                {
                    !this.props.Blog.isFetching && !this.props.Blog.didInvalidate &&
                    <BlogWrapper blogs={this.props.Blog.items} comment={this.props.Comment} loadCommentWrapper={this.loadComments}></BlogWrapper>
                }

                {/*<LazyBlog></LazyBlog>*/}

            </div>
        )
    }
}

BlogSingle.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var blog = { didInvalidate: '', isFetching: '', items: {}}
    var comment = { isComments: false }

    blog = Object.assign({}, state.Blog)
    comment = Object.assign({}, state.Comments)

    return {
        Blog: blog,
        Comment: comment
    }
}

export default connect(mapStateToProps)(BlogSingle)