import React, { Component } from 'react'

export default class Blog extends Component {
    componentDidMount() {

    }
    render() {
        return (
            <div>
                { this.props.content.length > 0 ?
                    <div>
                        <p>{this.props.content.bloginformation.id}</p>
                        <p>{this.props.content.bloginformation.author}</p>
                        <p>{this.props.content.bloginformation.date}</p>
                        <p>{this.props.content.bloginformation.content.rendered}</p>
                        <p>{this.props.content.bloginformation.title.rendered}</p>
                    </div>
                    :
                    <div>
                        <h1>Something went clearly wrong this should never happen contact a admin or somethin holy moly</h1>
                    </div>
                }

            </div>
        )
    }
}