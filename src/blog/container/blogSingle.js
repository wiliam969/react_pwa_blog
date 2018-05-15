import React, { Component } from 'react'
import Picture from '../../shared/picture/index'
import './blog.css'

export default class BlogContent extends Component {
    render() {
        const blogs = this.props.blogsbySlug
        return (
            <div className="blog-single-container">
                {this.props.blogsSingleSlugs.length > 0 &&
                    this.props.blogsSingleSlugs.map((post,index) =>
                        <div className="blog-single-wrapper" key={index}>
                            <Picture featured_media_id={blogs[post].featured_media_id} type="full" height="50vh" width="100%" backgroundsize="cover"></Picture>
                            <div className="blog-single-content-wrapper container">
                                <div className="blog-single-content-wrapper-fix">
                                    <p className="blog-single-date">{new Date(blogs[post].date).toLocaleDateString()}</p>
                                    <div className="blog-single-title">{blogs[post].title}</div>
                                    <div className="blog-single-text" dangerouslySetInnerHTML={{__html: blogs[post].content}}></div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
