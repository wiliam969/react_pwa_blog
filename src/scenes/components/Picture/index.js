import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchPicture
} from '../../../redux/actions/Picture'

class Picture extends Component {
    constructor(props) {
        super(props)

        whatedefuck = this.props.blogid
        console.log("whay am i here wtf")
    }

    render() {
        return (
            <div>
                <p>Helo its me</p>

                <p>a Selfie</p>
            </div>
        )
    }
}


var whatedefuck = "4"

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps,fetchPicture(whatedefuck))(Picture)