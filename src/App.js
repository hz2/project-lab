// @flow
import React, { Component } from 'react'
import { Button } from 'antd'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button type="primary">Button</Button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </>
    )
  }
}

export default App
