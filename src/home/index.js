import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Slider from '../shared/slider/index'
import Loading from '../shared/loading/loading'
import Lazyloader from '../shared/lazyloader/lazyloader'

import "./home.css"

class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render () {
        return (
            <div>
                <div className="Hello">Hello It's me! Super Mario</div>

                <Slider className="carousel" swipeOptions={{continuous: true}}></Slider>
            </div>
        )
    }
}

function mapStateToProps(state,ownProps) {
   Home = Object.assign({}, state.Home)

   return {
       Home:Home,
   }
}

export default connect(mapStateToProps) (Home)