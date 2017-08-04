import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchCategoryItems
} from './categoryActions'

import BlogGrid from '../shared/blog/bloggrid'
import LazyLoader from '../shared/lazyloader/lazyloader'
import BlogListLazy from './components/blogListLazy'

import Loading from '../shared/loading/loading'


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
                    <BlogGrid blogs={this.props.category.items}></BlogGrid>
                </div>
                {
                    this.props.category.isFetchingLazy &&
                    <Loading type="Spin"></Loading>
                }

                {
                    !this.props.category.stopLazyLoad ?
                        <LazyLoader type="Category" category={this.props}></LazyLoader>
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

