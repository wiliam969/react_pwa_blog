import React, { Component } from 'react'
import pic from './test.jpg'
import "./aboutme.css"
// import cv from "./cv"

export default class AboutMe extends Component {
    render() {
        return(
            <div>
                <div className="selfie-container">
                    <div className="selfie-wrapper">
                        <img src={pic} height="100%" width="100%"/>
                    </div>
                </div>
                <h1>Hey, I'm Robin</h1>
                <hr/>
                <h2>Gamedev - Webdev - Appdev</h2>
            </div>
        );
    }
}
