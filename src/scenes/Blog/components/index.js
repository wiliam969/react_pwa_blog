import React, { Component } from 'react'
import Blog from './blog/blog'
import Comments from './comments/index'

export default class BlogWrapper extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }
    componentDidUpdate() {
    }

    render() {
        console.log(this.props.blogs)
        console.log(this.props.blogs.length)
        return (
            <div>
                {Object.keys(this.props.blogs).length > 0 &&
                Object.keys(this.props.blogs).map((key) =>
                        <div>
                            <Blog key={key} data-key={key} content={this.props.blogs[key]}></Blog>
                        </div>
                    )
                }
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