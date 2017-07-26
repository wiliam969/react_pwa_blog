import React, { Component } from 'react'

export default class CommentsList extends Component {

    render() {
        console.log(this.props.comments)
            return (
                <div className="container">
                    <h1>HELLO IM COMMENT LIST</h1>
                    { this.props.comments > 0 ?
                        this.props.comments.map((post,index) =>
                            <div>{post.id}</div>
                        )
                        :
                        <h1>I FUCKIN HATE U </h1>
                    }

                    {/*{this.props.comments === 0 &&*/}
                    {/*<div>WHY WE STILL HERE</div>*/}
                    {/*}*/}
                </div>
            )
    }
}