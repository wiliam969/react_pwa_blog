import React, { Component } from 'react'
import { Link,NavLink } from 'react-router-dom'
import './menu.css'
import triangle from './triangle.svg'

import { Col, Grid, Row} from 'react-bootstrap'

import home from './home_black.png'
import home_blue from './home_blue.png'
import gallery from './gallery_black.png'
import blog from './blog_black.png'
import aboutme from './aboutme_black.png'

export default class Menu extends Component {
    constructor(props) {
        super(props)

        this.oddEvent = this.oddEvent.bind(this)
    }


    oddEvent(match,location) {
        if(!match) {
            console.log("false")
            return false
        }
        console.log("right")
        const eventID = parseInt(match.params.eventID)
        return !isNaN(eventID) && eventID % 2 === 1
    }



    render() {
        return (
            <nav className="nav">
                <div className="container">

                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} mdHidden={true} lgHidden={true} className="nav-menu-mobile">
                            <NavLink exact className="nav-items-mobile" isActive={this.oddEvent} to="/">
                                {this.oddEvent ?
                                    <img src={home_blue} width={35} height={35} alt="home"/>
                                    :
                                    <img src={home} width={35} height={35} alt="home"/>
                                }
                            </NavLink>
                            <NavLink className="nav-items-mobile" isActive={this.oddEvent} to="/blog/"><img src={blog} width={35} height={35} alt="blog"/></NavLink>
                            <NavLink className="nav-items-mobile" isActive={this.oddEvent} to="/aboutme"><img src={aboutme} width={35} height={35} alt="gallery"/></NavLink>
                            <NavLink className="nav-items-mobile" isActive={this.oddEvent} to="/gallery"><img src={gallery} width={35} height={35} alt="gallery"/></NavLink>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} xsHidden={true} smHidden={true} className="nav-menu-desktop">
                            <Link className="nav-items" to="/">Home</Link>
                            <Link className="nav-items" to="/blog/">Blog</Link>
                            <Link className="nav-items" to="/aboutme">About Me</Link>
                            <Link className="nav-items" to="/gallery">Gallery</Link>
                        </Col>
                    </Row>
                    <Row>
                        <div className="triangle-down">
                            <svg width="100%" height="100%" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <polyline className="triangle_polyline triangle" style={{fill: '#ffffff'}} points="50,0 0,100 100,100"></polyline>
                                <polyline className="triangle_polyline left background" style={{fill:'transparent'}} points="100,0 50,0 100,100"></polyline>
                                <polyline className="triangle_polyline right background" style={{fill:'transparent'}} points="50,0 0,0 0,100"></polyline>
                            </svg>
                        </div>
                    </Row>
                </Grid>





                </div>
            </nav>
        );
    }
}