import React, { Suspense, lazy } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { Spin } from 'antd'
import Home from './views/home/home'

const pathList = {
  // generator
  person: 'idcard/idcard',
  bing: 'bing',
  nasa: 'bing/nasa',
  color: 'color',
  lottery: 'lottery/lottery',
  // converter
  queryString: 'encode/qs',
  qs: 'encode/qs',
  hex: 'encode/hexConversion',
  encode: 'encode/encodeDecode',
  emoji: 'emoji',
  svgpreview: 'svgpreview',
  svgEditor: 'svgEditor/svgEditor',
  plumFlower: 'plumFlower/plumFlower',
  post: 'onlineService/post',
  ipAddress: 'onlineService/ip',
  ip: 'onlineService/ip',
  currency: 'onlineService/currencyExchange',
  svg: 'svgTool/svgTool'
}
const routesList = Object.entries(pathList).map((x, i) => (
  <Route
    exact
    path={'/' + x[0]}
    component={lazy(() => import('./views/' + x[1]))}
    key={i}
  />
))

const Routers = () => {
  return (
    <HashRouter>
      <header></header>
      <Suspense
        fallback={
          <Spin className="fullpage" spinning={true} size="large"></Spin>
        }>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/rgb"
            component={require('./sample/rgb.js').default}
          />
          {routesList}
        </Switch>
      </Suspense>
    </HashRouter>
  )
}

export default Routers
