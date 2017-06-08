import React, { Component } from 'react'
// import { NavLink } from 'react-router-dom'

export default class Menu extends Component {

    render() {
        return (
            <nav className="nav">
                <div className="container">
                    <div className="nav-left">
                        <a href="" className="nav-item">
                            <img src="http://bulma.io/images/bulma-type.png" alt=""/>
                        </a>
                    </div>
                </div>

                <span className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

                <div className="nav-right nav-menu">
                    <a href="">Home</a>
                    <a href="">AboutMe</a>
                    <a href="">Gallery</a>
                    {/*<NavLink to="/">Home</NavLink>*/}
                    {/*<NavLink to="/aboutme">AboutMe</NavLink>*/}
                    {/*<NavLink to="/gallery">Gallery</NavLink>*/}
                </div>
            </nav>
        );
    }
}