import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchGalleryItems, fetchFullscreenGalleryItem} from "./galleryActions";

import Loading from '../shared/loading/loading'
import GalleryGrid from "./components/galleryGrid";
import GalleryFullscreen from './components/galleryFullscreen'
import LazyLoader from '../shared/lazyloader/lazyloader'


class Gallery extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchGalleryItems(this.props))
    }

    loadFullScreenPicture(id) {
        console.log(id)
        console.log("got clicked hehe")

        const { dispatch } = this.props
        dispatch(fetchFullscreenGalleryItem(id))
    }

    render() {
        return(
            <div>
                {this.props.gallery.isFetching &&
                    <Loading type="Spin"/>
                }

                {this.props.gallery.didInvalidate &&
                    <h1>LUL SOMETHING WENT WRONG FU GABEN</h1>
                }

                {!this.props.gallery.isFetching && !this.props.gallery.didInvalidate &&
                    <div>
                        <GalleryFullscreen></GalleryFullscreen>
                        <GalleryGrid items={this.props.gallery.Items} ClickedPicture={this.loadFullScreenPicture}></GalleryGrid>
                    </div>
                }

                {this.props.gallery.isFetchingLazy &&
                    <Loading type="Spin"/>
                }

                {
                    !this.props.gallery.stopLazyLoad ?
                        <LazyLoader type="Gallery"></LazyLoader>
                        :
                        <h1>THIS IS THE END MA FRIEND</h1>
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