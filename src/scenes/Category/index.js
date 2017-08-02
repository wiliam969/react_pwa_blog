import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchCategoryItems
} from '../../services/session/actions/Category'

import BlogList from './components/index'
import BlogListLazy from './components/index'

import Loading from '../../components/loading'


class Category extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchCategoryItems(this.props))
    }

    render () {
        return (
            <div>
                {
                    this.props.category.isFetchingNew &&
                    <div>
                        <Loading type="reload"></Loading>
                    </div>
                }
                {   this.props.category.isFetching &&
                <div>
                    <Loading type="Pacman">
                    </Loading>
                </div>

                }
                {   this.props.category.didInvalidate &&
                <h1 style={this.FetchingStyle}>Something went Wrong</h1>
                }
                <div>
                    {/*<Quotation></Quotation>*/}
                    <BlogList blogs={this.props.category.items}></BlogList>
                </div>
                {
                    this.props.category.isFetchingLazy &&
                    <Loading type="Spin"></Loading>
                }

                {
                    this.props.category.stopLazyLoad ?
                        <BlogListLazy></BlogListLazy>
                        :
                        <h1>THIS IS THE END MA FRIEND</h1>
                }
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

