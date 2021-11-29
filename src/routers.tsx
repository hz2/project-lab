import React, { Suspense, lazy } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { Spin } from 'antd'
import Home from './views/home/home'
import Header from './views/components/Header'

import store from './store'
import history from './modules/history'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'


const pathList = {
  // generator
  person: 'idcard/idcard',
  bing: 'bing',
  nasa: 'bing/nasa',
  color: 'color',
  gradient: 'color/gradient',
  lottery: 'lottery/lottery',
  // converter
  queryString: 'encode/qs',
  qs: 'encode/qs',
  hex: 'encode/hexConversion',
  encode: 'encode/encodeDecode',
  dataURL: 'encode/dataURL',
  emoji: 'emoji',
  svgpreview: 'svgpreview',
  svgEditor: 'svgEditor/svgEditor',
  plumFlower: 'plumFlower/plumFlower',
  post: 'onlineService/post',
  ipAddress: 'onlineService/ip',
  ip: 'onlineService/ip',
  currency: 'onlineService/currencyExchange',
  svg: 'svgTool/svgTool',
  svgo: 'svgTool/svgO',
  svgbg: 'svgTool/svg2bg',
  toy: 'toy/toy',
  docker: 'toy/docker'
}
const routesList = Object.entries(pathList).map((x, i) => (
  <Route
    exact
    path={'/' + x[0]}
    component={lazy(() => import('./views/' + x[1]))}
    key={i}
  />
))

const Routers = <Provider store={store}>
  <ConnectedRouter history={history}>
    <HashRouter>
      <Suspense
        fallback={
          <Spin className="fullpage" spinning={true} size="large"></Spin>
        }>
        <Header />
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
  </ConnectedRouter>
</Provider>

export default Routers
