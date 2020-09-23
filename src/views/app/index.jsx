import React from 'react'
// import { Route, Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Home from '../home/home'

const pathList = {
  idcard: 'idcard/idcard',
  qs: 'qs',
  bing: 'bing',
  emoji: 'emoji',
  svgpreview: 'svgpreview'
}
const routesList = Object.entries(pathList).map((x, i) => (
  <Route
    exact
    path={'/' + x[0]}
    component={require('../' + x[1]).default}
    key={i}
  />
))

const App = () => (
  <div>
    <header></header>

    <main style={{ padding: '25px' }}>
      <Switch>
        <Route exact path="/" component={Home} />
        {routesList}
      </Switch>
    </main>
  </div>
)

export default App
