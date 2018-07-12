import React, { Component } from 'react'
import './footer.css'

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="footer">
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
                        <a className="nav-items">Impressum</a>
                        <a className="nav-items">Datenschutzerklärung</a>
                    </div>
                </div>
            </footer>
        );
    }
}