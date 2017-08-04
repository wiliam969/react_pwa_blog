import React, { Component } from 'react'
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendComments,fetchComments,fetchLazyComments,showComments } from './commentsActions'
import Loading from '../../shared/loading/loading'

class Comments extends Component {

    CommentsPage = 1

    constructor(props) {
        super(props)

        this.state = {
            commentname:2,
            commentemail:2,
            commentwebsite:2,
            commentpost:2,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loadMoreComments = this.loadMoreComments.bind(this);
        this.loadComments = this.loadComments.bind(this);
    }


    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchComments(this.props,this.CommentsPage))
        this.CommentsPage++
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    submitForm() {
        const { dispatch } = this.props
        dispatch(sendComments(this.state))
    }

    loadMoreComments() {
        const { dispatch } = this.props
        dispatch(fetchLazyComments(this.props,this.CommentsPage))
        this.CommentsPage++
    }

    loadComments() {
        const { dispatch } = this.props
        dispatch(showComments(this.props))
    }

    render() {
        if(typeof this.props.comments !== 'undefined' && typeof Object.keys(this.props.comments) !== 'undefined' && Object.keys(this.props.comments).length > 0) {
            return (
                <div>
                    {this.props.comments.isComment
                        ?
                        <div>
                            {   this.props.comments.isFetching &&
                            <div>
                                <Loading type="Spin"></Loading>
                                <h1 style={this.FetchingStyle}>im Fetching GUYS hold on dont stress me !</h1>
                            </div>
                            }

                            {   this.props.comments.didInvalidate &&
                            <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                            }

                            {   !this.props.comments.didInvalidate && !this.props.comments.isFetching &&
                            <div>
                                <div className="comments-wrapper">
                                    <CommentList comments={this.props.comments.item}></CommentList>

                                    {this.props.comments.isFetchingLazy &&
                                    <Loading type="Spin"></Loading>
                                    }

                                    {this.props.comments.stopComment ?
                                        <p>No more Comments found</p>
                                        :
                                        <button onClick={this.loadMoreComments}>Load More Comments</button>
                                    }

                                    <CommentForm onSubmit={e => {
                                        e.preventDefault()
                                        this.submitForm()
                                    }} onValueChange={this.handleInputChange} data={this.state}></CommentForm>
                                </div>
                            </div>
                            }
                        </div>
                    :
                        <button onClick={this.loadComments}>Load Comments...</button>
                    }
                </div>
            )
        } else {
            return (
                <div>
                    <h1>BIN KAPUTT</h1>
                </div>
            )
        }
    }
}

Comments.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var cdata = { didInvalidate: '', isFetching: '', item: {}}
    var blogid = ""

    blogid = ownProps.blogid
    cdata = Object.assign({}, state.Comments)

    return {
        comments: cdata.comments[blogid],
    }
}

export default connect(mapStateToProps)(Comments)