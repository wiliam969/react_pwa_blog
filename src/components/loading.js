import React , { Component } from 'react'

export default class Loading extends Component {


    render() {
        const loadingContainer = "loading-container"
        const loadingWrapper = "loading-wrapper"
        const img_style = {
            width: 100 + "px",
            height: 100 + "px"
        }
        const loadingType = this.props.type

        const img_path = process.env.REACT_APP_URL + loadingType + '.gif'
        return (
            <div className={loadingContainer}>
                <div className={loadingWrapper}>
                    <img src={img_path} alt={loadingType} style={img_style}/>
                </div>
            </div>
        )
    }
}