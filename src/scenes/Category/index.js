import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import {
//     fetchBlogPreviews
// } from '../../services/session/actions/Home'

// import Loading from '../../components/loading'


class Category extends Component {

    componentDidMount() {

    }

    render () {
        return (
            <div>
            </div>
        );
    }
}


Category.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state,ownProps) {
    var homedata = { didInvalidate: '', isFetching: '',}

    homedata = Object.assign({}, state.Home)
    return {
        homedata: homedata,
    }
}

export default connect(mapStateToProps)(Category)

