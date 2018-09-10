import React, { Component } from 'react'

export default class CustomSite extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: []
        }
    }

    componentDidMount() {

        const slug = this.props.match.params.slug

        return fetch(process.env.REACT_APP_API_URI + 'pages?slug=' + slug, {method: 'GET'})
            .then((response) => response.json())
            .then(responseJson => {
                return this.setState ({ content: responseJson[0].content.rendered})
            }).catch(error => {
                return error
            })

    }

    render() {
        return (
            <div className="container">
                {this.state.content ?
                    <div dangerouslySetInnerHTML={{__html: this.state.content}}/>
                    :
                    <h1>page not found...</h1>
                }
            </div>
        )
    }
}