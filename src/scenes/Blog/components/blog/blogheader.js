import React, { Component } from 'react'

export default class BlogHeader extends Component {
    render() {
        return (
            <div>
                <p>Author:{this.props.blogheader.author}</p>
                <p>Category:{this.props.blogheader.category}</p>
                <p>Date:{this.props.blogheader.date}</p>
            </div>
        )
    }
}