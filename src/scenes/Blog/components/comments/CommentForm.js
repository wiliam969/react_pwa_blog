import React, { Component } from 'react'

export default class CommentFrom extends Component {
    render() {
        return (
            <div className="comments-form">
                <form onSubmit={this.onSubmit}>
                    <input type="text" id="name" name="commentname" placeholder="name" value={this.props.data.commentname} onChange={this.props.onValueChange}/>
                    <input type="text" id="email" name="commentemail" placeholder="email" value={this.props.data.commentemail} onChange={this.props.onValueChange}/>
                    <input type="text" id="website" name="commentwebsite" placeholder="website" value={this.props.data.commentwebsite} onChange={this.props.onValueChange}/>
                    <textarea type="text" id="comment" name="commentpost" placeholder="comment" value={this.props.data.commentpost} onChange={this.props.onValueChange}/>
                    <button type="submit" name="submit" id="submit">Submit</button>
                </form>
            </div>
        )
    }
}