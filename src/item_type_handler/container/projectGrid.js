import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Picture from '../../shared/picture/index'

import {Responsive, WidthProvider} from 'react-grid-layout';

import './projectgrid.css'

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ProjectGrid extends Component {

    generateDesktopLayout(height) {
        return this.props.projectsListSlugs.map((post,index) => {
            return { x: index * 4 % 12, y: Math.floor(index/3) * height, w: 4, h:height, i:index.toString(), "static": true,}
        })
    }

    generateTabletLayout(height) {
        return this.props.projectsListSlugs.map((post,index) => {
            return { x: index * 6 % 12, y: Math.floor(index / 2) * height, w: 6, h: height, i: index.toString(), "static":true,}
        })
    }

    generateMobileLayout(height) {
        return this.props.projectsListSlugs.map((post,index) => {
            return { x: index * 12 % 12, y: Math.floor(index / 1) * height, w: 12, h: height, i: index.toString(), "static":true,}
        })
    }

    getCorrectLink(post) {
        const urlOrDescription = post.meta_data.url_or_description[0]
        const urlTrueFalse = urlOrDescription === "yes" ? true : false

        const project_url = post.meta_data.project_url[0]
        const github_url = post.meta_data.github_url[0]

        let link

        if(!urlTrueFalse && project_url.length !== 0) {
            link = <a  href={project_url}>
                <Picture
                    featured_media_id={post.featured_media}
                    // is169={true}
                    type="medium_large"
                    backgroundsize="cover"
                    height="100%"
                    width="100%">
                </Picture>
                </a>
        } else if (!urlTrueFalse && github_url.length !== 0) {
            link = <a  href={github_url}>
                <Picture
                    featured_media_id={post.featured_media}
                    // is169={true}
                    type="medium_large"
                    backgroundsize="cover"
                    height="100%"
                    width="100%">
                </Picture>
            </a>
        } else {
            link = <Link to={{pathname: '/type/projects/' + post.slug,}}>
                <Picture
                    featured_media_id={post.featured_media}
                    // is169={true}
                    type="medium_large"
                    backgroundsize="cover"
                    height="100%"
                    width="100%">
                </Picture>
            </Link>
        }

        return link
    }

    render() {
        if(this.props.projectsListSlugs) {
            var layouts = {
                "desktop":  this.generateDesktopLayout(2),
                "mobile":  this.generateTabletLayout(1.88),
                "phone":  this.generateMobileLayout(1.5),
            }

            const projects = this.props.projectsbySlug

            return (
                <div className="project-grid-preview-container">
                    {this.props.projectsListSlugs.length > 0 &&
                    <ResponsiveReactGridLayout
                        className="layout"
                        layouts={layouts}
                        breakpoints={{desktop: 768, mobile: 480, phone:0}}
                        cols={{desktop: 12, mobile: 12, phone: 12}}
                        useCSSTransforms={true}
                        rowHeight={178}>

                        {this.props.projectsListSlugs.map((post,index) =>
                            <div className="project-grid-preview-item" key={index}>
                                {this.getCorrectLink(projects[post])}
                            </div>
                        )}
                    </ResponsiveReactGridLayout>
                    }
                </div>
            )
        }
        else
        {
            return(
                <div></div>
            )
        }

    }
}
