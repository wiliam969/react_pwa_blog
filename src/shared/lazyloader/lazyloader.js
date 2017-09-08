import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchLazyCategoryItems } from '../../category/categoryActions'
import { fetchLazyGalleryItems } from '../../gallery/galleryActions'
import { fetchLazyBlog } from '../../blog/blogActions'
import { fetchLazyBlogPreview } from '../../home/homeActions'

import VisibilitySensor from 'react-visibility-sensor'

class LazyLoader extends Component {

    isActive() {

        const Active = !(this.props.gallery.isFetchingLazy === true || this.props.blogs.isFetchingLazy === true)
        console.log(Active)
        return Active
    }

    // componentDidMount() {
    // }
    // componentDidUpdate() {
    // }
    render() {
        const onChange = (isVisible) => {
            if(isVisible && this.isActive() === true) {
                switch(this.props.type) {
                    case 'Home':
                        // this.isActive = this.props.blogs.stopLazyLoad
                        this.props.sendHome(this.props.blogs.LazyPage)
                        break;
                    case 'Blog':
                        this.props.sendBlog(this.props)
                        break;
                    case 'Gallery':
                        // this.isActive = this.props.gallery.stopLazyLoad
                        this.props.sendGallery(this.props.gallery.stopLazyLoad)
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
    var gallery = {}

    blogs = Object.assign({}, state.Home)
    gallery = Object.assign({}, state.Gallery)

    return {
        blog: this.state,
        blogs:blogs,
        gallery:gallery,
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
