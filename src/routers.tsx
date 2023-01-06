import React, { Suspense, lazy } from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { Button, ConfigProvider, Spin } from 'antd'
import Home from './views/home/home'
import Rgb from './sample/rgb'
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
  queryString: 'encode/qs',
  qs: 'encode/qs',
  hex: 'encode/hexConversion',
  encode: 'encode/encodeDecode',
  dataURL: 'encode/dataURL',
  qrcode: 'encode/qr',
  emoji: 'emoji',
  svgpreview: 'svgpreview',
  plumFlower: 'plumFlower/plumFlower',
  post: 'onlineService/post',
  ipAddress: 'onlineService/ip',
  ip: 'onlineService/ip',
  currency: 'onlineService/currencyExchange',
  web: 'onlineService/web',
  svg: 'svgTool/svgTool',
  svgo: 'svgTool/svgO',
  svgbg: 'svgTool/svg2bg',
  toy: 'toy/toy',
  docker: 'toy/docker',
  mirrors: 'toy/mirrors'
}
const routesList = Object.entries(pathList).map(([path, file], i) => {
  const Comp = lazy(() => import('./views/' + file))
  return <Route
    path={'/' + path}
    element={<Comp />}
    key={i}
  />
})
  ;

const Routers = (
  <React.StrictMode>
    <Provider store={store}>
      {/* <ConnectedRouter history={history}> */}
      <HashRouter>
        <Suspense
          fallback={
            <Spin className="fullpage" spinning={true} size="large"></Spin>
          }>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#00b96b',
              },
            }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rgb/*" element={<Rgb />} />
              <>{routesList}</>
            </Routes>
          </ConfigProvider>
        </Suspense>
      </HashRouter>
      {/* </ConnectedRouter> */}
    </Provider>
  </React.StrictMode>
)

export default Routers
