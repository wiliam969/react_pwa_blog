import React, { Component } from 'react'

import BlogContent from './blog'
import Loading from '../../../shared/utilities/loading'

export default class Blog extends Component {

    render() {
        return (
            <div>
                {   this.props.isFetching &&
                    <Loading ></Loading>
                }

                {   this.props.didInvalidate &&
                <p> Something went wrong</p>
                }
                {
                    !this.props.isFetching && !this.props.didInvalidate &&
                    <BlogContent content={this.props.blog}></BlogContent>
                }
            </div>
        )
    }
}