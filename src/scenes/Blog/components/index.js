import React, { Component } from 'react'
import Blog from './blog/blog'
import Comments from './comments/index'

export default class BlogWrapper extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Blog content={this.props.blogs}></Blog>

                {this.props.comment.isComment
                ?
                    <Comments blogid={this.props.blogs.id}></Comments>
                :
                    <button onClick={this.props.loadCommentWrapper}>Load Comments...</button>
                }
            </div>
        )
    }
}