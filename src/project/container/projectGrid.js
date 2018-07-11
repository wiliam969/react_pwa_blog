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
            link = project_url
        } else if (!urlTrueFalse && github_url.length !== 0) {
            link = github_url
        } else {
            link = '/projects/' + post.slug
        }

        return link
    }

    render() {
        var layouts = {
            "desktop":  this.generateDesktopLayout(2),
            "mobile":  this.generateTabletLayout(2),
            "phone":  this.generateMobileLayout(2),
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
                        <div className="project-grid-preview-fix">
                            <div className="project-grid-preview-pic-fix">
                                <a  href={this.getCorrectLink(projects[post])}>
                                    <Picture
                                        featured_media_id={projects[post].featured_media_id}
                                        is169={true}
                                        type="medium_large"
                                        backgroundsize="cover">
                                    </Picture>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </ResponsiveReactGridLayout>
            }
            </div>
        )
    }
}
