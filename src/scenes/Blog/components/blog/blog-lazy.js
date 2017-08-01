import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLazyBlog } from '../../../../services/session/actions/Blog'

import VisibilitySensor from 'react-visibility-sensor'

class LazyBlogItemLoad extends Component {

    isActive = true

    constructor(props) {
        super(props)
    }

    renderPicture() {

        var Style = {
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width:100 + '%',
            height:200+ 'px',
        }

        if(this.props.thumbnail != null) {
            const thumbnail = this.props.thumbnail
            const type = this.props.type
            const height = this.props.height
            const width = this.props.width
            const picture_url = thumbnail[type].source_url

            if(picture_url) {
                Style['backgroundImage'] =  'url(' + picture_url + ')'
                Style['width'] = width
                Style['height'] = height
            } else {
                Style['backgroundColor'] = 'grey'
            }
        } else {
            Style['backgroundColor'] = 'grey'
        }

        return Style
    }

    render() {
        const onChange = (isVisible) => {
            if(isVisible && this.props.thumbnail == null) {
                this.props.sendTheAlert(this.props)
                this.isActive = false
            }
        }
        return (
            <VisibilitySensor onChange={onChange} active={this.isActive} partialVisibility={true}>
            </VisibilitySensor>
        );
    }
}

LazyBlogItemLoad.propTypes = {
}

LazyBlogItemLoad.defaultProps = {
}

const mapStateToProps = (state, ownProps) => {
    var Blog = { didInvalidate: '', isFetching: ''}
    let BlogContent = Object.assign({}, state.Blog.blogcontent)
    let BlogHeader = Object.assign({}, state.Blog.blogheader)

    return {
        Blog: Blog,
        blogcontent: BlogContent,
        blogheader: BlogHeader,
    }
}

export default connect(mapStateToProps)(LazyBlogItemLoad)