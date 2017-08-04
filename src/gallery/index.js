import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchGalleryItems} from "./galleryActions";

import loading from '../shared/loading/loading'


class Gallery extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchGalleryItems(this.props))
    }

    render() {
        return(
            <div>
                <p>Helo im your secret Gal</p>
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