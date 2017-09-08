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
        const Active = !(this.props.gallery.isFetchingLazy === true || this.props.home.isFetchingLazy === true || this.props.blog.isFetchingLazy)
        return Active
    }

    render() {
        const onChange = (isVisible) => {
            if(isVisible && this.isActive() === true) {
                switch(this.props.type) {
                    case 'Home':
                        this.props.sendHome(this.props.blogs.LazyPage)
                        break;
                    case 'Blog':
                        this.props.sendBlog(this.props)
                        break;
                    case 'Gallery':
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
    let home = {}
    let blog = {}
    let gallery = {}

    blog = Object.assign({}, state.Blog)
    home = Object.assign({}, state.Home)
    gallery = Object.assign({}, state.Gallery)

    return {
        blog: blog,
        home:home,
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
