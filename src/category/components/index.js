import React, { Component } from 'react'
import Picture from '../../shared/Picture/index'
import { Link } from 'react-router-dom'

export default class BlogList extends Component {

    humus = {
        height: 500 + 'px'
    }

    componentDidMount() {
    }
    componentDidUpdate() {
    }
    render() {
        return (
            <div className="container">

                {this.props.blogs.length > 0 &&
                    this.props.blogs.map((post,index) =>
                        <div className="box" key={index} data-key={index} style={this.humus}>
                            <Picture blogid={post.id} type="thumbnail" height="200px" width="100%"></Picture>
                            <div className="blog-title">{post.title.rendered}</div>
                            <div className="blog-preview-text" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
                            <div className="readmore"><Link to={{ pathname: '/blog/' + post.id, }}>Weitalesen...</Link></div>
                        </div>
                    )
                }
            </div>
        )
    }
}