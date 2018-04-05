import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    FetchingData,
} from './appActions'

import Menu from '../shared/Menu/index'
import Footer from '../shared/Footer/index'
import Blog from '../blog/index'
import AboutMe from '../aboutme/index'
import Gallery from '../gallery/index'
import BlogSingle from '../blog/blogsingle/index'
import Category from '../category/index'
import Home from '../home/index'

import { BrowserRouter as Router,Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Loading from "../shared/loading/loading";



class AsyncApp extends Component {

    main = {
        height: 100+ 'vh'
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(FetchingData(this.props))
    }

    componentDidUpdate(prevProps) {

    }
    render() {
        const history = createBrowserHistory()
        return(
            <div id="main-container" style={this.main}>
                {this.props.App.isLoading &&
                    <Loading type="Pacman"></Loading>
                }
                {!this.props.App.isLoading &&
                    <div>
                        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
                            <div>
                                <Menu></Menu>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/blog" component={Blog} exact></Route>
                                <Route path="/aboutme" component={AboutMe} aboutme={this.props.aboutme}></Route>
                                <Route path="/gallery" component={Gallery} gallery={this.props.gallery}></Route>
                                <Route path="/blog/:id" component={BlogSingle}></Route>
                                <Route path="/category/:name" component={Category}></Route>
                            </div>
                        </Router>

                        <Footer> </Footer>
                    </div>
                }
            </div>
        )
    }
}

AsyncApp.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state,ownProps) {
    var Blog = { didInvalidate: '', isFetching: '',}
    var App = { isLoading:true}
    var BlogSingle = { didInvalidate: '', isFetching: '', bloginformation: {}}
    var Home = { isfuckiing: true }

        Blog = Object.assign({}, state.Blog)
        App = Object.assign({}, state.App)
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

