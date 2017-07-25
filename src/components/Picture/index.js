import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchPicture
} from '../../services/session/actions/Picture'

import VisibilitySensor from 'react-visibility-sensor'



class Picture extends Component {

    thummbnail = this.props.picturedata

    BackgroundStyle = {

    }

    //constructor(props) {
    //    super(props)
    //}



    onChange (isVisible,blogid) {
        this.props.dispatch.fetchPicture()
    }

    render() {

        return (
            <VisibilitySensor onChange={this.onChange}>
                <div>
                    <p>Helo its me</p>
                    <p>{ this.props.link } </p>

                    <p>a Selfie</p>
                </div>
            </VisibilitySensor>
        )
    }
}

Picture.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
    var link = {}

    link = Object.assign({}, state.Picture)

    return {
        link: link.img_link,
        data: state,
    }
}

export default connect()(Picture)