import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchPicture
} from '../../../redux/actions/Picture'
import VisibilitySensor from 'react-visibility-sensor'

class Picture extends Component {

    constructor(props) {
        super(props)

        whatedefuck = this.props.blogid
        console.log("whay am i here wtf")
    }

    onChange (isVisible) {
        fetchPicture(1)
        console.log('Element is now %s', isVisible ? 'visible' : 'hidden')
    }

    render() {

        return (
            <VisibilitySensor onChange={this.onChange}>
                <div>
                    <p>Helo its me</p>

                    <p>a Selfie</p>
                </div>
            </VisibilitySensor>
        )
    }
}

Picture.propTypes = {
    dispatch: PropTypes.func
}

var whatedefuck = "4"

const mapStateToProps = (state) => {
    var picturedata = { didInvalidate: '', isFetching: '',}

    picturedata = Object.assign({}, state.Picture)
    return {
        picturedata: picturedata,
        data: state,
    }
}

export default connect(mapStateToProps,fetchPicture)(Picture)