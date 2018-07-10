import React, { Component } from 'react'
import Picture from '../../shared/picture/index'
import './project.css'

export default class ProjectSingleRender extends Component {

    render() {
        const projects = this.props.projectsbySlug
        return (
            <div className="project-single-container">
                {this.props.projectsSingleSlugs.length > 0 &&
                    this.props.projectsSingleSlugs.map((post,index) =>
                        <div className="project-single-wrapper" key={index}>
                            <Picture featured_media_id={projects[post].featured_media_id} type="full" height="50vh" width="100%" backgroundsize="cover"></Picture>
                            <div className="project-single-content-wrapper container">
                                <div className="project-single-content-wrapper-fix">
                                    <p className="project-single-date">{new Date(projects[post].date).toLocaleDateString()}</p>
                                    <div className="project-single-title">{projects[post].title}</div>
                                    <div className="project-single-text" dangerouslySetInnerHTML={{__html: projects[post].content}}></div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}
