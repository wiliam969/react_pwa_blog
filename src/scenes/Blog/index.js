import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBlogSingle } from '../../services/session/actions/Blog'
import { showComments } from "../../services/session/actions/Comments"

import Blog from './components/blog/index'
import Comments from './components/comments/index'

import LazyBlog from './components/blog/blog-lazy'
import Loading from '../../components/loading'

class BlogSingle extends Component {

    constructor(props) {
        super(props)
    }


    componentDidMount() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    render() {
        console.log(this.props.Blog)
        return (
            <div>
                {   this.props.Blog.isFetching &&
                        <Loading type="Spin"></Loading>
                }

                {   this.props.Blog.didInvalidate &&
                    <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }
                { Object.keys(this.props.Blog.items).length > 0 &&
                        <div>
                            {Object.keys(this.props.Blog.items).map((key) =>
                                <div>
                                    <Blog key={key} data-key={key} item={this.props.Blog.items[key]} ></Blog>

                                    <Comments blogid={this.props.Blog.items[key].id}></Comments>
                                </div>
                            )}
                            <LazyBlog date={this.props.Blog.items[this.props.match.params.id].date} id={this.props.match.params.id}></LazyBlog>
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