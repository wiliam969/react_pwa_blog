import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import Menu from '../shared/Menu/index'
import Footer from '../shared/Footer/index'
import Blog from '../blog/index'
import AboutMe from '../aboutme/index'
import Gallery from '../gallery/index'
import BlogSingle from '../blog/blogsingle/index'
import Category from '../category/index'
import Home from '../home/index'
import Alert from '../shared/Alert/alert'

import { Router,BrowserRouter ,Route,Redirect,Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Loading from "../shared/utilities/loading";


class AsyncApp extends Component {

    main = {
        height: 100+ 'vh'
    }


    /*
        Here happens a lot of the magic!
        Were init the whole React Router Dom Magic with a Switch (also to get more perf)
        Also here we have a nice little Alert handler which fetches all the errors =)
        Currently we also have here a Loading class which stops if the router sends a request
        Todo: EVERY Function should be commented aswell as EVERY class
        Todo: We NEED a Socialmedia plugin which has to work with the gallery as well as the blogs
     */
    render() {
        const history = createBrowserHistory()
        return(
            <div id="app" style={this.main}>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <meta name="description" content="Kerstin Witte Website"/>
                    <meta name="keywords" content="Erziehung,haha,pepe"/>
                    <meta name="author" content="Kerstin Witte"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>{process.env.REACT_APP_IDB_NAME + " -  Home"}</title>
                    <link rel="canonical" href="localhost:3000/"/>
                </Helmet>
                {this.props.App.isLoading ?
                    <Loading></Loading>
                    :
                    <BrowserRouter basename="" id="">
                        <div>
                            <div id="menu-container">
                                <Menu></Menu>
                            </div>
                            <Alert/>
                            <Switch id="main-container">
                                <Route path="/" component={Home} exact></Route>
                                <Route path="/blog" component={Blog} exact></Route>
                                <Route path="/aboutme" component={AboutMe}></Route>
                                <Route path="/gallery" component={Gallery} exact></Route>
                                <Route path="/gallery/:slug" component={Gallery}></Route>
                                <Route path="/blog/:slug" component={BlogSingle}></Route>
                                <Route path="/category/:name" component={Category}></Route>
                                <Redirect from='*' to='/' />
                                <Footer/>
                            </Switch>
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

