import React, { Component } from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendComments,fetchComments } from '../../../../services/session/actions/Comments'
import { bindActionCreators } from 'redux'
import Loading from '../../../../components/loading'

class Comments extends Component {

    constructor(props) {
        super(props)

        this.state = {
            commentname:2,
            commentemail:2,
            commentwebsite:2,
            commentpost:2,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }


    componentDidMount() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchComments(this.props))
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })

        console.log(this.state)
    }

    submitForm() {
        // e.preventDefault()
        const { dispatch, ownProps } = this.props
        dispatch(sendComments(this.state))
    }

    render() {
        return (
            <div>
                {   this.props.comments.isFetching &&
                    <div>
                        <Loading></Loading>
                        <h1 style={this.FetchingStyle}>im Fetching GUYS hold on dont stress me !</h1>
                    </div>
                }

                {   this.props.comments.didInvalidate &&
                <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }

                {   !this.props.comments.didInvalidate && !this.props.comments.isFetching &&
                    <div>
                        <div className="comments-wrapper">
                            <CommentList comments={this.props.comments.comment}></CommentList>
                            <CommentForm onSubmit={e => {
                                e.preventDefault()
                                this.submitForm()
                            }} onValueChange={this.handleInputChange} data={this.state}></CommentForm>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

Comments.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var cdata = { didInvalidate: '', isFetching: ''}

    cdata = Object.assign({}, state.Comments)

    return {
        comments: cdata,
    }
}

export default connect(mapStateToProps)(Comments)