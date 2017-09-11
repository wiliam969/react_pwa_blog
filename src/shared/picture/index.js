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
            transition:'opacity 2s',
        }

        if(this.props.thumbnail != null) {
            const thumbnail = this.props.thumbnail
            const type = thumbnail.hasOwnProperty(this.props.type) === true ? this.props.type : 'full'
            const picture_url = thumbnail[type].source_url

            const width = this.props.picture_width === true ? thumbnail[type].width : this.props.width
            const height = this.props.picture_height === true ? thumbnail[type].height : this.props.height
            const backgroundSize = this.props.backgroundsize ? this.props.backgroundsize : "contain"
            console.log(this.props.backgroundsize)
            console.log(backgroundSize)
            const is169 = this.props.is169

            if(is169 === true) {
                Style['backgroundImage'] =  'url(' + picture_url + ')'
                Style['padding'] = 100 + "% 0 0"
                Style['opacity'] = 1
                Style['backgroundSize'] = backgroundSize
            }
            if (picture_url) {
                Style['backgroundImage'] =  'url(' + picture_url + ')'
                Style['width'] = width
                Style['height'] = height
                Style['opacity'] = 1
                Style['backgroundSize'] = backgroundSize
            } else {
                Style['backgroundColor'] = 'grey'
                Style['opacity'] = 0.1
            }
        } else {
            Style['padding'] = 100 + "% 0 0"
            Style['margin'] = 0 + "px -35px"
            Style['backgroundColor'] = 'grey'
            Style['opacity'] = 0.1
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
    let blogid = 1
    let thumbnail = {}
    let type = "thumbnail"
    let backgroundsize = "contain"
    let is169 = false

    blogid = ownProps.blogid
    thumbnail = Object.assign({}, state.Picture.picture_obj)
    type = ownProps.type
    backgroundsize = ownProps.backgroundsize
    is169 = ownProps.is169

    return {
        bid:blogid,
        thumbnail: thumbnail[blogid],
        type:type,
        backgroundsize:backgroundsize,
        is169:is169,
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return({
        sendTheAlert: (e) => { dispatch(fetchPicture(e))}
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Picture)