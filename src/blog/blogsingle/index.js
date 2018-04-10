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

/*
        This is the BlogSingle Class. The Itention behind this class is that it behaves like a wrapper for every single Blog Item
        Which means we have an Array of BlogItems which gets fully displayed and here the get wrapped
        Todo: The problem here is that to the current state we get always a duplicate when we are using the lazyload function which may be a reducer problem
        Todo: We should also get rid of the blog:id thing we need a smooth title or other structure which the client can read
        Todo: The HTML Title of the Website should be always the Title of the Blog
*/
class BlogSingle extends Component {

    constructor() {
        super()

        this.fetchLazyBlogs = this.fetchLazyBlogs.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    // Fetching all Blogs AFTER the main Blog
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

                                    {console.log(this.props.BlogSingle)}
                                    {console.log(post.stopLazyLoad)}
                                    <LazyLoader
                                        type={this.fetchLazyBlogs}
                                        fetch={this.props.BlogSingle.isFetchingLazy}
                                        stop={post.stopLazyLoad}
                                        name="Single Blog"
                                        date={post.date}
                                        id={post.id}
                                        index={index}>
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