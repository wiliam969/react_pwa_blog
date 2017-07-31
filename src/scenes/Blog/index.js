import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBlogSingle } from '../../services/session/actions/Blog'
import { bindActionCreators } from 'redux'

import BlogWrapper from './components/index'
import Loading from '../../components/loading'

class BlogSingle extends Component {

    constructor(props) {
        super(props)
    }


    componentDidMount() {
        const { dispatch, ownProps } = this.props
        dispatch(fetchBlogSingle(this.props))
    }

    render() {
        return (
            <div>
                {   this.props.Blog.isFetching &&
                        <Loading type="Spin"></Loading>
                }

                {   this.props.Blog.didInvalidate &&
                    <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }
                {
                    !this.props.Blog.isFetching && !this.props.Blog.didInvalidate &&
                    <BlogWrapper blogs={this.props.Blog.item}></BlogWrapper>
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