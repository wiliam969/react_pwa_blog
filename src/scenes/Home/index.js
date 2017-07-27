import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchAfterBlogPreview,
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
        console.log("im Home")
        this.fetchnewPosts = this.fetchnewPosts.bind(this);

    }

    componentDidMount() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchBlogPreviews(this.props))
    }

    fetchnewPosts() {
            const { dispatch, ownProps } = this.props
            dispatch(fetchAfterBlogPreview(this.props))
    }

    render () {
        return (
            <div>
                <button onClick={this.fetchnewPosts}>CLICK ME SENPAI</button>
                {   this.props.homedata.isFetching &&
                    <div>
                        <Loading>
                        <h1 style={this.FetchingStyle}>im Fetching GUYS hold on dont stress me !</h1>
                        </Loading>
                    </div>

                }
                {   this.props.homedata.didInvalidate &&
                    <h1 style={this.FetchingStyle}>LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }
                {
                    !this.props.homedata.didInvalidate &&
                        <div>
                            <p>What up Mate dis is not the OP Home</p>
                            {/*<Quotation></Quotation>*/}
                            <BlogList blogs={this.props.homedata.items}></BlogList>
                        </div>
                }
                <BlogListLazy></BlogListLazy>
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

