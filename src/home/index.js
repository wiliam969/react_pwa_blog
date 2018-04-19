import React, { Component } from 'react'
import { connect } from 'react-redux'

import Slider from '../shared/slider/index'

import "./home.css"

class Home extends Component {

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