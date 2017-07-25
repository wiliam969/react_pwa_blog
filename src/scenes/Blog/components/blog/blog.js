import React, { Component } from 'react'
import { connect } from 'react-redux'

export default class Blog extends Component {
    // componentDidMount() {
    //
    // }
    render() {
        console.log(this.props.content)
        return (
            <div>
                {/*{this.props.blog.length > 0 ?*/}
                {/*{this.props.blog.map((post,this.props.content.id) =>*/}
                        <div className="box" key={this.props.content.id} data-key={this.props.content.id} style={ this.humus }>
                            {this.props.content.id}
                            <p>{this.props.content.bloginformation.id}</p>
                            <p>{this.props.content.bloginformation.author}</p>
                            <p>{this.props.content.bloginformation.date}</p>
                            <div className="blog-title">{this.props.content.bloginformation.title}</div>
                            <div className="blog-preview-text">{this.props.content.bloginformation.content}</div>
                        </div>
            </div>
        )
    }
}
//
// function mapStateToProps (state,ownProps) {
//
//     var Blog = { content: {rendered:"hi"}, title: {rendered:"im markus"}}
//
//     Blog = Object.assign({}, state.Blog.bloginformation)
//
//     return {
//         blog:Blog,
//     }
// }
//
// export default connect(mapStateToProps) (Blog)