import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import ReactGridLayout from 'react-grid-layout'
import Picture from '../../shared/picture/index'

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class GalleryGrid extends Component{

    generateDesktopLayout() {
        return this.props.items.map((post,index) => {
            let height = 1
            let cols = 4
            return { x: index * cols % 12, y: Math.floor(index / cols) * height, w: cols, h: height, i: index.toString(), "static":true,}
        })
    }

    generateMobileLayout() {
        return this.props.items.map((post,index) => {
            let height = 3
            return { x: index * 6 % 12, y: index * height, w: 6, h: height, i: index.toString(), "static":true,}
        })
    }

    render() {
        var layouts = {
            "lg": this.generateDesktopLayout(),
            "md": this.generateMobileLayout,
            "sm": this.generateMobileLayout,
            "xs": this.generateMobileLayout(),
            "xxs": this.generateMobileLayout()
        }
        return (
            <div>
                {this.props.items.length > 0 &&
                <ResponsiveReactGridLayout className="layout" layouts={layouts} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                                           cols={{lg: 12, md: 6, sm: 6, xs: 6, xxs: 6}} useCSSTransforms={true} rowHeight={200} >
                    {this.props.items.map((post,index) =>
                        <div className="box" key={index} onClick={ () => this.props.ClickedPicture(post.id)}>
                            <Picture blogid={post.id} type="thumbnail" posttype="gallery" height="200px" width="100%"></Picture>
                        </div>
                    )}
                </ResponsiveReactGridLayout>
                }
            </div>
        )
    }
}