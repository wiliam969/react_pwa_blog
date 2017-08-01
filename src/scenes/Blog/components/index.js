import React, { Component } from 'react'
import Blog from './blog/blog'
import Comments from './comments/index'

import LazyBlog from './blog/blog-lazy'

export default class BlogWrapper extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }
    componentDidUpdate() {
    }

    render() {
        return (
            <div>
                {this.props.blogs.length > 0 &&
                    <div>
                        {this.props.blogs.map((post,index) =>
                            <div>
                                <Blog key={index} data-key={index} content={post} ></Blog>

                                <Comments blogid={this.props.blogs[index].id}></Comments>
                            </div>
                        )}
                        <LazyBlog date={this.props.blogs[0].date} id={this.props.id}></LazyBlog>
                    </div>
                }
            </div>
        )
    }
}