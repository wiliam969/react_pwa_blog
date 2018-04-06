import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchSlider
} from './sliderActions'
import PropTypes from 'prop-types'

import Picture from '../picture/index'


import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class simpleSlider extends Component {

    humus = {
        height: 50 + 'vh',
        backgroundColor: 'green',
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchSlider(this.props))
    }

    render () {
        const settings = {
            dots: false,
            infinite:true,
            speed: 500,
            slidesToScroll:1,
            slidesToShow:1,
        }
        return (
            <Slider {...settings}>
                {this.props.Slider.items.length > 0 &&
                    this.props.Slider.items.map((post,index) =>
                        <div key={index} style={this.humus}>
                            <Picture posttype="slider" blogid={post.id} type="full" height="50vh" width="100%"></Picture>
                            <a href={post._rbs_slider_readmore_btn} target="_blank">
                                <div className="slider-description-wrapper  ">
                                    <div className="slider-title">{post.title.rendered}</div>
                                </div>
                            </a>

                        </div>
                    )
                }
            </Slider>
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

export default connect(mapStateToProps)(simpleSlider)