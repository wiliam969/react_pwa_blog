import React , { Component } from 'react'
import Picture from '../../shared/picture/index'

export default class GalleryFullscreen extends Component {

    render() {
        console.log(this.props.item)
        return (
            <div>
                <button onClick={ () => this.props.prevPicture(this.props,this.props.id)} disabled={this.props.isPrev}>PREV</button>
                { !this.props.isPrev && !this.props.isNext && this.props.item.length > 0 &&
                    this.props.item.map((post,index) =>
                        <Picture key={index} blogid={post.id} type="full" posttype="gallery" height="200px" width="100%"></Picture>
                    )
                }
                <button onClick={ () => this.props.nextPicture(this.props,this.props.id)} disabled={this.props.isNext}>NEXT</button>
            </div>
        );
    }

}