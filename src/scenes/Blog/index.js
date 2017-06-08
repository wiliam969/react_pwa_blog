import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    // requestBlogSingle,
    // receiveBlogSingle,
    fetchBlogSingle
} from '../../redux/actions/Blog'

import BlogHeader from './components/blogheader'
import BlogContent from './components/blogcontent'

class BlogSingle extends Component {

    componentDidMount() {
        // const blogid = this.props.match.params.id

        // const { dispatch, fetchBlogSingle } = this.props
        //
        // dispatch(fetchBlogSingle(blogid))

    }

    render() {
        return (
            <div>
                {   this.props.Blog.isFetching &&
                <h1 style={this.FetchingStyle}>im Fetching GUYS hold on dont stress me !</h1>
                }

                {   this.props.Blog.didInvalidate &&
                <h1 style={this.FetchingStyle}>LOL WUT Something went WRONG i guess .... holy fuck terribly wrong</h1>
                }

                {   !this.props.Blog.didInvalidate && !this.props.Blog.isFetching &&
                    <div>
                        <BlogHeader blogheader={this.props.blogheader}></BlogHeader>
                        <BlogContent blogcontent={this.props.blogcontent}></BlogContent>
                    </div>
                }

                <p>What up Mate dis is the OP Blog Home</p>
                {/*<Quotation></Quotation>*/}
                <p>Helo from se otha saide</p>
            </div>
        )
    }
}

BlogSingle.propTypes = {
    // blogs: PropTypes.array
}

const mapStateToProps = (state) => {

    var Blog = { didInvalidate: '', isFetching: ''}

    let BlogContent = Object.assign({}, state.Blog.blogcontent)
    let BlogHeader = Object.assign({}, state.Blog.blogheader)

    return {
        Blog: Blog,
        blogcontent: BlogContent,
        blogheader: BlogHeader,
    }
}

export default connect(mapStateToProps,fetchBlogSingle("1"))(BlogSingle)
