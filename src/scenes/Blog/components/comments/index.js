import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendComments,fetchComments } from '../../../../redux/actions/Comments'
import { bindActionCreators } from 'redux'

import CommentList from './CommentList'

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
        console.log(target)
        const value = target.value
        console.log(value)
        const name = target.name
        console.log(name)

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
                <h1 style={this.FetchingStyle}>im Fetching GUYS hold on dont stress me !</h1>
                }

                {   this.props.comments.didInvalidate &&
                <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }

                {   !this.props.comments.didInvalidate && !this.props.comments.isFetching &&
                <div>
                    {   !this.props.comments.comment > 0 &&
                        <div className="comments-wrapper">
                            <CommentList comments={this.props.comments.comment}></CommentList>
                        </div>
                    }
                    <div className="comments-form">
                    <form onSubmit={e => {
                        e.preventDefault()
                        this.submitForm()
                    }}>
                        <input type="text" id="name" name="commentname" placeholder="name" value={this.state.commentname} onChange={this.handleInputChange}/>
                        <input type="text" id="email" name="commentemail" placeholder="email" value={this.state.commentemail} onChange={this.handleInputChange}/>
                        <input type="text" id="website" name="commentwebsite" placeholder="website" value={this.state.commentwebsite} onChange={this.handleInputChange}/>
                        <textarea type="text" id="comment" name="commentpost" placeholder="comment" value={this.state.commentpost} onChange={this.handleInputChange}/>
                        <button type="submit" name="submit" id="submit">Submit</button>
                    </form>
                    </div>
                </div>
                }

                <p>What up Mate dis is the OP Comments Home</p>
                {/*<Quotation></Quotation>*/}
                <p>Helo from se otha saide</p>

                <p>Loading...</p>
            </div>
        )
    }
}

Comments.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var cdata = { didInvalidate: '', isFetching: '', comment: {}}

    cdata = Object.assign({}, state.Comments)

    return {
        comments: cdata,
    }
}

export default connect(mapStateToProps)(Comments)