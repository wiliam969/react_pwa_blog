import React, { Component } from 'react'
import Picture from '../../shared/picture/index'
import './blog.css'

export default class BlogContent extends Component {

    componentDidMount() {
    }
    componentDidUpdate() {
    }
    render() {
        return (
            <div>
                {Object.keys(this.props.content).length > 0 &&
                    <div className="blog-container">
                        <Picture blogid={this.props.content.id} type="full" height="50vh" width="100%" backgroundsize="cover"></Picture>
                        <p className="blog-date">{this.props.content.date}</p>
                        <div className="blog-title">{this.props.content.title.rendered}</div>
                        <div className="blog-preview-text" dangerouslySetInnerHTML={{__html: this.props.content.content.rendered}}></div>
                    </div>
                }
            </div>
        )
    }
}