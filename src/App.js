import React, { Component } from 'react'
import './boot/bootFonts'
import 'normalize.css'
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