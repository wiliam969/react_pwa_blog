import React, { Component } from 'react'
import pic from './robinlogo512x512.png'
import "./aboutme.css"

/**
 * This class has no intention of analyzing or ending data it just outputs content
 */
export default class AboutMe extends Component {
    render() {
        return(
            <div className="container">
                <br/>
                <div className="selfie-container">
                    <div className="selfie-wrapper">
                        <img src={pic} height="100%" width="100%" alt="It's Me"/>
                    </div>
                </div>
                <h2>Hey, I'm Robin</h2>
                <hr/>
                <h3>I am an AI Programmer specialized in C++, JS and PHP.</h3>
                <br/>
                <p>I have the ability to create high proficiency c++ programs. Currently Im most comfortable with console programming or UE4. </p>
                <p>I have over 3 years professional experience in programming. I also majored Computer Science and have a degree as a 'Computer Science Expert'</p>
                <br/>
                <p>PHP and Javascript are my Hometown. I grew up with it. Therefore I'm a highly qualified Web-Developer.</p>
                <p>I worked on over 10 projects using JS and PHP. Here im mostly comfortable with plainJS, React, Redux and Laravel.</p>
                <br/>
                <p>Playing computer games was one of my hobby's now I'm more interested to glimpse behind the scenes.</p>
                <p>In my free time im mostly working on evolving my knowledge about Game Development/C++.</p>


            </div>
        );
    }
}
