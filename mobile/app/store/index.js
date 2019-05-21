import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import baseStore from './base'

Vue.use(Vuex)

export default new Vuex.Store(baseStore)
