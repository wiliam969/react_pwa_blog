import React, { Component } from 'react'
import { connect } from 'react-redux'

class Blog extends Component {
    componentDidMount() {

    }
    render() {
        console.log(this.props.content)
        return (
            <div>
                {this.props.blog.length > 0 ?
                    this.props.blog.map((post,index) =>
                        <div className="box" key={index} data-key={index} style={ this.humus }>
                            {index}
                            <p>{post.id}</p>
                            <p>{post.author}</p>
                            <p>{post.date}</p>
                            <div className="blog-title">{post.title.rendered}</div>
                            <div className="blog-preview-text">{post.content.rendered}</div>
                        </div>
                    )
                    :
                    <h1>what de fuck</h1>
                }
            </div>
        )
    }
}

function mapStateToProps (state,ownProps) {

    var Blog = { content: {rendered:"hi"}, title: {rendered:"im markus"}}

    Blog = Object.assign({}, state.Blog.bloginformation)

    return {
        blog:Blog,
    }
}

export default connect(mapStateToProps) (Blog)