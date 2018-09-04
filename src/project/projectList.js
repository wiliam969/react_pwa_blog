import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    fetchNewProjectPreview,
    fetchLazyProjectPreview
} from './actions/projectListActions'
import ProjectGrid from './container/projectGrid'
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
                    <h1 id="project-list-h1">Here are some not all =) public projects i contributed/worked at...</h1>
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
                    </div>
                </div>
            </div>
        );
    }
}

ProjectList.propTypes = {
    dispatch: PropTypes.func
}

export default ProjectList

