import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ReactSwipe from 'react-swipe'
import {
    fetchSlider
} from './sliderActions'

import Picture from '../picture/index'
import Arrow from '../arrow/arrow'

import PropTypes from 'prop-types'

import Style from './sliderDesign'
import './slider.css'

class Slider extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchSlider(this.props))
    }

    humus = {
        height: 50 + 'vh',
        backgroundColor: 'green',
    }

    render () {
        return (
            <div className="slider-container-main">
                <div className="slider-prev-btn">
                    <Arrow type="left"  className="slider-prev-btn"></Arrow>
                </div>

                <div className="slider-next-btn">
                    <Arrow type="right"  className="slider-prev-btn"></Arrow>
                </div>
                <div>
                <ReactSwipe className="Slider" swipeOptions={{continuous: true, auto: 3000}} style={Style}>

                        {this.props.Slider.items.length > 0 &&
                            this.props.Slider.items.map((post,index) =>
                                <div className="slider-item" key={post.id} data-key={index} style={this.humus}>
                                    <Picture posttype="slider" blogid={post.id} type="full" height="50vh" width="100%"></Picture>
                                    <div className="slider-title">IM THE TITLE {index}</div>
                                </div>
                            )
                        }
                </ReactSwipe>
                </div>
            </div>
        )
    }
}

Slider.propTypes = {
    dispatch: PropTypes.func
}

function mapStateToProps(state,ownProps) {
    let slider = { items: {}, }

    slider = Object.assign({},state.Slider)

    return {
        Slider:slider,
    }
}

export default connect(mapStateToProps)(Slider)