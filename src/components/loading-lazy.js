import React , { Component } from 'react'

export default class Loading extends Component {


    render() {
        const loadingcontainer = "loading-container"
        const loadingwrapper = "loading-wrapper"
        const img_style = {
            width: 100 + "px",
            height: 100 + "px"
        }

        const img_path = process.env.REACT_APP_URL + 'Spin.gif'
        return (
            <div className={loadingcontainer}>
                <div className={loadingwrapper}>
                <img src={img_path} alt="Pacman" style={img_style}/>
                </div>
            </div>
        )
    }
}