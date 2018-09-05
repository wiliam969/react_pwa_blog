import React , { Component } from 'react'
import { Alert, Row, Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { closSpecificAlert } from "./alertActions";

/**
 * This is still in a beta branch
 * I want to handle all the errors
 * global though this class
 */
class AlertAction extends Component {

    constructor(props) {
        super(props)

        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss(index) {
        const { dispatch } = this.props
        dispatch(closSpecificAlert(index))
    }

    render() {
        return(
            <Grid className="alert-container">
                {this.props.alert.items.length > 0 &&
                    this.props.alert.items.map((post,index) =>
                        <Row className="alert-row">
                        <Alert key={index} bsStyle={post.alertType}>
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