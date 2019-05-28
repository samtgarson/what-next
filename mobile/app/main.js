import Vue from 'nativescript-vue'
import * as firebase from 'nativescript-plugin-firebase'
import { device } from 'tns-core-modules/platform'

import Layout from './app'
import Home from './pages/home'

import Box from './components/box'

import store from './store'

if (global.TNS_ENV !== 'production' && global.VUE_DEVTOOLS) {
  Vue.use(require('nativescript-vue-devtools'))
}

Vue.component('Layout', Layout)
Vue.component('Box', Box)

Vue.prototype.$analyticsEvent = (key, params) => {
  const parameters = Object
    .keys(params)
    .reduce((arr, p) => [...arr, { key: p, value: params[p] }], [])

  firebase.analytics.logEvent({ key, parameters })
}

new Vue({
  render: h => h('frame', [h(Home)]),
  async mounted() {
    await firebase.init()
    firebase.analytics.setUserId({ userId: device.uuid })
    firebase.crashlytics.setUserId(device.uuid)
  },
  store
}).$start()
