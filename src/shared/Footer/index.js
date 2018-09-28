import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './footer.css'

import {Col, Nav, Navbar, NavItem} from 'react-bootstrap'

import mail from "./envelope-solid.svg"
import github from "./github-brands.svg"
import linked from "./linkedin-in-brands.svg"

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <Navbar fixedBottom={true} id="nav-menu-mobile-navbar" id="footer-menu">
                    <Navbar.Collapse>
                        <Nav id="icons">
                            <NavItem href="mailto:admin@robin-witte.de" rel="noopener noreferrer">
                                <img src={mail} alt="mail"/>
                            </NavItem>
                            <NavItem href="https://github.com/wiliam969"  target="_blank" rel="noopener noreferrer">
                                <img src={github} alt="github"/>
                            </NavItem>
                            <NavItem href="https://www.linkedin.com/in/robin-witte/"  target="_blank" rel="noopener noreferrer">
                                <img src={linked} alt="linkedin"/>
                            </NavItem>
                        </Nav>
                        <Col xs={12} xsHidden={true} smHidden={true} className="nav-footer-desktop">
                            <Nav pullRight={true}>
                                <NavItem className="nav-items">
                                    <NavLink to="/customsite/impressum">Imprint</NavLink>
                                </NavItem>
                                <NavItem className="nav-items">
                                    <NavLink to="/customsite/datenschutzerklaerung">Privacy</NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                    </Navbar.Collapse>
                </Navbar>
            </footer>
        );
    }
}