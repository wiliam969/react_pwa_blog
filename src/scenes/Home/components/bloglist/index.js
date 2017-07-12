import React, { Component } from 'react'
import Thumbnail from '../../../components/Picture/thumbnail-lazyload'

export default class BlogList extends Component {

    fu = process.env.REACT_APP_URL

    humus = {
        height: 2000+'px',
    }

    componentDidMount() {
    }
    render() {
        return (
            <div className="container">
                {this.props.blogs.length > 0 &&
                    this.props.blogs.map((post,index) =>
                        <div className="box" key={index} data-key={index} style={ this.humus }>
                            <Thumbnail blogid={post.id} type="thumbnail"></Thumbnail>
                            <div className="blog-title">{post.title.rendered}</div>
                            <div className="blog-preview-text">{post.excerpt.rendered}</div>
                            <div className="readmore"><a href={this.fu + 'blog/' + post.id}>Weiterlesen</a></div>
                        </div>
                    )
                }
            </div>
        )
    }
}