import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchPicture
} from '../../../redux/actions/Picture'

class Thumbnail extends Component {

    constructor(props) {
        super(props)
    }

   render() {

        return (
            <div>
                <p>Helo its me</p>
                {/*<p>{ this.props.link } </p>*/}

                <p>a Selfie</p>
            </div>
        )
    }
}

Thumbnail.propTypes = {
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

export default connect(mapStateToProps,fetchPicture)(Thumbnail)