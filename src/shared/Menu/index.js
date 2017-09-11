import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './menu.css'
import triangle from './triangle.svg'
export default class Menu extends Component {

    render() {
        return (
            <nav className="nav">
                <div className="container">
                    <div className="nav-left">
                        <a href="" className="nav-item">
                            {/*<img src="http://bulma.io/images/bulma-type.png" alt=""/>*/}
                        </a>
                    </div>
                </div>

                <span className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

                <div className="nav-menu">
                    <Link className="nav-items" to="/home">Home</Link>
                    {/*<Link to="/category/allgemein">Allgemein</Link>*/}
                    {/*<Link to="/category/analyse">Analyse</Link>*/}
                    {/*<Link to="/category/interview">Interview</Link>*/}
                    {/*<Link to="/category/meinung">Meinung</Link>*/}
                    {/*<Link to="/category/news">News</Link>*/}
                    {/*<Link to="/category/studien">Studien</Link>*/}
                    <Link className="nav-items" to="/gallery">Gallery</Link>
                </div>
                <div className="triangle-down">
                    <svg width="100%" height="100%" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <polyline className="triangle_polyline triangle" style={{fill: '#ffffff'}} points="50,0 0,100 100,100"></polyline>
                        <polyline className="triangle_polyline left background" style={{fill:'transparent'}} points="100,0 50,0 100,100"></polyline>
                        <polyline className="triangle_polyline right background" style={{fill:'transparent'}} points="50,0 0,0 0,100"></polyline>
                    </svg>
                </div>
            </nav>
        );
    }
}