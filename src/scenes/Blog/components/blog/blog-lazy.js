import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLazyBlog } from '../../../../services/session/actions/Blog'

import VisibilitySensor from 'react-visibility-sensor'

class LazyBlogItemLoad extends Component {

    isActive = true

    constructor(props) {
        super(props)
    }

    render() {
        const onChange = (isVisible) => {
            if(isVisible && this.isActive == true) {
                this.props.sendTheAlert(this.props)
                this.isActive = false
                console.log(this.isActive)
            }
        }
        return (
            <div>
            <VisibilitySensor onChange={onChange} active={this.isActive} partialVisibility={true}>
            </VisibilitySensor>
            </div>
        );
    }
}

LazyBlogItemLoad.propTypes = {
}

LazyBlogItemLoad.defaultProps = {
}

const mapStateToProps = (state, ownProps) => {
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return({
        sendTheAlert: (e) => { dispatch(fetchLazyBlog(e))}
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(LazyBlogItemLoad)