import React, { Component } from 'react'

export default class BlogContent extends Component {

    render() {
        return (
            <div>
                <strong>Title</strong>
                <p>{this.props.blogcontent.title}</p>

                <strong>Content</strong>
                <p>{this.props.blogcontent.content}</p>
            </div>
        )
    }
}