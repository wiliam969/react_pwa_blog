import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchLazyCategoryItems }   from '../../category/categoryActions'
import { fetchLazyGalleryItems }    from '../../gallery/galleryActions'
import { fetchLazyBlog }            from '../../blog/blogsingle/blogsingleActions'
import { fetchLazyBlogPreview }     from '../../blog/blogActions'

import VisibilitySensor from 'react-visibility-sensor'

class LazyLoader extends Component {

    constructor(props) {
        super(props)
        this.state = { lazyBtn: false}

        this.isBtnActive = this.isBtnActive.bind(this);
    }

    isActive() {
        let Active
        if(this.state.lazyBtn) {
            Active = !(this.props.gallery.isFetchingLazy === true && this.props.home.isFetchingLazy === true && (this.props.blog.isFetchingLazy === true && this.props.blog.isFetching === true))
            return Active
        } else {
            Active = false
            return Active
        }
    }

    isBtnActive() {
        this.setState({
            lazyBtn: true
        })
    }

    render() {
        const onChange = (isVisible) => {
            if(isVisible && this.isActive() === true) {
                switch(this.props.type) {
                    case 'Home':
                        this.props.sendHome(this.props.home.LazyPage)
                        break;
                    case 'Blog':
                        this.props.sendBlog(this.props)
                        break;
                    case 'Gallery':
                        this.props.sendGallery(this.props.gallery.LazyPage)
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
            <div>
                {!this.state.lazyBtn ?
                    <button onClick={this.isBtnActive}>Load More</button>
                    :
                    <VisibilitySensor onChange={onChange} active={this.isActive} delayedCall={true} resizeCheck={true}></VisibilitySensor>
                }
            </div>
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

    blog = Object.assign({}, state.BlogSingle)
    home = Object.assign({}, state.Blog)
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
