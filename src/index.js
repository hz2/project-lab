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
  svgEditor: 'svgEditor/svgEditor',
  plumFlower: 'plumFlower/plumFlower'
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
        {/* <header></header> */}
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

// let deferredPrompt = null;
// window.addEventListener("beforeinstallprompt", (e) => {
//   deferredPrompt = e;
// });
// async function installPWA() {
//   if (deferredPrompt) {
//     deferredPrompt.prompt();
//     deferredPrompt.userChoice.then(({ outcome }) => {
//       if (outcome === "accepted") {
//         console.log("Your PWA has been installed");
//       } else {
//         console.log("User chose to not install your PWA");
//       }
//       deferredPrompt = null;
//     });
//   }
// }
