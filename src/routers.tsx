import { Suspense, lazy } from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import Home from './views/home/home'
import Header from './views/components/Header'
import React from 'react'
import routerData from './routerData'

const routesList = routerData.map(({ path, comp }, i) => {
  const [dir, filename] = comp.split('/')
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
