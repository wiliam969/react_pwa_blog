import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBlogSingle } from './blogsingleActions'

import Blog from './content/index'
import Comments from './comments/index'

import Loading from '../../shared/loading/loading'
import LazyLoader from '../../shared/lazyloader/lazyloader'

class BlogSingle extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    render() {
        return (
            <div>
                { this.props.BlogSingle.isFetching ?
                    <div className="loading-container">
                        <Loading type="Pacman">
                        </Loading>
                    </div>
                    :
                    <div className="blog-single-wrapper">
                        { this.props.BlogSingle.items.length > 0 &&
                        <div>
                            {this.props.BlogSingle.items.map((post,index) =>
                                <div>
                                    <Blog key={index} data-key={index} blog={post} isFetching={this.props.BlogSingle.isFetching} didInvalidate={this.props.BlogSingle.didInvalidate}></Blog>

                                    <div className="lazyloadcontainer">
                                        { !post.stopLazyLoad &&
                                        <LazyLoader type="Blog" date={post.date} id={post.id} index={index}></LazyLoader>
                                        }
                                    </div>

                                    <Comments blogid={post.id}></Comments>
                                </div>
                            )}

                            {this.props.BlogSingle.stopLazyLoad &&
                            <h1>NO MORE POSTS FOUND</h1>
                            }
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