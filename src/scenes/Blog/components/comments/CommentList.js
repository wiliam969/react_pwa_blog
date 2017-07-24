import React, { Component } from 'react'

import { connect } from 'react-redux'

export default class CommentsList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }
    render() {

        if(true) {
            return (
                <div className="container">
                    <h1>HELLO IM COMMENT LIST</h1>
                    {/*{*/}
                        {/*this.props.comments.map((post,index) =>*/}
                            {/*<div>{post.id}</div>*/}
                        {/*)*/}
                    {/*}*/}

                    {/*{this.props.comments === 0 &&*/}
                    {/*<div>WHY WE STILL HERE</div>*/}
                    {/*}*/}
                </div>
            )
        }

        return (
            <h1>Hello guys its me Comment List section whats going on ?</h1>
        )
    }
}

function mapStateToProps(state,ownProps) {


    let default_comments = { 1 : { id: 0}, 2: { id:1}}
    let Comments = Object.assign({}, state.Comments)

    return {
        comments:default_comments,
        testcomments: Comments,
    }
}

//export default connect(mapStateToProps) (CommentsList)