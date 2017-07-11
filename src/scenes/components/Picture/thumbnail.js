import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchPicture
} from '../../../redux/actions/Picture'

class Thumbnail extends Component {

    renderLink() {

        const thumbnail = this.props.thumbnail
        const arr_thumbnail = []

        for(var i in thumbnail)
            arr_thumbnail.push([i, thumbnail[i]])

        // this.thumbnail = {}

        console.log(arr_thumbnail)

        return arr_thumbnail.map(function(post) {
            return( <p>{post}</p>)
        })
    }

    constructor(props) {
        super(props)
    }

   render() {
        if(this.props.thumbnail) {
            return (
                <div>
                    <p>Helo its me</p>

                    <p>a Selfie</p>

                    <p>{ this.renderLink() }</p>

                    {/*<p>{ this.thumbnail.link } </p>*/}

                    {/*<p>{ this.props.pictures[1].link }</p>*/}
                </div>
            )
        }

        return <div>Loading...</div>
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