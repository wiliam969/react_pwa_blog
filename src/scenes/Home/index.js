import React, { Component } from 'react'
import BlogList from './components/bloglist/index.js'
import { connect } from 'react-redux'
import {
    // requestBlogPreview,
    // receiveBlogpreview,
    fetchBlogPreviews
} from '../../redux/actions/Home'

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
    }

    render () {
        return (
            <div>
                {   this.props.homedata.isFetching &&
                <h1 style={this.FetchingStyle}>im Fetching GUYS hold on dont stress me !</h1>
                }
                {   this.props.homedata.didInvalidate &&
                    <h1 style={this.FetchingStyle}>LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }
                {
                    !this.props.homedata.isFetching && !this.props.homedata.didInvalidate &&
                        <div>
                            <p>What up Mate dis is not the OP Home</p>
                            {/*<Quotation></Quotation>*/}
                            <BlogList blogs={this.props.homedata.items}></BlogList>
                        </div>
                }
            </div>
        );
    }
}


Home.propTypes = {
    // blogs: PropTypes.array
}

function mapStateToProps(state,ownProps) {
    var homedata = { didInvalidate: '', isFetching: '',}

    homedata = Object.assign({}, state.Home)
    return {
        homedata: homedata,
    }
}

export default connect(mapStateToProps,fetchBlogPreviews)(Home)

