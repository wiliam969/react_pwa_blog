import React , { Component } from 'react'
import Picture from '../../shared/picture/index'
import Arrow from '../../shared/utilities/arrow'
import './fullscreen.css'

import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class GalleryFullscreen extends Component {

    closeButton (e) {
        //e.stopPropagation()
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

    /**
     * @returns {*}
     */
    render() {
        const fuckme = {
            pointerEvents: 'none',
            visibility: 'hidden',
            display: 'none',
        }
        const clapme = {}
        return (
            <div>
                { this.props.item.map((post,index) =>
                <Modal key={index} bsSize="large" show={this.props.isFullscreen} onHide={ (e) => this.closeButton(e,this.props)}>
                        <Modal.Header closeButton>
                            {post.title.rendered}
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ width : "100%"}}>
                                <Picture
                                    key={index}
                                    featured_media_id={post.featured_media}
                                    type="large"
                                    posttype="gallery"
                                    height="100vh"
                                    width="100%"
                                    backgroundSize="contain">
                                </Picture>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            {!this.props.isURLFullscreen &&
                            <div className='gal_fullscreen_btn_prev' onClick={ (e) => this.prevButton(e,this.props)} style={this.props.prev_state < 0 ? fuckme : clapme}>
                                <Arrow type="left"/>
                            </div>
                            }
                            {!this.props.isURLFullscreen &&
                            <div className='gal_fullscreen_btn_next' onClick={ (e) => this.nextButton(e,this.props)} style={this.props.last_item === this.props.next_state ? fuckme : clapme}>
                                <Arrow type="right" />
                            </div>
                            }
                        </Modal.Footer>

                </Modal>
                )}
            </div>
        );
    }
}