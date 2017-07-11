import React, { Component } from 'react'
import Thumbnail from '../../../components/Picture/thumbnail'

export default class BlogList extends Component {

    defaultAttachment = {
        height: "100px", width: "100%", backgroundColor:"grey",
    }

    componentDidMount() {
    }
    render() {
        return (
            <div className="container">
                {this.props.blogs.length > 0 &&
                    this.props.blogs.map((post,index) =>
                        <div className="box" key={index} data-key={index}>
                            <div className="blog-attachment" style={ this.defaultAttachment }></div>
                            <Thumbnail blogid={post.id} type="thumbnail"></Thumbnail>
                            <div className="blog-title">{post.title.rendered}</div>
                            <div className="blog-preview-text">{post.content.rendered}</div>
                            <div className="readmore"><a href={post.link}>Weiterlesen</a></div>
                        </div>
                    )
                }
            </div>
        )
    }
}