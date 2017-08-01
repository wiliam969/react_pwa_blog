import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchNewBlogPreview,
    fetchBlogPreviews
} from '../../services/session/actions/Home'

import Loading from '../../components/loading'
import BlogList from './components/bloglist/index.js'
import BlogListLazy from './components/bloglist/lazy-index'

class Home extends Component {

    FetchingStyle = {
        color:"red",
        fontSize:"40px",
        fontWeight:900,
    }

    constructor(props) {
        super(props)
        this.fetchNewPosts = this.fetchNewPosts.bind(this);

    }

    componentDidMount() {
        if(this.props.homedata.items.length == 0) {
            const { dispatch, ownProps } = this.props
            dispatch(fetchBlogPreviews(this.props))
        }
    }

    fetchNewPosts() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchNewBlogPreview(this.props))
    }

    render () {

        return (
            <div>
                <button onClick={this.fetchNewPosts}>Search for new Blogs</button>
                {
                    this.props.homedata.isFetchingNew &&
                        <div>
                            <Loading type="reload"></Loading>
                        </div>
                }
                {   this.props.homedata.isFetching &&
                    <div>
                        <Loading type="Pacman">
                        </Loading>
                    </div>

                }
                {   this.props.homedata.didInvalidate &&
                    <h1 style={this.FetchingStyle}>Something went Wrong</h1>
                }
                    <div>
                        {/*<Quotation></Quotation>*/}
                        <BlogList blogs={this.props.homedata.items}></BlogList>
                    </div>
                {
                    this.props.homedata.isFetchingLazy &&
                    <Loading type="Spin"></Loading>
                }

                {
                    this.props.homedata.stopLazyLoad ?
                        <BlogListLazy></BlogListLazy>
                        :
                        <h1>THIS IS THE END MA FRIEND</h1>
                }

            </div>
        );
    }
}


Home.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state,ownProps) {
    var homedata = { didInvalidate: '', isFetching: '',}

    homedata = Object.assign({}, state.Home)
    return {
        homedata: homedata,
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions:
        bindActionCreators({fetchBlogPreviews},dispatch)
    }
}



export default connect(mapStateToProps)(Home)

