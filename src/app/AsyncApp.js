import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import Menu from '../shared/Menu/index'
import Footer from '../shared/Footer/index'
import Blog from '../blog/index'
import AboutMe from '../aboutme/index'
import Gallery from '../gallery/index'
import Projects from '../project/index'
import Home from '../home/index'
import Alert from '../shared/Alert/alert'
import "./asyncApp.css"
import CustomSite from '../site/CustomSite'

import { BrowserRouter ,Route,Redirect,Switch } from 'react-router-dom'
import Loading from "../shared/utilities/loading";

import Api from '../Api'


class AsyncApp extends Component {

    constructor(props)
    {
        super(props)

        const args =
        {
            "before" : "2018-07-21T21:46:49",
            "per_page" : 1,
        }

        // Api.getPosts("posts",null,)
    }
    /**
        Here happens a lot of the magic!
        Were init the whole React Router Dom Magic with a Switch (also to get more perf)
        Also here we have a nice little Alert handler which fetches all the errors =)
        Currently we also have here a Loading class which stops if the router sends a request
        Todo: EVERY Function should be commented aswell as EVERY class
        Todo: We NEED a Socialmedia plugin which has to work with the gallery as well as the blogs
     */
    render() {
        return(
            <div id="app">

                    {this.props.App.isLoading ?
                        <Loading></Loading>
                        :
                        <BrowserRouter basename="" id="">
                            <div>
                                <Helmet>
                                    <meta charSet="utf-8"/>
                                    <meta name="description" content={process.env.REACT_APP_IDB_NAME + "Website"}/>
                                    <meta name="keywords" content="programming,game-dev,app-dev,web-dev,blog,"/>
                                    <meta name="author" content={process.env.REACT_APP_IDB_NAME}/>
                                    <title>{process.env.REACT_APP_IDB_NAME + " -  Home"}</title>
                                    <link rel="canonical" href={process.env.REACT_APP_URI}/>
                                </Helmet>
                                <div id="menu-container">
                                    <Menu/>
                                </div>

                                <Alert/>
                                <Switch id="main-container">
                                    <Route      path="/"                 component={Home} exact/>
                                    <Route      path="/blog"             component={Blog} exact/>
                                    <Route      path="/blog/:slug"       component={Blog}/>
                                    <Route      path="/aboutme"          component={AboutMe}/>
                                    <Route      path="/gallery"          component={Gallery} exact/>
                                    <Route      path="/gallery/:slug"    component={Gallery}/>
                                    <Route      path="/projects"         component={Projects} exact/>
                                    <Route      path="/projects/:slug"   component={Projects}/>
                                    <Route      path="/customsite/:slug"  component={CustomSite}/>
                                    <Redirect   from='*' to='/' />
                                </Switch>
                                    <Footer/>
                            </div>
                        </BrowserRouter>
                }
            </div>
        )
    }
}

AsyncApp.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state,ownProps) {
        var Blog = { }
        var App = { isLoading: true,}
        var BlogSingle = { }
        var Home = { }

        Blog = Object.assign({}, state.Blog)
        App = Object.assign({}, state.AsyncApp)
        BlogSingle = Object.assign({}, state.BlogSingle)
        Home = Object.assign({}, state.Home)

    return {
        Blog: Blog,
        App:App,
        BlogSingle:BlogSingle,
        Home:Home,
    }
}

export default connect(mapStateToProps)(AsyncApp)

