import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBlogSingle } from '../../redux/actions/Blog'
import { bindActionCreators } from 'redux'

class BlogSingle extends Component {

    renderLink() {

        const thumbnail = this.props.thumbnail
        const arr_thumbnail = []

        for(var i in thumbnail)
            arr_thumbnail.push(thumbnail[i])

        var Style = null

        return Style = {
            backgroundImage: 'url(' + arr_thumbnail[23] + ')',
            backgroundPosition: 'center center',
            width:200 + 'px',
            height:200+ 'px',
        }
    }

    constructor(props) {
        super(props)
        // this.fucku()
    }


    componentDidMount() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    render() {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}

BlogSingle.propTypes = {
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

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: () => {dispatch(fetchBlogSingle(ownProps))}
    }
    // return bindActionCreators(fetchBlogSingle(ownProps), dispatch)
}

export default connect(mapStateToProps)(BlogSingle)