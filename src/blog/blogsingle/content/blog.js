import React, { Component } from 'react'
import Picture from '../../../shared/picture/index'
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
                    <div className="blog-single-container">
                        <Picture blogid={this.props.content.id} type="full" height="50vh" width="100%" backgroundsize="cover"></Picture>
                        <div className="blog-single-content-wrapper container">
                            <div className="blog-single-content-wrapper-fix">
                                <p className="blog-single-date">{new Date(this.props.content.date).toLocaleDateString()}</p>
                                <div className="blog-single-title">{this.props.content.title.rendered}</div>
                                <div className="blog-single-text" dangerouslySetInnerHTML={{__html: this.props.content.content.rendered}}></div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}