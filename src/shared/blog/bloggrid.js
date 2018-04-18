import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../picture/index'

import {Responsive, WidthProvider} from 'react-grid-layout';

import './bloggrid.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class BlogGrid extends Component {

    generateDesktopLayout(height) {
        return this.props.blogs.map((post,index) => {
            return { x: index * 4 % 12, y: Math.floor(index/3) * height, w: 4, h:height, i:index.toString(), "static": true,}
        })
    }

    generateTabletLayout(height) {
        return this.props.blogs.map((post,index) => {
            return { x: index * 6 % 12, y: Math.floor(index / 2) * height, w: 6, h: height, i: index.toString(), "static":true,}
        })
    }

    generateMobileLayout(height) {
        return this.props.blogs.map((post,index) => {
            return { x: index * 12 % 12, y: Math.floor(index / 1) * height, w: 12, h: height, i: index.toString(), "static":true,}
        })
    }


    render() {
        var layouts = {
            "desktop":  this.generateDesktopLayout(2),
            "mobile":  this.generateTabletLayout(2),
            "phone":  this.generateMobileLayout(2),
        }
        return (
            <div className="blog-grid-preview-container">
            {this.props.blogs.length > 0 &&
            <ResponsiveReactGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{desktop: 768, mobile: 480, phone:0}}
                cols={{desktop: 12, mobile: 12, phone: 12}}
                useCSSTransforms={true}
                rowHeight={480}>
                {this.props.blogs.map((post,index) =>
                        <div className="blog-grid-preview-item" key={index}>
                            <div className="blog-grid-preview-fix">
                                <div className="blog-grid-preview-pic-fix">
                                    <Link to={{ pathname: '/blog/' + post.slug, }}>
                                        <Picture
                                            featured_media_id={post.featured_media}
                                            is169={true}
                                            type="medium_large"
                                            backgroundsize="cover">
                                        </Picture>
                                    </Link>
                                </div>
                                <div className="blog-grid-preview-date">{new Date(post.date).toLocaleDateString()}</div>
                                <Link to={{ pathname: '/blog/' + post.slug, }} className="blog-grid-preview-prevent-a">
                                    <div className="blog-grid-preview-title">{post.title.rendered}</div>
                                </Link>

                                <div className="blog-grid-preview-text" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
                                <Link to={{ pathname: '/blog/' + post.slug, }} className="blog-grid-preview-readmore">Weiterlesen...</Link>
                            </div>
                        </div>
                )}
            </ResponsiveReactGridLayout>
            }
            </div>
        )
    }
}
