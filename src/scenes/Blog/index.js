import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchBlogSingle } from '../../redux/actions/Blog'
import { bindActionCreators } from 'redux'

import BlogHeader from './components/blog/blogheader'
import BlogContent from './components/blog/blogcontent'
// import LazyBlogItemLoad from './components/LazyBlogItemLoad'
import Comments from './components/comments/index'

class BlogSingle extends Component {

    isComment = false

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
                    <h1 style={this.FetchingStyle}>im Fetching GUYS hold on dont stress me !</h1>
                }

                {   this.props.Blog.didInvalidate &&
                    <h1 style={this.FetchingStyle}> NOOOOOOOOOOOOOOOOOOO LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }

                {   !this.props.Blog.didInvalidate && !this.props.Blog.isFetching &&
                    <div>
                    <BlogHeader blogheader={this.props.blogheader}></BlogHeader>
                    <BlogContent blogcontent={this.props.blogcontent}></BlogContent>
                        {this.state.isComment ?
                            <div>
                                <Comments blogid={this.props.match.params.id}></Comments>
                                <div style={checkifworks}></div>
                            </div>
                            :
                            <button onClick={this.handleClick}>Load Comments ...</button>
                        }
                    </div>
                }

                <p>What up Mate dis is the OP Blog Home</p>
                    {/*<Quotation></Quotation>*/}
                <p>Helo from se otha saide</p>

                <p>Loading...</p>
            </div>
        )
    }
}

BlogSingle.propTypes = {
    dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
    var Blog = { didInvalidate: '', isFetching: ''}
    let BlogContent = Object.assign({}, state.Blog.blogcontent)
    let BlogHeader = Object.assign({}, state.Blog.blogheader)

    return {
        Blog: Blog,
        blogcontent: BlogContent,
        blogheader: BlogHeader,
    }
}

export default connect(mapStateToProps)(BlogSingle)