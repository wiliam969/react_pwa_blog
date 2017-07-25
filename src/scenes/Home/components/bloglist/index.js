    import React, { Component } from 'react'
import Thumbnail from '../../../../components/Picture/thumbnail-lazyload'
import { Link } from 'react-router-dom'

export default class BlogList extends Component {

    humus = {
        height: 2000+'px',
    }

    componentDidMount() {
    }
    componentDidUpdate() {
    }
    render() {
        console.log(this.props.blogs)
        return (
            <div className="container">

                {this.props.blogs.length > 0 &&
                    this.props.blogs.map((post,index) =>
                        <div className="box" key={index} data-key={index} style={ this.humus }>
                            {index}
                            <Thumbnail blogid={post.id} type="thumbnail"></Thumbnail>
                            <div className="blog-title">{post.title.rendered}</div>
                            <div className="blog-preview-text">{post.excerpt.rendered}</div>
                            <div className="readmore"><Link to={{ pathname: '/blog/' + post.id, }}>Weitalesen...</Link></div>
                        </div>
                    )
                }
            </div>
        )
    }
}