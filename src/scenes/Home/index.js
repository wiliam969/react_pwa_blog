import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    // requestBlogPreview,
    // receiveBlogpreview,
    fetchBlogPreviews
} from '../../services/session/actions/Home'

import Loading from '../../components/loading'
import BlogList from './components/bloglist/index.js'
import BlogListLocal from './components/bloglist/local-index'
import BlogListLazy from './components/bloglist/lazy-index'

// import inView from 'in-view'

class Home extends Component {

    FetchingStyle = {
        color:"red",
        fontSize:"40px",
        fontWeight:900,
    }

    constructor(props) {
        super(props)
        console.log("im Home")
    }

    componentDidMount() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchBlogPreviews(this.props))
    }

    render () {
        return (
            <div>
                {   this.props.homedata.isFetchingLocal &&
                    <div>
                        <Loading></Loading>
                        <h1>FETCHING LOCAL DATA</h1>
                    </div>
                }
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
                    this.props.homedata.didInvalidateLocal &&
                    <div>
                        <h1>YOUR FIRST VISIT? JUST RELOAD PAGE PLZ GG WP</h1>
                    </div>
                }
                {
                    !this.props.homedata.isFetching && !this.props.homedata.didInvalidate &&
                        <div>
                            <p>What up Mate dis is not the OP Home</p>
                            {/*<Quotation></Quotation>*/}
                            <BlogList blogs={this.props.homedata.items}></BlogList>
                        </div>
                }
                {
                    this.props.homedata.didInvalidateLazy &&
                        <h1>WHAT THE LAZY LOAD IS BROKEN GG WP</h1>
                }
                {
                    (this.props.homedata.isFetching || this.props.homedata.didInvalidate) && !this.props.homedata.isFetchingLocal && !this.props.homedata.didInvalidateLocal &&
                    <div>
                        <p>What up Mate dis is not the OP Home</p>
                        <h1>THIS IS LOCAL DATA Might be depreciated</h1>
                        {/*<Quotation></Quotation>*/}
                        <BlogListLocal blogs={this.props.homedata.itemsLocal}></BlogListLocal>
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

