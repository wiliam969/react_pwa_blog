import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import VisibilitySensor from 'react-visibility-sensor'
import Loading from '../loading/loading'

import "./lazyload.css"

class LazyLoader extends Component {

    constructor(props) {
        super(props)

        this.state  = { isBtn: true }

        this.isBtnActive = this.isBtnActive.bind(this)
    }

    isBtnActive() {
        this.setState({
            isBtn:false,
        })
    }

    render() {
        return (
            <div className="lazyload-container">
                {this.props.fetch ?
                    <Loading></Loading>
                    :
                    <div>
                        {this.props.stop ?
                            <div className="lazyload-wrapper">
                                {this.state.isBtn ?
                                    <button onClick={this.isBtnActive} className="lazyload-btn">Load
                                        More {this.props.name} Items</button>
                                    :
                                    <VisibilitySensor
                                        onChange={this.props.type}
                                        active={!this.props.fetch}
                                        delacedCall={true}
                                        resizeCheck={true}
                                        scrollCheck={true}>
                                    </VisibilitySensor>
                                }
                            </div>
                            :
                            <p style={{color: "red"}}>No older {this.props.name} Items found. Sorry!</p>
                        }
                    </div>
                }
            </div>
        )
    }
}

LazyLoader.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    let type = {}
    let fetch = {}
    let name = {}
    let stop = {}

    type = ownProps.type
    fetch = ownProps.fetch
    name = ownProps.name
    stop = ownProps.stop

    return {
        type:type,
        fetch:fetch,
        name:name,
        stop:stop,
    }
}

export default connect(mapStateToProps)(LazyLoader)
