import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchCategoryItems
} from '../../services/session/actions/Category'

// import Loading from '../../components/loading'


class Category extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchCategoryItems(this.props))
    }

    render () {
        return (
            <div>
                hey this is category
            </div>
        );
    }
}


Category.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state) {
    var category = { didInvalidate: '', isFetching: '',}
    var App = {}

    category = Object.assign({}, state.Category)
    App = Object.assign({}, state.AsyncApp)
    return {
        category: category,
        app: App,
    }
}

export default connect(mapStateToProps)(Category)

