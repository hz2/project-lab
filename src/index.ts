// @flow
import { createRoot } from 'react-dom/client';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import 'sanitize.css/sanitize.css'
import './index.less'
import Routers from './routers'

const target = document.querySelector('#root')
const root = createRoot(target!); // createRoot(container!) if you use TypeScript

root.render(Routers)

serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    console.log('PWA Update => ', registration)
  },
  onSuccess: (registration: any) => {
    console.log('PWA Success => ', registration)
  }
})
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
