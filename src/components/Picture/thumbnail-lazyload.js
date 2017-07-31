import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchPicture
} from '../../services/session/actions/Picture'

import VisibilitySensor from 'react-visibility-sensor'

class Thumbnail extends Component {

    isActive = true

    renderLink() {

        const thumbnail = this.props.thumbnail
        const arr_thumbnail = []

        for(var i in thumbnail)
            arr_thumbnail.push(thumbnail[i])

        if(arr_thumbnail[21] == null){

        } else {
            var Style = null

            return Style = {
                backgroundColor:"grey",
                backgroundImage: 'url(' + arr_thumbnail[21]['sizes']['thumbnail']['source_url'] + ')',
                backgroundPosition: 'center center',
                width:200 + 'px',
                height:200+ 'px',
            }
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

    constructor(props) {
        super(props)
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
                        <div style={this.renderLink()}>{  }</div>
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

Thumbnail.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var link = {}
    var blogid = 1
    var thumbnail = { link: "saqasd", }

    blogid = ownProps.blogid
    link = Object.assign({}, state.Picture)

    thumbnail = Object.assign({}, state.Picture.picture_obj)

    return {
        bid:blogid,
        thumbnail: thumbnail[blogid],
        data: state,
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return({
        sendTheAlert: (e) => { dispatch(fetchPicture(e))}
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(Thumbnail)