import React from 'react'
// import { Route, Link } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Home from '../home/home'

const pathList = {
  idcard: 'idcard/idcard',
  lottery: 'lottery/lottery',
  encode: 'encode',
  bing: 'bing',
  color: 'color',
  emoji: 'emoji',
  svgpreview: 'svgpreview',
  svgEditor: 'svgEditor/svgEditor'
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
  <>
    <header></header>
    <Switch>
      <Route exact path="/" component={Home} /> {routesList}
    </Switch>
  </>
)

export default App
