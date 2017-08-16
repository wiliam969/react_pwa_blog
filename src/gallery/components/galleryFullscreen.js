import React , { Component } from 'react'
import ReactSwipe from 'react-swipe';
import Picture from '../../shared/picture/index'

export default class GalleryFullscreen extends Component {

    handleImageLoad(event) {
        console.log('Image loaded ', event.target)
    }

    componentDidMount() {
        this.refs.reactSwipe.slide(2,2000)
    }

    render() {
        console.log(this.props.item)
        return (
            <div>
                <button onClick={ () => this.props.prevPicture(this.props,this.props.id)}>PREV</button>
                { this.props.item.length > 0 &&
                    this.props.item.map((post,index) =>
                        <Picture key={index} blogid={post.id} type="full" posttype="gallery" height="200px" width="100%"></Picture>
                    )
                }
                <button onClick={ () => this.props.nextPicture(this.props,this.props.id)}>NEXT</button>
                <ReactSwipe ref="reactSwipe" className="carousel" swipeOptions={{continuous: false}}>
                    <div>PANE 1</div>
                    <div>PANE 2</div>
                    <div>PANE 3</div>
                </ReactSwipe>
            </div>
        );
    }

}