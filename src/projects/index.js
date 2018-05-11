import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import LazyLoader from '../shared/lazyloader/lazyloader'

/*
*/
class Projects extends Component {

    componentDidMount() {
    }

    render() {
        return(
            <div className="container gallery-container">
                <Helmet>
                    <title>Projects</title>
                    <link rel="canonical" href={window.location.href}/>
                </Helmet>

                <div className="gallery-wrapper">
                    <div className="gallery-loading-container"/>
                    {this.props.projects.didInvalidate &&
                        <p>Something went wrong! Sorry.</p>
                    }

                    {!this.props.projects.isFetching && !this.props.projects.didInvalidate &&
                    <div>
                    </div>
                    }
                    {/*<LazyLoader*/}
                        {/*type={ () => {this.fetchLazyGallery(this.props.gallery.LazyPage)}}*/}
                        {/*fetch={this.props.gallery.isFetchingLazy}*/}
                        {/*stop={this.props.gallery.stopLazyLoad}*/}
                        {/*name="Gallery">*/}
                    {/*</LazyLoader>*/}
                </div>
            </div>
        );
    }
}





Projects.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state) {
    var projects = { didInvalidate: '', isFetching: '',}

    projects = Object.assign({}, state.Projects)
    return {
        projects: projects,
    }
}

//export default connect(mapStateToProps)(Projects)