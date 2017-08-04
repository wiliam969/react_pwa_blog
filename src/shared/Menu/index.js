import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

                <div className="nav-right nav-menu">
                    {/*<a href="/home">Home</a>*/}
                    {/*<a href="/about">AboutMe</a>*/}
                    {/*<a href="/gallery">Gallery</a>*/}
                    <Link to="/home">Home</Link>
                    <Link to="/category/allgemein">Allgemein</Link>
                    <Link to="/category/analyse">Analyse</Link>
                    <Link to="/category/interview">Interview</Link>
                    <Link to="/category/meinung">Meinung</Link>
                    <Link to="/category/news">News</Link>
                    <Link to="/category/studien">Studien</Link>
                    <Link to="/gallery">Gallery</Link>
                    {/*<Link to="/aboutme">AboutMe</Link>*/}
                    {/*<Link to="/gallery">Gallery</Link>*/}
                </div>
            </nav>
        );
    }
}