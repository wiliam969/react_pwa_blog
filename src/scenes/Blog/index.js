import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBlogSingle } from '../../services/session/actions/Blog'

import Blog from './components/blog/index'
import Comments from './components/comments/index'

import LazyBlog from './components/blog/blog-lazy'

class BlogSingle extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    render() {
        return (
            <div>
                { this.props.Blog.items.length > 0 &&
                        <div>
                            {this.props.Blog.items.map((post,index) =>
                                <div>
                                    <Blog key={index} data-key={index} blog={post} isFetching={this.props.Blog.isFetching} didInvalidate={this.props.Blog.didInvalidate}></Blog>

                                    { !this.props.Blog.stopLazyLoad &&
                                    <LazyBlog date={post.date} id={post.id}></LazyBlog>
                                    }

                                    <Comments blogid={post.id}></Comments>
                                </div>
                            )}

                            {this.props.Blog.stopLazyLoad &&
                                <h1>NO MORE POSTS FOUND</h1>
                            }
                        </div>
                }
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