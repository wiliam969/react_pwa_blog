import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './menu.css'
import triangle from './triangle.svg'

import { Col, Grid, Row, Nav, Navbar, NavItem, Glyphicon, Button} from 'react-bootstrap'


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
            <Grid>
                <Row>
                    <Col xs={12} mdHidden={true} lgHidden={true} className="nav-menu-mobile-col">
                    <Navbar fixedTop={true} id="nav-menu-mobile-navbar">
                        <Nav id="nav-menu-mobile-nav">
                            <NavItem>
                                <NavLink eventKey={1} exact className="nav-items-mobile" to="/">
                                    <Button bsSize="large">
                                        <Glyphicon glyph="home" />
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink eventKey={2} className="nav-items-mobile"       to="/blog/">
                                    <Button bsSize="large">
                                        <Glyphicon glyph="align-left" />
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink eventKey={3} className="nav-items-mobile"       to="/aboutme">
                                    <Button bsSize="large">
                                        <Glyphicon glyph="user" />
                                    </Button>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink eventKey={4} className="nav-items-mobile"       to="/gallery">
                                    <Button bsSize="large">
                                        <Glyphicon glyph="picture" />
                                    </Button>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                    </Col>
                    <Col xs={12} xsHidden={true} smHidden={true} className="nav-menu-desktop">
                        <Navbar fixedTop={true} fluid={true} id="nav-menu-navbar">
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <NavLink className="nav-items" to="/">{process.env.REACT_APP_IDB_NAME}</NavLink>
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