import React from 'react'
// import { Route, Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Home from '../home'
import idc from '../idcard'
import qs from '../qs'
import svg from '../svg'

const App = () => (
  <div>
    <header></header>

    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/idc" component={idc} />
        <Route exact path="/qs" component={qs} />
        <Route exact path="/svg" component={svg} />
      </Switch>
    </main>
  </div>
)

export default App
