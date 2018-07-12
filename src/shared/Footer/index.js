import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'

import { Col, Grid, Row, Nav, Navbar, NavItem, Glyphicon } from 'react-bootstrap'

import mail from "./envelope-solid.svg"
import github from "./github-brands.svg"
import linked from "./linkedin-in-brands.svg"

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <Navbar fixedBottom={true} id="nav-menu-mobile-navbar">
                    <Nav id="nav-menu-mobile-nav">
                        <NavItem>
                            <a href="mailto:admin@robin-witte.de"  target="_blank">
                                <img src={mail}/>
                            </a>
                        </NavItem>
                        <NavItem>
                            <a href="https://www.linkedin.com/in/robin-witte-3b2105157/"  target="_blank">
                                <img src={linked}/>
                            </a>
                        </NavItem>
                        <NavItem>
                            <a href="https://github.com/wiliam969"  target="_blank">
                                <img src={github}/>
                            </a>
                        </NavItem>
                    </Nav>
                </Navbar>
            </footer>
        );
    }
}