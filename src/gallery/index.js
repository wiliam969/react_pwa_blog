import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchGalleryItems} from "./galleryActions";

import Loading from '../shared/loading/loading'
import GalleryGrid from "./components/galleryGrid";
import LazyLoader from '../shared/lazyloader/lazyloader'


class Gallery extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchGalleryItems(this.props))
    }

    loadFullScreenPicture(event) {
        console.log(event)

        console.log("got clicked hehe")
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
                    <GalleryGrid items={this.props.gallery.Items} ClickedPicture={this.loadFullScreenPicture}></GalleryGrid>
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