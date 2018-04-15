import React from 'react'

import './loading.css'

export default function Loading () {
        return (
            <div className="loading-container">
                <div className="lds-css ng-scope">
                    <div className="lds-rolling">
                        <div></div>
                    </div>
                </div>
            </div>
        )
}