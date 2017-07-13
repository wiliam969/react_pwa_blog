import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { fetchBlogSingle } from '../../redux/actions/Blog'
import { bindActionCreators } from 'redux'

class Comments extends Component {

    constructor(props) {
        super(props)
        // this.fucku()
    }


    componentDidMount() {
        // const { dispatch, ownProps } = this.props
        // dispatch(fetchBlogSingle(this.props))
    }

    render() {
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
                    <div className="comments-wrapper">
                    </div>
                    <div className="comments-form">
                    <form>
                        <input type="text" id="name" name="name" placeholder="name"/>
                        <input type="text" id="email" name="email" placeholder="email"/>
                        <input type="text" id="website" name="website" placeholder="website"/>
                        <textarea type="text" id="comment" name="comment" placeholder="comment"/>
                        <input type="submit" name="submit" id="submit"/>
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
    var Blog = { didInvalidate: '', isFetching: ''}
    let BlogContent = Object.assign({}, state.Blog.blogcontent)
    let BlogHeader = Object.assign({}, state.Blog.blogheader)

    return {
        Blog: Blog,
        blogcontent: BlogContent,
        blogheader: BlogHeader,
    }
}

export default connect(mapStateToProps)(Comments)