import React from 'react'
// import { Route, Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import idc from '../idcard'
import qs from '../qs'

const App = () => (
  <div>
    <header>
      {/* <Link to="/">Home</Link>
      <Link to="/about-us">About</Link> */}
    </header>

    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about-us" component={About} />
        <Route exact path="/idc" component={idc} />
        <Route exact path="/qs" component={qs} />
      </Switch>
    </main>
  </div>
)

export default App
