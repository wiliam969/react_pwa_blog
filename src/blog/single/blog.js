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
                        <div className="blog-content-wrapper container">
                            <p className="blog-date">{new Date(this.props.content.date).toLocaleDateString()}</p>
                            <div className="blog-title">{this.props.content.title.rendered}</div>
                            <div className="blog-preview-text" dangerouslySetInnerHTML={{__html: this.props.content.content.rendered}}></div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}