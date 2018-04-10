import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
    fetchGalleryItems,
    fetchFullscreenGalleryItem,
    nextFullScreenGalleryitem,
    prevFullScreenGalleryItem,
    closeFullscreenGallery,
    fetchLazyGalleryItems,
    fetchURLFullscreenGalleryItem
} from "./galleryActions"

import "./gallery.css"

import Loading from '../shared/loading/loading'
import GalleryGrid from "./components/galleryGrid"
import GalleryFullscreen from './components/galleryFullscreen'
import LazyLoader from '../shared/lazyloader/lazyloader'
import rBGColorGenerator from "../shared/background/randomBackgroundColor";

class Gallery extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchGalleryItems(this.props))

        this.fetchLazyGallery = this.fetchLazyGallery.bind(this)

        if(this.props.match.params.slug) {
            dispatch(fetchURLFullscreenGalleryItem(this.props))
        }

        // rBGColorGenerator.randomBackgroundColor("gallery-loading-container", 2500)
    }

    loadFullScreenPicture(props,index) {
        props.dispatch(fetchFullscreenGalleryItem(index))
    }

    prevFullScreenPicture(props,index) {
        props.dispatch(prevFullScreenGalleryItem(index,props))
    }

    nextFullScreenPicture(props,index) {
        props.dispatch(nextFullScreenGalleryitem(index,props))
    }

    closeFullscreen(props) {
        props.dispatch(closeFullscreenGallery())
    }

    fetchLazyGallery(page) {
        const { dispatch } = this.props
        dispatch(fetchLazyGalleryItems(page))
    }
    render() {
        return(
            <div>
                <Helmet>
                    {/*<meta name="description" content={this.props.BlogSingle.items[0].content.rendered}/>*/}
                    {/*<meta name="keywords" content={this.props.BlogSingle.items[0].tags}/>*/}
                    <title>Gallery</title>
                    <link rel="canonical" href={window.location.href}/>
                </Helmet>
                {this.props.gallery.isFetching ?
                    <Loading/>
                    :
                    <div className="gallery-wrapper">
                        <div className="gallery-loading-container"/>
                        {this.props.gallery.didInvalidate &&
                            <p>Something went wrong! Sorry.</p>
                        }

                        {!this.props.gallery.isFetching && !this.props.gallery.didInvalidate &&
                            <div>
                                <GalleryFullscreen
                                    last_item={this.props.gallery.Items.length}
                                    item={this.props.gallery.current_item}
                                    id={this.props.gallery.current_id}
                                    dispatch={this.props.dispatch}
                                    prevPicture={this.prevFullScreenPicture}
                                    nextPicture={this.nextFullScreenPicture}
                                    closeFull={this.closeFullscreen}
                                    isPrev={this.props.gallery.isPrev}
                                    isNext={this.props.gallery.isNext}
                                    isFullscreen={this.props.gallery.isFullscreen}
                                    next_state={this.props.gallery.next_state}
                                    prev_state={this.props.gallery.prev_state}
                                    isURLFullscreen={this.props.gallery.isURLFullscreen}/>

                                <GalleryGrid
                                    items={this.props.gallery.Items}
                                    dispatch={this.props.dispatch}
                                    onClickedPicture={this.loadFullScreenPicture}/>
                            </div>
                        }

                        <LazyLoader
                            type={ () => {this.fetchLazyGallery(this.props.gallery.LazyPage)}}
                            fetch={this.props.gallery.isFetchingLazy}
                            stop={this.props.gallery.stopLazyLoad}
                            name="Gallery">
                        </LazyLoader>
                    </div>
                }
            </div>
        );
    }
}

Gallery.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state) {
    var gallery = { didInvalidate: '', isFetching: '',}

    gallery = Object.assign({}, state.Gallery)
    return {
        gallery: gallery,
    }
}

export default connect(mapStateToProps)(Gallery)