import React , { Component } from 'react'

import Pacman from './Pacman.gif'
import Reload from './Reload.gif'
import Spin from './Spin.gif'

export default class Loading extends Component {

    loadCorrectType(type) {
        if(type == "Pacman") {
            return Pacman
        } else if (type == "Reload") {
            return Reload
        } else {
            return Spin
        }
    }


    render() {
        const loadingContainer = "loading-container"
        const loadingWrapper = "loading-wrapper"
        const img_style = {
            width: 100 + "px",
            height: 100 + "px"
        }
        const loadingType = this.props.type

        const img_path = this.loadCorrectType(loadingType)
        return (
            <div className={loadingContainer}>
                <div className={loadingWrapper}>
                    <img src={img_path} alt={loadingType} style={img_style}/>
                </div>
            </div>
        )
    }
}