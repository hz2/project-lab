// @flow
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import store from './store'
import history from './modules/history'
import Home from './views/home/home'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'

import 'sanitize.css/sanitize.css'
import './index.less'
import './index.css'

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
    component={require('./views/' + x[1]).default}
    key={i}
  />
))

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <HashRouter>
        <header></header>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route
            exact
            path="/rgb"
            component={require('./sample/rgb.js').default}
          /> */}
          {routesList}
        </Switch>
      </HashRouter>
    </ConnectedRouter>
  </Provider>,
  target
)

serviceWorkerRegistration.register()
reportWebVitals()
