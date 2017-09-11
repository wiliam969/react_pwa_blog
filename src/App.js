import React, { Component } from 'react'
import logo from './logo.svg'
import './normalize.css'
import './skeleton.css'
import './App.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import Root from './root'
import dotenv from 'dotenv'
import WebFont from 'webfontloader'

WebFont.load({
    google: {
        families: ['Dancing Script', 'Pacifico', 'Comfortaa', 'Oswald']
    }
})


dotenv.config({})

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<div className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          {/*<h2>Welcome to React</h2>*/}
        {/*</div>*/}
        <p className="App-intro">
          <Root></Root>
        </p>
      </div>

    )
  }
}

export default App;