import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'

import { Nav, Navbar, NavItem } from 'react-bootstrap'

import mail from "./envelope-solid.svg"
import github from "./github-brands.svg"
// import linked from "./linkedin-in-brands.svg"

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <Navbar fixedBottom={true} id="nav-menu-mobile-navbar" id="footer-menu">
                    <Navbar.Collapse>
                        <Nav id="icons">
                            <NavItem>
                                <a href="mailto:admin@robin-witte.de"  target="_blank" rel="noopener noreferrer">
                                    <img src={mail} alt="mail"/>
                                </a>
                            </NavItem>
                            <NavItem>
                                <a href="https://github.com/wiliam969"  target="_blank" rel="noopener noreferrer">
                                    <img src={github} alt="github"/>
                                </a>
                            </NavItem>
                        </Nav>
                        <Nav pullRight={true}>
                            <NavItem className="nav-items">
                                <NavLink to="/customsite/impressum">Impressum</NavLink>
                            </NavItem>
                            <NavItem className="nav-items">
                                <NavLink to="/customsite/datenschutzerklaerung">Datenschutzerklärung</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </footer>
        );
    }
}