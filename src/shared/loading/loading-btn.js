import React , { Component } from 'react'

import './loading.css'

export default function loadingBtn(props) {
    return (
        <button className="loading-btn" onClick={props.onClick}>{props.name}</button>
    )
}