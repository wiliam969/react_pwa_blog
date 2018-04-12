import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import Picture from '../../shared/picture/index'
import './grid.css'

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class GalleryGrid extends Component{

    generateDesktopLayout() {
        return this.props.items.map((post,index) => {
            let height = 1
            return { x: index * 4 % 12, y: Math.floor(index/3), w: 4, h: height, i: index.toString(), "static":true,} /* Math.floor(index / 1)*/
        })
    }


    generateMobileLayout() {
        return this.props.items.map((post,index) => {
            let height = 3
            return { x: index * 4 % 12, y: index * height, w: 6, h: height, i: index.toString(), "static":true,}
        })
    }

    render() {
        var layouts = {
            // "lg": this.generateDesktopLayout(),
            // "md": this.generateDesktopLayout(),
            // "sm": this.generateMobileLayout(),
            // "xs": this.generateMobileLayout(),
            // "xxs": this.generateMobileLayout(),
            "desktop" : this.generateDesktopLayout(),
            "mobile" : this.generateMobileLayout(),
        }

        /*lg: 1200, md: 960, sm: 768, xs: 480, xxs: 0,
         * lg: 12, md: 6, sm: 6, xs: 6, xxs: 6 */


        return (
            <div>
                {this.props.items.length > 0 &&
                <ResponsiveReactGridLayout className="layout" layouts={layouts} breakpoints={{desktop: 768, mobile: 0}}
                                           cols={{ desktop: 12, mobile: 3}} useCSSTransforms={true} rowHeight={200} >
                    {this.props.items.map((post,index) =>
                        <div className="box" key={index} onClick={ () => this.props.onClickedPicture(this.props,index)}>
                            <Link key={post.id} to={{ pathname: `/gallery/${post.slug}`, state: {modal:true} }} replace>
                                <Picture
                                    featured_media_id={post.featured_media}
                                    type="medium_large"
                                    posttype="gallery"
                                    height="200px"
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