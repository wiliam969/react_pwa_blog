import React, { Component } from 'react'
import Picture from '../../shared/picture/index'

export default class BlogContent extends Component {

    componentDidMount() {
    }
    componentDidUpdate() {
    }
    render() {
        console.log(this.props.content)
        return (
            <div>
                {Object.keys(this.props.content).length > 0 &&
                    <div className="box">
                        <Picture blogid={this.props.content.id} type="full" height="50vh" width="100%"></Picture>
                        <p>{this.props.content.id}</p>
                        <p>{this.props.content.author}</p>
                        <p>{this.props.content.date}</p>
                        <div className="blog-title">{this.props.content.title.rendered}</div>
                        <div className="blog-preview-text" dangerouslySetInnerHTML={{__html: this.props.content.content.rendered}}></div>
                    </div>
                }
            </div>
        )
    }
}