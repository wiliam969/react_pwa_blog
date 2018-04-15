import React, { Component } from 'react'
import './boot/fonts/index'
import './normalize.css'
import './skeleton.css'
import './App.css'
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import Root from './root'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Root></Root>
      </div>

    )
  }
}

export default App;