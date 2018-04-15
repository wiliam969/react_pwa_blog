import React , { Component } from 'react'
import Picture from '../../shared/picture/index'
import Arrow from '../../shared/utilities/arrow'
import './fullscreen.css'

import { Link } from 'react-router-dom'

export default class GalleryFullscreen extends Component {

    closeButton (e) {
        e.stopPropagation()
        this.props.closeFull(this.props)
    }

    prevButton (e) {
        e.stopPropagation()
        this.props.prevPicture(this.props,this.props.id)
    }

    nextButton (e) {
        e.stopPropagation()
        this.props.nextPicture(this.props,this.props.id)
    }

    render() {
        const fuckme = {
            pointerEvents: 'none',
            visibility: 'hidden',
            display: 'none',
        }
        const clapme = {}
        return (
            <div>
                { this.props.isFullscreen &&
                    <div className='gal_fullscreen_container'>
                        <div className='gal_fullscreen_close' onClick={ (e) => this.closeButton(e,this.props)}>
                            {!this.props.isURLFullscreen &&
                                <div className='gal_fullscreen_btn_prev' onClick={ (e) => this.prevButton(e,this.props)} style={this.props.prev_state < 0 ? fuckme : clapme}>
                                    <Arrow type="left"/>
                                </div>
                            }

                            { this.props.item.map((post,index) =>
                                <div className='gal_fullscreen_picture gal_fullscreen_middle_fix'>
                                    <Picture
                                        key={index}
                                        featured_media_id={post.featured_media}
                                        type="large"
                                        posttype="gallery"
                                        height="100vh"
                                        width="100%"
                                        picture_width={true}
                                        picture_height={true}
                                        backgroundSize="contain">
                                    </Picture>
                                </div>
                            )
                            }
                            {!this.props.isURLFullscreen && <div className='gal_fullscreen_btn_next' onClick={ (e) => this.nextButton(e,this.props)} style={this.props.last_item === this.props.next_state ? fuckme : clapme}><Arrow type="right" ></Arrow></div>}
                        </div>
                    </div>
                }
            </div>
        );
    }
}