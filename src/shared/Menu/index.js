import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './menu.css'

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
                    <Link className="nav-items" to="/aboutme">AboutMe</Link>
                </div>
            </nav>
        );
    }
}