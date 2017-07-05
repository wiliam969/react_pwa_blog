import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
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


var whatedefuck = "4"

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps,fetchPicture(whatedefuck))(Picture)