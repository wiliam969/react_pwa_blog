import React, { Component } from 'react'

export default class CommentsList extends Component {

    constructor(props) {
        super(props)
    }
    render() {

        if(this.props.comments) {
            return (
                <div className="container">
                    <h1>HELLO IM COMMENT LIST</h1>
                    {
                        this.props.comments.map((post,index) =>
                            <div>{post.id}</div>
                        )
                    }

                    {this.props.comments === 0 &&
                    <div>WHY WE STILL HERE</div>
                    }
                </div>
            )
        }

        return (
            <h1>Hello guys its me Comment List section whats going on ?</h1>
        )
    }
}