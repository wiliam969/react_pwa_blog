import React , { Component } from 'react'
import { Alert, Row, Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import {fetchAlert} from "./alertActions";

class AlertAction extends Component {

    constructor(props) {
        super(props)

        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleShow    = this.handleShow.bind(this);

        this.state = {
            show: true
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchAlert("success","<p>Everything works as expected</p>"))
    }

    handleDismiss() {
        this.setState({ show: false })
    }

    handleShow() {
        this.setState({ show: true })
    }

    render() {
            return(
                <Grid className="alert-container">
                    {this.props.alert.items.length > 0 &&
                        this.props.alert.items.map((post,index) =>
                            <Row className="alert-row">
                                <Alert key={index} bsStyle={post.alertType} onDismiss={this.handleDismiss}>
                                    <div className="alert-content" dangerouslySetInnerHTML={{__html: post.content}}/>
                                </Alert>
                            </Row>
                        )
                    }
                </Grid>
            )
        }
}

AlertAction.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    let alert = { items: { 0: {}}}

    alert = Object.assign({}, state.Alert)

    return {
        alert: alert
    }
}

export default connect(mapStateToProps) (AlertAction)