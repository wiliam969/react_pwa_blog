import React , { Component } from 'react'
import Picture from '../../shared/picture/index'
import Arrow from '../../shared/arrow/arrow'
import '../style.css'

export default class GalleryFullscreen extends Component {

    closeButton (e,props) {
        e.stopPropagation()
        this.props.closeFull(this.props)
    }

    prevButton (e) {
        e.stopPropagation()
        this.props.prevPicture(this.props,this.props.id)
        console.log("child")
    }

    nextButton (e) {
        e.stopPropagation()
        this.props.nextPicture(this.props,this.props.id)
        console.log("child")
    }

    render() {
        return (
            <div className='gal_fullscreen_container'>
                <div className='gal_fullscreen_close' onClick={ (e) => this.closeButton(e,this.props)}>
                <div className='gal_fullscreen_btn_prev' onClick={ (e) => this.prevButton(e,this.props)} disabled={this.props.isPrev}><Arrow type="left"></Arrow></div>

                { !this.props.isPrev && !this.props.isNext && this.props.item.length > 0 &&
                    this.props.item.map((post,index) =>
                        <div className='gal_fullscreen_picture gal_fullscreen_middle_fix'>
                            <Picture key={index} blogid={post.id} type="large" posttype="gallery" height="100vh" width="100%" picture_width={true} picture_height={true} backgroundSize="contain"></Picture>
                        </div>
                    )
                }
                <div className='gal_fullscreen_btn_next' onClick={ (e) => this.nextButton(e,this.props)} disabled={this.props.isNext}><Arrow type="right" ></Arrow></div>
                </div>
            </div>
        );
    }
}