import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactGridLayout from 'react-grid-layout'
import Picture from '../picture/index'

import {Responsive, WidthProvider} from 'react-grid-layout';

import './bloggrid.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class BlogGrid extends Component {

    generateDesktopLayout() {
        return this.props.blogs.map((post,index) => {
            let height = 3
            return { x: index * 3 % 12, y: Math.floor(index / 4) * height, w: 3, h: height, i: index.toString(), "static":true,}
        })
    }

    generateMobileLayout() {
        return this.props.blogs.map((post,index) => {
            let height = 3
            return { x: index * 6 % 12, y: index * height, w: 6, h: height, i: index.toString(), "static":true,}
        })
    }

    render() {
        var layouts = {
            "lg":
                this.generateDesktopLayout(),
            "md": this.generateMobileLayout(),
            "sm": this.generateMobileLayout(),
            "xs": this.generateMobileLayout(),
            "xxs": this.generateMobileLayout()
        }
        return (
            <div className="bloggrid-container">
            {this.props.blogs.length > 0 &&
            <ResponsiveReactGridLayout className="layout" layouts={layouts} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                       cols={{lg: 12, md: 6, sm: 6, xs: 6, xxs: 6}} useCSSTransforms={true} >
                {this.props.blogs.map((post,index) =>
                        <div className="grid-item" key={index}>
                            <Picture
                                blogid={post.id}
                                type="thumbnail"
                                height="200px"
                                width="100%"
                                backgroundSize="cover">
                            </Picture>
                            <div className="blog-title">{post.title.rendered}</div>
                            <div className="blog-preview-text" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
                            <button className="readmore"><Link to={{ pathname: '/blog/' + post.id, }}>Weiterlesen...</Link></button>
                        </div>
                )}
            </ResponsiveReactGridLayout>
            }
            </div>
        )
    }
}
