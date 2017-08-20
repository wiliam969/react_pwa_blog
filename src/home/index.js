import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchNewBlogPreview,
    fetchBlogPreviews
} from './homeActions'

import Loading from '../shared/loading/loading'
import LazyLoader from '../shared/lazyloader/lazyloader'
import BlogGrid from '../shared/blog/bloggrid'

import Quotation from './quotation/index'

import './home.css'

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
        if(this.props.homedata.items.length === 0) {
            const { dispatch } = this.props
            dispatch(fetchBlogPreviews(this.props))
        }

        setInterval(function() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }

            document.body.style.backgroundColor = color //() to execute the function!
        }, 3000);
    }

    fetchNewPosts() {
        const { dispatch } = this.props
        dispatch(fetchNewBlogPreview(this.props))
    }

    render () {





        return (
            <div classname="home-container">
                <button className="load-blogs-btn" onClick={this.fetchNewPosts}>Search for new Blogs</button>
                {
                    this.props.homedata.isFetchingNew &&
                        <div className="loading-container">
                            <Loading type="reload"></Loading>
                        </div>
                }
                {   this.props.homedata.isFetching &&
                    <div className="loading-container">
                        <Loading type="Pacman">
                        </Loading>
                    </div>

                }
                {   this.props.homedata.didInvalidate &&
                    <h1 style={this.FetchingStyle}>Something went Wrong</h1>
                }
                    <div className="data-container">
                        <Quotation></Quotation>
                        <div className="home-smoke"></div>
                        <BlogGrid blogs={this.props.homedata.items}></BlogGrid>
                        {/*<BlogList blogs={this.props.homedata.items}></BlogList>*/}
                    </div>
                {
                    this.props.homedata.isFetchingLazy &&
                    <Loading type="Spin"></Loading>
                }

                {
                    this.props.homedata.stopLazyLoad ?
                        <LazyLoader type="Home"></LazyLoader>
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



export default connect(mapStateToProps)(Home)

