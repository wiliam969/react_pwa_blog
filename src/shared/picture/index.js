import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchPicture
} from './pictureActions'

import VisibilitySensor from 'react-visibility-sensor'

class Picture extends Component {

    isActive = true

    renderPicture() {

        var Style = {
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width:100 + '%',
            height:200+ 'px',
        }

        if(this.props.thumbnail != null) {
            const thumbnail = this.props.thumbnail
            const type = this.props.type
            const height = this.props.height
            const width = this.props.width
            const picture_url = thumbnail[type].source_url

            if(picture_url) {
                Style['backgroundImage'] =  'url(' + picture_url + ')'
                Style['width'] = width
                Style['height'] = height
            } else {
                Style['backgroundColor'] = 'grey'
            }
        } else {
            Style['backgroundColor'] = 'grey'
        }

        return Style
    }

   render() {
       const onChange = (isVisible) => {
           if(isVisible && this.props.thumbnail == null && this.isActive) {
               this.props.sendTheAlert(this.props)
               this.isActive = false
           }
       }

        return (
            <VisibilitySensor onChange={onChange} active={this.isActive} partialVisibility={true} delayedCall={true}>
                <div style={this.renderPicture()}></div>
            </VisibilitySensor>
        )

    }
}

Picture.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var blogid = 1
    var thumbnail = {}
    var type = "thumbnail"

    const thumbnailExample = thumbnail

    blogid = ownProps.blogid
    thumbnail = Object.assign({}, state.Picture.picture_obj)
    type = ownProps.type

    return {
        bid:blogid,
        thumbnail: thumbnail[blogid],
        type:type
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return({
        sendTheAlert: (e) => { dispatch(fetchPicture(e))}
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Picture)