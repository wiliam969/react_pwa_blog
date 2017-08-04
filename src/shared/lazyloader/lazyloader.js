import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchLazyCategoryItems } from '../../category/categoryActions'
import { fetchLazyGalleryItems } from '../../gallery/galleryActions'
import { fetchLazyBlog } from '../../blog/blogActions'
import { fetchLazyBlogPreview } from '../../home/homeActions'

import VisibilitySensor from 'react-visibility-sensor'

class LazyLoader extends Component {

    isActive = true

    // componentDidMount() {
    // }
    // componentDidUpdate() {
    // }
    render() {
        const onChange = (isVisible) => {
            if(isVisible && this.isActive === true) {
                switch(this.props.type) {
                    case 'Home':
                        this.props.sendHome(this.props.blogs.stopLazyLoad)
                        break;
                    case 'Blog':
                        this.props.sendBlog(this.props)
                        break;
                    case 'Gallery':
                        this.props.sendGallery(this.props)
                        break;
                    case 'Category':
                        this.props.sendCategory(this.props)
                        break;
                    default:
                        this.props.sendHome(this.props)
                }

            }
        }
        return (
            <VisibilitySensor onChange={onChange} active={this.isActive} delayedCall={true}></VisibilitySensor>
        )
    }
}

LazyLoader.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var blogs = {}

    blogs = Object.assign({}, state.Home)

    return {
        blogs:blogs,
    }
}

const mapDispatchToProps = (dispatch,ownProps) => {
    return({
        sendCategory: (e) => { dispatch(fetchLazyCategoryItems(e))},
        sendGallery: (e) => { dispatch(fetchLazyGalleryItems(e))},
        sendBlog: (e) => { dispatch(fetchLazyBlog(e))},
        sendHome: (e) => { dispatch(fetchLazyBlogPreview(e))},
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(LazyLoader)
