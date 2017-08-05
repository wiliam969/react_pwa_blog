import React , { Component } from 'react'
import ReactSwipe from 'react-swipe';

export default class MyComponent extends Component {

    handleImageLoad(event) {
        console.log('Image loaded ', event.target)
    }

    componentDidMount() {
        this.refs.reactSwipe.slide(2,2000)
    }

    render() {
        return (
            <ReactSwipe ref="reactSwipe" className="carousel" swipeOptions={{continuous: false}}>
                <div>PANE 1</div>
                <div>PANE 2</div>
                <div>PANE 3</div>
            </ReactSwipe>
        );
    }

}