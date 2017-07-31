import React, { Component } from 'react'
import Picture from '../../../../components/Picture/Picture'

export default class Blog extends Component {
    render() {
        return (
            <div>
                {Object.keys(this.props.content).length > 0 &&
                    <div className="box">
                        <Picture blogid={this.props.content.id} type="full"></Picture>
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