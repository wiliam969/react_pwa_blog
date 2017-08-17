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
            width:100 + '%',
            height:200+ 'px',
            transition:'opacity 2s',
        }

        const backgroundSize = this.props.backgroundSize

        Style['backgroundSize'] = backgroundSize

        if(this.props.thumbnail != null) {
            const thumbnail = this.props.thumbnail
            const type = thumbnail.hasOwnProperty(type) ? this.props.type : 'full'

            const picture_url = thumbnail[type].source_url

            const width = this.props.picture_width === true ? thumbnail[type].width : this.props.width
            const height = this.props.picture_height === true ? thumbnail[type].height : this.props.height


            if(picture_url) {
                Style['backgroundImage'] =  'url(' + picture_url + ')'
                Style['width'] = width
                Style['height'] = height
                Style['opacity'] = 1
            } else {
                Style['backgroundColor'] = 'grey'
                Style['opacity'] = 0.1
            }
        } else {
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