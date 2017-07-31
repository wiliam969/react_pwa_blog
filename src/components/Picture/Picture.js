import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchPicture
} from '../../services/session/actions/Picture'

import VisibilitySensor from 'react-visibility-sensor'

class Picture extends Component {

    isActive = true

    constructor(props) {
        super(props)
    }

    renderPicture() {

        if(this.props.thumbnail != null) {
            const thumbnail = this.props.thumbnail
            const type = this.props.type
            const picture_url = thumbnail[type].source_url

            var Style = {
                backgroundImage: 'url(' + picture_url + ')',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                width:100 + '%',
                height:200+ 'px',
            }
            return Style
        }
    }

    renderDefaultThumbnail() {
        var Style = null

        return Style = {
            backgroundColor:"grey",
            width: 100 + "%",
            height: 200 + "px",
        }
    }

   render() {
       const onChange = (isVisible) => {
           if(isVisible) {
               this.props.sendTheAlert(this.props)
               this.isActive = false
           } else {
               console.log("not anymore")
           }
           console.log('Element is now %s', isVisible ? 'visible' : 'hidden')
       }

        return (
            <VisibilitySensor onChange={onChange} active={this.isActive}>
                <div>
                    {this.props.thumbnail != 0 &&
                    <div>
                        <div style={this.renderPicture()}>{  }</div>
                    </div>
                    }
                    {this.props.thumbnail == null &&
                    <div>
                        <div style={this.renderDefaultThumbnail()}></div>
                    </div>
                    }
                </div>
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