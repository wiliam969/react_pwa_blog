import React, { Component } from 'react'

import BlogContent from './blog'
import Loading from '../../../../components/loading'

export default class Blog extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {/*{   this.props.Blog.isFetching &&*/}
                {/*<Loading type="Spin"></Loading>*/}
                {/*}*/}

                {/*{   this.props.Blog.didInvalidate &&*/}
                {/*<h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>*/}
                {/*}*/}
                {/*{*/}
                    {/*!this.props.Blog.isFetching && !this.props.Blog.didInvalidate &&*/}
                    {/*this.props.Blog.item.length > 0 &&*/}
                        {/*<BlogContent content={this.props.Blog.item} ></BlogContent>*/}
                {/*}*/}
            </div>
        )
    }
}