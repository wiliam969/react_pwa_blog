import React, { Component } from 'react'

export default class Blog extends Component {
    render() {
        return (
                <div className="box" key={this.props.content.id} data-key={this.props.content.id} style={ this.humus }>
                    <p>{this.props.content.bloginformation.id}</p>
                    <p>{this.props.content.bloginformation.author}</p>
                    <p>{this.props.content.bloginformation.date}</p>
                    <div className="blog-title">{this.props.content.bloginformation.title}</div>
                    <div className="blog-preview-text" dangerouslySetInnerHTML={{__html: this.props.content.bloginformation.content}}></div>
                </div>
        )
    }
}