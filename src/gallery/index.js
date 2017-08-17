import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    fetchGalleryItems,
    fetchFullscreenGalleryItem,
    nextFullScreenGalleryitem,
    prevFullScreenGalleryItem
} from "./galleryActions"

import Loading from '../shared/loading/loading'
import GalleryGrid from "./components/galleryGrid"
import GalleryFullscreen from './components/galleryFullscreen'
import LazyLoader from '../shared/lazyloader/lazyloader'

class Gallery extends Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log("component props")
        console.log(this.props)
        const { dispatch } = this.props
        dispatch(fetchGalleryItems(this.props))
    }

    loadFullScreenPicture(props,index) {
        console.log(index)
        props.dispatch(fetchFullscreenGalleryItem(index))
    }

    prevFullScreenPicture(props,index) {
        props.dispatch(prevFullScreenGalleryItem(index,props))
    }

    nextFullScreenPicture(props,index) {
        props.dispatch(nextFullScreenGalleryitem(index,props))
    }

    closeFullscreen(props) {
        console.log("click closefull")
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
                        <GalleryFullscreen
                            last_item={this.props.gallery.Items.length}
                            item={this.props.gallery.current_item}
                            id={this.props.gallery.current_id}
                            dispatch={this.props.dispatch}
                            prevPicture={this.prevFullScreenPicture}
                            nextPicture={this.nextFullScreenPicture}
                            closeFull={this.closeFullscreen}
                            isPrev={this.props.gallery.isPrev}
                            isNext={this.props.gallery.isNext}>
                        </GalleryFullscreen>
                        <GalleryGrid items={this.props.gallery.Items} dispatch={this.props.dispatch} onClickedPicture={this.loadFullScreenPicture}></GalleryGrid>
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