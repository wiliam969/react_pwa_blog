import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchNewProjectPreview,
    fetchLazyProjectPreview
} from './actions/projectListActions'

import Loading from '../shared/utilities/loading'
import LoadingBtn from '../shared/utilities/loading-btn'
import LazyLoader from '../shared/lazyloader/lazyloader'
import ProjectGrid from './container/projectGrid'

// import Quotation from './quotation/index'

import './project.css'

class ProjectList extends Component {

    constructor(props) {
        super(props)

        this.fetchNewPosts = this.fetchNewPosts.bind(this)
        this.fetchLazyPosts = this.fetchLazyPosts.bind(this)
        this.getwthf = this.getwthf.bind(this)
    }

    componentDidMount() {
        this.getwthf()
    }

    fetchNewPosts() {
        const { dispatch } = this.props
        dispatch(fetchNewProjectPreview(this.props))
    }

    fetchLazyPosts() {
        const { dispatch } = this.props
        dispatch(fetchLazyProjectPreview(this.props.Project.LazyPage))
    }

    getwthf() {
        this.props.getProjectList(this.props)
    }


    /*
    Todo: Here we have a to the current state random error with the FetchNewProjects function idk what its causing but it seems to be a 404 error
     */
    render () {
        return (
            <div className="project-list-container container">
                <div className="project-list-wrapper">
                    {/*<div className="project-list-loading-container" id="project-list-loading-container">*/}
                        {/*{this.props.Project.isFetchingNew*/}
                            {/*?*/}
                            {/*<Loading type="reload"></Loading>*/}
                            {/*:*/}
                            {/*<LoadingBtn name="Search for new Projects" onClick={this.fetchNewPosts}></LoadingBtn>*/}
                        {/*}*/}
                    {/*</div>*/}
                    <div className="project-list-container">
                        <ProjectGrid projectsbySlug={this.props.projectsbySlug} projectsListSlugs={this.props.projectsListSlugs} location={this.props.location}></ProjectGrid>

                        {/*<LazyLoader type={this.fetchLazyPosts} fetch={this.props.Project.isFetchingLazy} stop={this.props.Project.stopLazyLoad} name="Project"></LazyLoader>*/}
                    </div>
                </div>
            </div>
        );
    }
}

ProjectList.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state,ownProps) {
    var project = { didInvalidate: '', isFetching: '',}

    project = Object.assign({}, state.Project)
    return {
        Project: project,
    }
}

export default ProjectList

