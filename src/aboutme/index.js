import React, { Component } from 'react'
import pic from './test.jpg'
import "./aboutme.css"
// import cv from "./cv"

export default class AboutMe extends Component {
    render() {
        return(
            <div>
                <h1> About Me =) </h1>
                <br/>
                <div className="selfie-container">
                    <div className="selfie-wrapper">
                        <img src={pic} height="100%" width="100%"/>
                    </div>
                </div>
                <h2>Hey, I'm Robin</h2>
                <hr/>
                <h3>Gamedev - Webdev - Appdev</h3>
                <p>I live in Munich, Germany. I write, maintain and support software for a living.</p>
                <p>I occassionally play computer games and I like to dabble with programs as UE4, Blender</p>

                <p>I started out with PHP and Javascript.</p>
                {/*<p>Im currently working as a Cobol Server Developer.</p>*/}
                <p>In my free time im working on C++ Windows Apps</p>
            </div>
        );
    }
}
