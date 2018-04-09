import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchBlogSingle,
    fetchLazyBlog,
} from './blogsingleActions'

import Blog from './content/index'
import Comments from './comments/index'

import Loading from '../../shared/loading/loading'
import LazyLoader from '../../shared/lazyloader/lazyloader'


class BlogSingle extends Component {

    constructor(props) {
        super(props)

        this.fetchLazyBlogs = this.fetchLazyBlogs.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    fetchLazyBlogs(date,id,index) {
        const { dispatch } = this.props
        dispatch(fetchLazyBlog(date,id,index))
    }

    render() {
        return (
            <div>
                { this.props.BlogSingle.isFetching ?
                    <Loading></Loading>
                    :
                    <div className="blog-single-wrapper">
                        { this.props.BlogSingle.items.length > 0 &&
                        <div>
                            {this.props.BlogSingle.items.map((post,index) =>
                                <div>
                                    <Blog key={index} data-key={index} blog={post} isFetching={this.props.BlogSingle.isFetching} didInvalidate={this.props.BlogSingle.didInvalidate}></Blog>

                                    <LazyLoader
                                        type={() => {this.fetchLazyBlogs(post.date,post.id,index)}}
                                        fetch={this.props.BlogSingle.isFetchingLazy}
                                        stop={this.props.BlogSingle.stopLazyLoad}
                                        name="Single Blog">
                                    </LazyLoader>

                                    <Comments blogid={post.id}></Comments>
                                </div>
                            )}
                        </div>
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
    var blogSingle = { didInvalidate: '', isFetching: '', items: {}}
    var comment = { isComments: false }

    blogSingle = Object.assign({}, state.BlogSingle)
    comment = Object.assign({}, state.Comments)

    return {
        BlogSingle: blogSingle,
        Comment: comment
    }
}

export default connect(mapStateToProps)(BlogSingle)