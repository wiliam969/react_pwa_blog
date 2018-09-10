import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import {
    fetchLazyProject,
} from './actions/projectSingleActions'

import ProjectSingleRender from './container/projectSingleRender'

// import LazyLoader from '../shared/lazyloader/lazyloader'

/*
        This is the ProjectSingle Class. The Intention behind this class is that it behaves like a wrapper for every single Project Item
        Which means we have an Array of ProjectItems which gets fully displayed and here the get wrapped
        Todo: When i already loaded a couple of single project and after that im going to the projectpreview page and again click on a project its weird it should just load the next project not every item which i already saw

*/
class ProjectSingle extends Component {

    constructor() {
        super()

        this.fetchLazyProjects = this.fetchLazyProjects.bind(this)
        this.fetchpop = this.fetchpop.bind(this)
    }

    componentDidMount() {
        this.fetchpop()
    }
    // Fetching all Projects AFTER the main Project
    fetchLazyProjects(date,id,index) {
        const { dispatch } = this.props
        dispatch(fetchLazyProject(date,id,index))
    }

    fetchpop() {
        this.props.getProjectSingle(this.props)
    }

    render() {
        return (
            <div>
                {/*<Helmet>*/}
                    {/*/!*<meta name="description" content={this.props.Project.items[0].content.rendered}/>*!/*/}
                    {/*/!*<meta name="keywords" content={this.props.Project.items[0].tags}/>*!/*/}
                    {/*/!*<title>{this.props.Project.items[0].title.rendered}</title>*!/*/}
                    {/*<link rel="canonical" href={window.location.href}/>*/}
                {/*</Helmet>*/}

                <ProjectSingleRender projectsbySlug={this.props.projectsbySlug} projectsSingleSlugs={this.props.projectsSingleSlugs} location={this.props.location}/>

                {/*<LazyLoader*/}
                    {/*type={this.fetchLazyProjects}*/}
                    {/*fetch={this.props.ProjectSingle.isFetchingLazy}*/}
                    {/*stop={post.stopLazyLoad}*/}
                    {/*name="Single Project"*/}
                    {/*date={post.date}*/}
                    {/*id={post.id}*/}
                    {/*index={index}>*/}
                {/*</LazyLoader>*/}

                {/*<Comments projectid={post.id}></Comments>*/}
            </div>
        )
    }
}

export default ProjectSingle