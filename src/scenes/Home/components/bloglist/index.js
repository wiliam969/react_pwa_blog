import React, { Component } from 'react'
import Picture from '../../../components/Picture/index'

export default class BlogList extends Component {

    defaultAttachment = {
        height: "100px", width: "100%", backgroundColor:"grey",
    }

    componentDidMount() {
        console.log("lol it's working")
    }
    //
    // lazyload() {
    //     console.log("hello")
    //     inView('.blog-attachment')
    //         .on('enter', el => {
    //             console.log(el)
    //
    //             let id = el.parentNode;
    //             let key = id.getAttribute("data-key")
    //
    //             let pic = new Picture()
    //             let thumbnail_url = pic.getThumbnailPicture(key)
    //
    //             console.log(id)
    //             console.log(key)
    //             console.log(thumbnail_url)
    //             console.log("lazyload img")
    //             el.style.opacity = 0.1
    //         }).on('exit', el => {
    //         el.style.opacity = 1.0
    //     })
    // }
    // renderThumbnail(postid) {

        // var attachment = this.getThumbnailPicture(postid)

        // var Attachment = {
        //     background: "url(" + attachment + ") center center no-repeat",
        //     height:"100px",
        //     width:"100px",
        // }

        // return Attachment
    // }
    render() {
        return (
            <div className="container">
                {this.props.blogs.length > 0 &&
                    this.props.blogs.map((post,index) =>
                        <div className="box" key={index} data-key={index}>
                            {console.log(post)}
                            {console.log(index)}
                            <div className="blog-attachment" style={ this.defaultAttachment }></div>
                            <Picture blogid={post.id} type="thumbnail"></Picture>
                            <div className="blog-title">{post.title.rendered}</div>
                            <div className="blog-preview-text">{post.content.rendered}</div>
                            <div className="readmore"><a href={post.link}>Weiterlesen</a></div>
                        </div>
                    )
                }
            </div>
        )
    }
}