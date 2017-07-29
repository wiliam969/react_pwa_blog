import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBlogSingle } from '../../services/session/actions/Blog'
import { bindActionCreators } from 'redux'

import Blog from './components/blog/blog'
import Comments from './components/comments/index'
import Loading from '../../components/loading'

class BlogSingle extends Component {

    constructor(props) {
        super(props)
        this.state = { isComment: false}

        this.handleClick = this.handleClick.bind(this);
    }


    componentDidMount() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    handleClick() {
        this.setState(prevState => ({
            isComment: !prevState.isComment
        }));
    }


    render() {
        var checkifworks = {
            height: 2000 + 'px',
            width: 100 + '%',
        }
        return (
            <div>

                {   this.props.Blog.isFetching &&
                    <div>
                        <Loading></Loading>
                        <h1 style={this.FetchingStyle}>im Fetching GUYS hold on dont stress me !</h1>
                    </div>
                }

                {   this.props.Blog.didInvalidate &&
                    <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }
                {
                    !this.props.Blog.isFetching && !this.props.Blog.didInvalidate &&
                    <div>
                        <Blog content={this.props.Blog.item}></Blog>

                        {this.state.isComment ?
                            <div>
                                <Comments blogid={this.props.match.params.id}></Comments>
                            </div>
                            :
                            <button onClick={this.handleClick}>Load Comments ...</button>
                        }
                    </div>
                }
            </div>
        )
    }
}

BlogSingle.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var blog = { didInvalidate: '', isFetching: '', item: { id: "", author: "", date: "", content:"LOREI", title: "dasd"}}

    blog = Object.assign({}, state.Blog)

    return {
        Blog: blog,
    }
}

export default connect(mapStateToProps)(BlogSingle)