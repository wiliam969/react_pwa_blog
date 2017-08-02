import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchNewBlogPreview,
    fetchBlogPreviews
} from '../../services/session/actions/Home'

// import Loading from '../../components/loading'


class Category extends Component {

    constructor(props) {
        super(props)
    }

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

function mapDispatchToProps (dispatch) {
    return {
        actions:
            bindActionCreators({fetchBlogPreviews},dispatch)
    }
}



export default connect(mapStateToProps)(Category)

