import Vue from 'nativescript-vue'
import VueDevtools from 'nativescript-vue-devtools'

import Layout from './app'
import Home from './pages/home'

import Box from './components/box'

import store from './store'

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
// Vue.config.silent = (TNS_ENV === 'production')

Vue.component('Layout', Layout)
Vue.component('Box', Box)

// Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

new Vue({
  render: h => h('frame', [h(Home)]),
  store
}).$start()
