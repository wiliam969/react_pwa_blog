import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Picture from '../../shared/picture/index'
import './grid.css'

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class GalleryGrid extends Component{

    constructor(props) {
        super(props)

        this.state = {
            margin: [10,10]
        }

        this.LayoutFix = this.LayoutFix.bind(this)
    }

    generateLayout(height) {
        const height_adjustment = height !== 1 ? height : 1
        return this.props.items.map((post,index) => {
            return { x: index * 4 % 12, y: Math.floor(index/3) * height_adjustment, w: 4, h:height, i:index.toString(), "static": true,}
        })
    }

    LayoutFix(containerWidth,margin,cols,containerPadding) {
        if(containerWidth <= 960 && containerWidth > 480) {
            this.setState({
                margin: [5,5]
            })
        } else if (containerWidth <= 480) {
            this.setState({
                margin: [2,2]
            })
        }
    }


    render() {
        var layouts = {
            // "lg": this.generateDesktopLayout(),
            // "md": this.generateDesktopLayout(),
            // "sm": this.generateMobileLayout(),
            // "xs": this.generateMobileLayout(),
            // "xxs": this.generateMobileLayout(),
            "phone": this.generateLayout(0.75),
            "desktop" : this.generateLayout(2),
            "mobile" : this.generateLayout(1),
        }

        return (
            <div>
                {this.props.items.length > 0 &&
                <ResponsiveReactGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={{desktop: 768, mobile: 480, phone:0}}
                    cols={{ desktop: 12, mobile: 12, phone:12}}
                    useCSSTransforms={true}
                    margin={this.state.margin}
                    onWidthChange={this.LayoutFix} >
                    {this.props.items.map((post,index) =>
                        <div className="box" key={index} onClick={ () => this.props.onClickedPicture(this.props,index)}>
                            <Link key={post.id} to={{ pathname: `/gallery/${post.slug}`, state: {modal:true} }} replace>
                                <Picture
                                    featured_media_id={post.featured_media}
                                    type="medium_large"
                                    posttype="gallery"
                                    height="100%"
                                    width="100%"
                                    backgroundsize="cover">
                                </Picture>
                            </Link>
                        </div>
                    )}
                </ResponsiveReactGridLayout>
                }
            </div>
        )
    }
}