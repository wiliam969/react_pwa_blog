import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router-dom'

import {fetchProjectPreviews, fetchLazyProjectPreview} from './actions/projectListActions'
import { fetchProjectSingle } from './actions/projectSingleActions'

import Loading from '../shared/utilities/loading'
import LazyLoader from '../shared/lazyloader/lazyloader'

import ProjectList from './projectList'
import ProjectSingle from './projectSingle'

/*
        This is the ProjectSingle Class. The Intention behind this class is that it behaves like a wrapper for every single Project Item
        Which means we have an Array of ProjectItems which gets fully displayed and here the get wrapped
        Todo: When i already loaded a couple of single project and after that im going to the projectpreview page and again click on a project its weird it should just load the next project not every item which i already saw

*/

class Project extends Component {

    constructor() {
        super()

        this.getProjectList = this.getProjectList.bind(this)
        this.getProjectSingle = this.getProjectSingle.bind(this)
    }

    componentDidMount() {
        this.getProjectList()
        // this.getProjectSingle()
        // const { dispatch } = this.props
        // const slug = this.props.match.params.slug
        // this.props.Project.projectsbySlug[slug] !== slug && dispatch(fetchProjectSingle(this.props))
        // this.props.Project.projectsListSlugs.length === 0 && !this.props.match.params.slug && dispatch(fetchProjectPreviews(this.props))
    }

    getLazyProjectList(page) {
        this.props.getLazyProjectList(page)
    }

    getProjectList() {
        if(this.props.Project.projectsListSlugs.length === 0 && !this.props.match.params.slug) {
            this.props.getProjectList(this.props)
        }
    }

    getProjectSingle() {
        const slug = this.props.match.params.slug

        const checkifExists = this.props.Project.projectsSingleSlugs.some(x => x === this.props.match.params.slug)

        if(this.props.Project.projectsSingleSlugs.length === 0 || !this.props.Project.isFetching && this.props.match.params.slug && !checkifExists) {
            this.props.getProjectSingle(this.props)
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Project</title>
                    <link rel="canonical" href={window.location.href}/>
                </Helmet>

                {   this.props.Project.didInvalidate &&
                    <p>Something went Wrong</p>
                }

                { this.props.Project.isFetching ?
                    <Loading></Loading>
                    :
                    <div className="project-container">
                        {this.props.match.params.slug ?
                            <ProjectSingle getProjectSingle={this.getProjectSingle} projectsbySlug={this.props.Project.projectsbySlug} projectsSingleSlugs={this.props.Project.projectsSingleSlugs} location={this.props.location} history={this.props.history} match={this.props.match}/>
                            :
                            <div>
                                <ProjectList getProjectList={this.getProjectList} projectsbySlug={this.props.Project.projectsbySlug} projectsListSlugs={this.props.Project.projectsListSlugs} location={this.props.location} history={this.props.history} match={this.props.match}/>
                                <LazyLoader
                                    type={ () => {this.getLazyProjectList(this.props.Project.LazyPage)}}
                                    fetch={this.props.Project.isFetchingLazy}
                                    stop={this.props.Project.stopLazyLoad}
                                    name="Project">
                                </LazyLoader>
                            </div>

                        }
                    </div>
                }




            </div>
        )
    }
}

Project.propTypes = {
    dispatch: PropTypes.func,
    getProjectList: PropTypes.func.isRequired,
    getProjectSingle: PropTypes.func.isRequired,
    getLazyProjectList: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    var Project = { didInvalidate: '', isFetching: '', items: {}}

    Project = Object.assign({}, state.Project)

    return {
        Project: Project,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjectList: (props) => { dispatch(fetchProjectPreviews(props))},
        getProjectSingle: (props) => { dispatch(fetchProjectSingle(props))},
        getLazyProjectList: (props) => { dispatch(fetchLazyProjectPreview(props))},
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Project))