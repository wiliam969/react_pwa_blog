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
            let height = 2
            return { x: index * 3 % 12, y: Math.floor(index / 4) * height, w: 3, h: height, i: index.toString(), "static":true,}
        })
    }

    generateMobileLayout() {
        return this.props.blogs.map((post,index) => {
            let height = 1
            return { x: index * 6 % 12, y: index * height, w: 6, h: height, i: index.toString(), "static":true,}
        })
    }

    render() {
        var layouts = {
            "lg":  this.generateDesktopLayout(),
            "md":  this.generateMobileLayout(),
            "sm":  this.generateMobileLayout(),
            "xs":  this.generateMobileLayout(),
            "xxs": this.generateMobileLayout()
        }
        return (
            <div className="bloggrid-container">
            {this.props.blogs.length > 0 &&
            <ResponsiveReactGridLayout className="layout" layouts={layouts} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                       cols={{lg: 12, md: 6, sm: 6, xs: 6, xxs: 6}} useCSSTransforms={true} rowHeight={490} >
                {this.props.blogs.map((post,index) =>
                        <div className="grid-item" key={index}>
                            <div className="blog-fix">
                                <div className="blog-pic-fix">
                                    <Link to={{ pathname: '/blog/' + post.id, }}>
                                        <Picture
                                            blogid={post.id}
                                            is169={true}
                                            type="medium_large"
                                            backgroundsize="cover">
                                        </Picture>
                                    </Link>
                                </div>
                                <Link to={{ pathname: '/blog/' + post.id, }} className="prevent_a">
                                    <div className="blog-title">{post.title.rendered}</div>
                                </Link>

                                <div className="blog-preview-text" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></div>
                                <Link to={{ pathname: '/blog/' + post.id, }} className="readmore">Weiterlesen...</Link>
                            </div>
                        </div>
                )}
            </ResponsiveReactGridLayout>
            }
            </div>
        )
    }
}
