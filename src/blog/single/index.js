import React, { Component } from 'react'

import BlogContent from './blog'
import Loading from '../../shared/loading/loading'

export default class Blog extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {   this.props.isFetching &&
                <Loading type="Spin"></Loading>
                }

                {   this.props.didInvalidate &&
                <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }
                {
                    !this.props.isFetching && !this.props.didInvalidate &&
                    <BlogContent content={this.props.blog}></BlogContent>
                }
            </div>
        )
    }
}