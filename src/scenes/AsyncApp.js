import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    FetchingData,
} from '../services/session/actions/App'

import Menu from '../components/Menu/index'
import Footer from '../components/Footer/index'
import Home from './Home/index'
import AboutMe from './AboutMe/index'
import Gallery from './Gallery/index'
import Blog from './Blog/index'
import Category from './Category/index'

import { BrowserRouter as Router,Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Loading from "../components/loading";



class AsyncApp extends Component {

    main = {
        height: 100+ 'vh'
    }

    componentDidMount() {
        const { dispatch, ownProps } = this.props
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
                        <Router history={history}>
                            <div>
                                <Menu></Menu>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/aboutme" component={AboutMe} aboutme={this.props.aboutme}></Route>
                                <Route path="/gallery" component={Gallery} gallery={this.props.gallery}></Route>
                                <Route path="/blog/:id" component={Blog}></Route>
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
    var homedata = { didInvalidate: '', isFetching: '',}
    var App = { isLoading:true}
    var Blog = { didInvalidate: '', isFetching: '', bloginformation: {}}

        homedata = Object.assign({}, state.Home)
        App = Object.assign({}, state.App)
        Blog = Object.assign({}, state.Blog)

    return {
        homedata: homedata,
        App:App,
        Blog:Blog
    }
}

export default connect(mapStateToProps)(AsyncApp)

