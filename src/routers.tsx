import React, { Suspense, lazy } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { Spin } from 'antd'
import Home from './views/home/home'
import Header from './views/components/Header'
import { Provider } from 'react-redux'
import { store } from './store'

// import { ConnectedRouter } from 'connected-react-router'
// import { createBrowserHistory } from 'history'
// const history = createBrowserHistory()

const pathList = {
  // generator
  person: 'idcard/idcard',
  bing: 'bing',
  nasa: 'bing/nasa',
  color: 'color',
  gradient: 'color/gradient',
  lottery: 'lottery/lottery',
  // converter
  queryString: 'encode/qs.tsx',
  qs: 'encode/qs.tsx',
  hex: 'encode/hexConversion.tsx',
  encode: 'encode/encodeDecode.tsx',
  dataURL: 'encode/dataURL.tsx',
  emoji: 'emoji',
  svgpreview: 'svgpreview',
  plumFlower: 'plumFlower/plumFlower',
  post: 'onlineService/post',
  ipAddress: 'onlineService/ip.tsx',
  ip: 'onlineService/ip.tsx',
  currency: 'onlineService/currencyExchange.tsx',
  svg: 'svgTool/svgTool',
  svgo: 'svgTool/svgO',
  svgbg: 'svgTool/svg2bg',
  toy: 'toy/toy',
  docker: 'toy/docker'
}
const routesList = Object.entries(pathList).map(([path, file], i) => (
  <Route
    exact
    path={'/' + path}
    component={lazy(() => import('./views/' + file))}
    key={i}
  />
))

const Routers = (
  <React.StrictMode>
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
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
              component={require('./sample/rgb').default}
            />
            {routesList}
          </Switch>
        </Suspense>
      </HashRouter>
      {/* </ConnectedRouter> */}
    </Provider>
  </React.StrictMode>
)

export default Routers
