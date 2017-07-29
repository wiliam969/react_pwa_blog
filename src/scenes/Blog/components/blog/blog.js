import React, { Component } from 'react'

export default class Blog extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.content).length > 0 &&
                    <div className="box">
                        <p>{this.props.content.id}</p>
                        <p>{this.props.content.author}</p>
                        <p>{this.props.content.date}</p>
                        <div className="blog-title">{this.props.content.title}</div>
                        <div className="blog-preview-text" dangerouslySetInnerHTML={{__html: this.props.content.content}}></div>
                    </div>
                }
            </div>
        )
    }
}