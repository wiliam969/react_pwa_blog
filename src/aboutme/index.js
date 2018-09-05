import React, { Component } from 'react'
import pic from './test.jpg'
import "./aboutme.css"

/**
 * This class has no intention of analyzing or ending data it just outputs content
 */
export default class AboutMe extends Component {
    render() {
        return(
            <div>
                <h1 id="aboutme-h1"> About Me =) </h1>
                <br/>
                <div className="selfie-container">
                    <div className="selfie-wrapper">
                        <img src={pic} height="100%" width="100%" alt="It's Me"/>
                    </div>
                </div>
                <h2>Hey, I'm Robin</h2>
                <hr/>
                <h3>Webdev - Appdev</h3>
                <p>I write, maintain and support software for a living.</p>
                <p>Playing computer games was one of my hobby's now I'm more interested to glimpse behind the scenes therefore,
                    I like to dabble with programs such as UE4, Blender.</p>
                <p>PHP and Javascript are my Hometown. I grew up with it. Currently im most comfortable with these languages.</p>
                <p>In my free time im mostly working on evolving my knowledge about Game Development/C++.</p>
            </div>
        );
    }
}
