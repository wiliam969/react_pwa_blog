import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLazyBlog } from '../../../../redux/actions/Blog'

import BlogContent from './blogcontent'
import BlogHeader from './blogheader'

class LazyBlogItemLoad extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message:'not at bottom'
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.setState({
                message:'bottom reached'
            });
            console.log("hui we did it")
            const { dispatch, ownProps } = this.props
            dispatch(fetchLazyBlog(this.props))
        } else {
            this.setState({
                message:'not at bottom'
            });
            console.log("wow we are still in the middle gg wp boyz")
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        return (
            <div>
                <BlogHeader blogheader={this.props.blogheader}></BlogHeader>
                <BlogContent blogcontent={this.props.blogcontent}></BlogContent>
            </div>
        );
    }
}

LazyBlogItemLoad.propTypes = {
}

LazyBlogItemLoad.defaultProps = {
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

export default connect(mapStateToProps)(LazyBlogItemLoad)