import React , { Component } from 'react'

import Left from './back.png'
import Right from './next.png'

export default class Arrow extends Component {

    loadCorrectType(type) {
        if(type === "left") {
            return Left
        } else if (type === "right") {
            return Right
        }
    }


    render() {
        const arrowContainer = "arrow-container"
        const arrowWrapper = "arrow-wrapper"
        const img_style = {
            width: 50 + "px",
            height: 50 + "px"
        }
        const loadingType = this.props.type

        const img_path = this.loadCorrectType(loadingType)
        return (
            <div className={arrowContainer}>
                <div className={arrowWrapper}>
                    <img src={img_path} alt={loadingType} style={img_style}/>
                </div>
            </div>
        )
    }
}