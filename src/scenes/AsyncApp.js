import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {
    // requestBlogPreview,
    // receiveBlogpreview,
    fetchcorrectSite
} from '../services/session/actions/AsyncApp'

import Menu from '../components/Menu/index'
import Footer from '../components/Footer/index'
import Home from './Home/index'
import AboutMe from './AboutMe/index'
import Gallery from './Gallery/index'
import BlogSingle from './Blog/index'

import { BrowserRouter as Router,Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'



class AsyncApp extends Component {

    main = {
        height: 100+ 'vh'
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {

    }
    render() {
        const history = createBrowserHistory()
        return(

            <div id="main-container" style={this.main}>
                <Router history={history}>
                    <div>
                        <Menu></Menu>
                        <Route path="/home" render={() => <Home homedata={this.props.homedata}></Home>}></Route>
                        <Route path="/aboutme" component={AboutMe} aboutme={this.props.aboutme}></Route>
                        <Route path="/gallery" component={Gallery} gallery={this.props.gallery}></Route>
                        <Route path="/blog/:id" component={BlogSingle} blog={this.props.Blog}></Route>
                        {/*<Route path="/blog/:id" render={() => <BlogSingle blogsingle={this.props}></BlogSingle>}></Route>*/}
                    </div>
                </Router>

                <Footer></Footer>
            </div>
        )
    }
}

AsyncApp.propTypes = {
    // blogs: PropTypes.array
}

function mapStateToProps(state,ownProps) {
    var homedata = { didInvalidate: '', isFetching: '',}
    var AyncApp = { isHome: '', isGallery: '', isAboutMe:''}
    var Blog = { didInvalidate: '', isFetching: '', bloginformation: {}}
        homedata = Object.assign({}, state.Home)
        AsyncApp = Object.assign({}, state.AsyncApp)
        Blog = Object.assign({}, state.Blog)
    return {
        homedata: homedata,
        AsyncApp:AyncApp,
        Blog:Blog
    }
}

export default connect(mapStateToProps,fetchcorrectSite())(AsyncApp)

