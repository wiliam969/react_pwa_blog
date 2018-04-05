import React, { Component } from 'react'

export default class CommentsList extends Component {
    componentDidMount() {
    }
    componentDidUpdate() {
    }
    render() {
            return (
                <div className="container">
                    { this.props.comments.length > 0 &&
                        this.props.comments.map((post,index) =>
                            <div className="box" key={index} data-key={index}>
                                <p>{post.id}</p>
                                <p>{post.author_name}</p>
                                <p dangerouslySetInnerHTML={{__html: post.content.rendered}}></p>
                            </div>
                        )
                    }
                </div>
            )
    }
}