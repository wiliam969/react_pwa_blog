import React , { Component } from 'react'
import Slider from 'react-slick'
import Picture from '../../shared/picture/index'

export default class GalleryFullscreenSlider extends Component {

    render() {
        const settings = {
            dots: false,
            infinite:true,
            speed: 500,
            slidesToScroll:1,
            slidesToShow:1,
        }
        return (
            <div>
                { this.props.isFullscreen &&
                    <Slider {...settings}>
                        {this.props.item.map((post,index) =>
                            <div className="gal_fullscreen_slider_item">
                                <Picture
                                    key={index}
                                    featured_media_id={post.featured_media}
                                    type="large"
                                    posttype="gallery"
                                    height="100vh"
                                    width="100%"
                                    picture_width={true}
                                    picture_height={true}
                                    backgroundSize="contain"/>
                            </div>
                        )}
                    </Slider>
                }
            </div>

        )
    }
}