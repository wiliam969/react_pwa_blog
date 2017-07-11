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
                {/*<p>{ this.thumbnail.link}</p>*/}

                <p>a Selfie</p>
                {/*<p>{ this.props.pictures[1].link }</p>*/}
            </div>
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

export default connect(mapStateToProps,fetchPicture)(Thumbnail)