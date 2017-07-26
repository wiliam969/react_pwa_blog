import React, { Component } from 'react'

export default class CommentsList extends Component {
    render() {
            return (
                <div className="container">
                    <h1>HELLO IM COMMENT LIST</h1>
                    { this.props.comments.length > 0 &&
                        this.props.comments.map((post,index) =>
                            <div className="box" key={index} data-key={index}>
                                <p>{post.id}</p>
                                <p>{post.author_name}</p>
                                <p>{post.content.rendered}</p>
                            </div>
                        )
                    }
                </div>
            )
    }
}