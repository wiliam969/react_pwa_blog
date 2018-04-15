import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Slider from '../shared/slider/index'
import Loading from '../shared/utilities/loading'
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
                {/*<div className="home-loading-container" id="home-loading-container">*/}
                    {/*/!*{this.props.Blog.isFetchingNew*!/*/}
                        {/*/!*?*!/*/}
                        {/*/!*<Loading type="reload"></Loading>*!/*/}
                        {/*/!*:*!/*/}
                        {/*/!*<button className="load-blogs-btn" onClick={this.fetchNewPosts}>Search for new Blogs</button>*!/*/}
                    {/*/!*}*!/*/}
                {/*</div>*/}

                <Slider className="carousel" swipeOptions={{continuous: true}}></Slider>

                <img src="https://1.bp.blogspot.com/_CWw5NMM8rhU/TKRxpxonwBI/AAAAAAAAEhU/iUI35tWq6gg/s1600/0-ALBERTO+VARGAS-hindart3.jpg"></img>
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