import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './menu.css'

import { Col, Grid, Row, Nav, Navbar, NavItem, Glyphicon} from 'react-bootstrap'


export default class Menu extends Component {
    constructor(props) {
        super(props)

        this.oddEvent = this.oddEvent.bind(this)
    }


    oddEvent(match,location) {
        if(!match) {
            return false
        }
        const eventID = parseInt(match.params.eventID,10)
        return !isNaN(eventID) && eventID % 2 === 1
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} mdHidden={true} lgHidden={true} className="nav-menu-mobile-col">
                    <Navbar fixedTop={true} id="nav-menu-mobile-navbar">
                        <Nav id="nav-menu-mobile-nav">
                            <NavItem>
                                <NavLink eventKey={1} exact className="nav-items-mobile" to="/">
                                    <Glyphicon glyph="home" />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink eventKey={2} className="nav-items-mobile"       to="/blog/">
                                    <Glyphicon glyph="align-left" />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink eventKey={3} className="nav-items-mobile"       to="/aboutme">
                                    <Glyphicon glyph="user" />
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink eventKey={4} className="nav-items-mobile"       to="/projects">
                                    <Glyphicon glyph="th-large"/>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink eventKey={5} className="nav-items-mobile"       to="/gallery">
                                    <Glyphicon glyph="picture" />
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    </Col>
                    <Col xs={12} xsHidden={true} smHidden={true} className="nav-menu-desktop">
                        <Navbar fixedTop={true} fluid={true} id="nav-menu-navbar">
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <NavLink className="nav-items" to="/">{process.env.REACT_APP_IDB_NAME} - v0.5</NavLink>
                                </Navbar.Brand>
                            </Navbar.Header>
                            <Nav id="nav-menu-nav">
                                <NavItem>
                                    <NavLink exact className="nav-items" to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-items" to="/blog/">Blog</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-items" to="/aboutme">About Me</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-items" to="/projects">Projects</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-items" to="/gallery">Gallery</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Grid>
        );
    }
}