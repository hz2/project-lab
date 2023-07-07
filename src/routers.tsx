import React, { Suspense, lazy } from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import Home from './views/home/home'
import Header from './views/components/Header'

const pathList = {
  // generator
  person: 'idcard/idcard',
  bing: 'bing/index',
  nasa: 'bing/nasa',
  color: 'color/index',
  gradient: 'color/gradient',
  lottery: 'lottery/lottery',
  // converter
  transform: 'encode/transform',
  qs: 'encode/qs',
  hex: 'encode/hexConversion',
  encode: 'encode/encodeDecode',
  dataURL: 'encode/dataURL',
  qrcode: 'encode/qr',
  emoji: 'emoji/index',
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
  mirrors: 'toy/mirrors',
  chat: 'toy/chat',
  bookmark: 'bookmarkTool/bookmark'
}
const routesList = Object.entries(pathList).map(([path, file], i) => {
  const [dir, filename] = file.split('/')
  const Comp = lazy(() => import(`./views/${dir}/${filename}.tsx`))
  return <Route
    path={'/' + path}
    element={<Comp />}
    key={i}
  />
})
  ;

const Routers = (
  <React.StrictMode>
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
            <>{routesList}</>
          </Routes>
        </ConfigProvider>
      </Suspense>
    </HashRouter>
  </React.StrictMode>
)

export default Routers
