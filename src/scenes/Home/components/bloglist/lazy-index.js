import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchNextBlogPreviews
} from '../../../../services/session/actions/Home'

import VisibilitySensor from 'react-visibility-sensor'

class BlogListLazy extends Component {

    isActive = true
    pageNumber = 1

    componentDidMount() {
    }
    componentDidUpdate() {
    }
    render() {
        const onChange = (isVisible) => {
            if(isVisible) {
                console.log(isVisible)
                this.props.sendTheAlert(this.pageNumber)
                this.pageNumber++
                console.log(this.pageNumber)
                // this.isActive = false
            } else {
                console.log("not anymore")
            }
            console.log('Element is now %s', isVisible ? 'visible' : 'hidden')
        }
        console.log(this.props.blogs)
        return (

            <VisibilitySensor onChange={onChange} active={this.isActive}>

            </VisibilitySensor>
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
        sendTheAlert: (e) => { dispatch(fetchNextBlogPreviews(e))}
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(BlogListLazy)