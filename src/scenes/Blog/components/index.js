import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Blog from './blog/blog'
import Comments from './comments/index'

class BlogWrapper extends Component {

    constructor(props) {
        super(props)
    }


    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Blog content={this.props.Blogs}></Blog>

                <div>
                    <Comments blogid={this.props.Blogs.id}></Comments>
                </div>
            </div>
        )
    }
}

BlogWrapper.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var blogs = { didInvalidate: '', isFetching: '', item: { id: "", author: "", date: "", content:"LOREI", title: "dasd"}}
    var comments = { }

    blogs = ownProps.blogs
    comments = Object.assign({}, state.Comments)

    return {
        Blogs: blogs,
        Comments:comments
    }
}

export default connect(mapStateToProps)(BlogWrapper)