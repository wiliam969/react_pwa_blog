import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchLazyBlogPreview
} from '../../homeActions'

import VisibilitySensor from 'react-visibility-sensor'

class BlogListLazy extends Component {

    isActive = this.props.blogs.stopLazyLoad

    // componentDidMount() {
    // }
    // componentDidUpdate() {
    // }
    render() {
        const onChange = (isVisible) => {
            if(isVisible) {
                this.props.sendTheAlert(this.props.blogs.LazyPage)
            }
        }
        return (
            <VisibilitySensor onChange={onChange} active={this.isActive} delayedCall={true}></VisibilitySensor>
        )
    }
}

BlogListLazy.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var blogs = {}

    blogs = Object.assign({}, state.Home)

    return {
        blogs:blogs,
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return({
        sendTheAlert: (e) => { dispatch(fetchLazyBlogPreview(e))}
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogListLazy)
