import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
    fetchQuotations
} from './quotationsActions';
import Loading from '../../shared/utilities/loading'
import './quotation.css'
class Quotation extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchQuotations())
    }

    render() {

        const item = this.props.quotations.quotes[Math.floor(Math.random()*this.props.quotations.quotes.length)]

        console.log(item)

        return (
            <div className="quotation-container">
                { this.props.quotations.quotes.length > 0 &&
                    <div>
                        <h1 className="quotation">{item.meta_data.quotation[0]}</h1>
                        <p className="quotation-author">{item.meta_data.quotations_author[0]}</p>
                    </div>
                }
            </div>
        );
    }
}

Quotation.propTypes = {
    dispatch: PropTypes.func
}


const mapStateToProps = (state, ownProps) => {
    var quotes = { didInvalidate: '', isFetching:'', quotes:[]}

    quotes = Object.assign({}, state.Quotations)

    return {
        quotations: quotes
    }
}

export default connect(mapStateToProps) (Quotation)
