import React from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import Home from './views/home/home'

const pathList = {
  // generator
  person: 'idcard/idcard',
  bing: 'bing',
  color: 'color',
  lottery: 'lottery/lottery',
  // converter
  queryString: 'encode/qs',
  hex: 'encode/hexConversion',
  encode: 'encode/encodeDecode',
  emoji: 'emoji',
  svgpreview: 'svgpreview',
  svgEditor: 'svgEditor/svgEditor',
  plumFlower: 'plumFlower/plumFlower',
  ip: 'onlineService/ip'
}
const routesList = Object.entries(pathList).map((x, i) => (
  <Route
    exact
    path={'/' + x[0]}
    component={require('./views/' + x[1]).default}
    key={i}
  />
))

const Routers = () => {
  return (
    <HashRouter>
      <header></header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/rgb"
          component={require('./sample/rgb.js').default}
        />
        {routesList}
      </Switch>
    </HashRouter>
  )
}

export default Routers
