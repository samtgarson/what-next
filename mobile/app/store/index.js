import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import stages from '../constants/stages'
import venueFetcher from '../services/venue-fetcher'

Vue.use(Vuex)

const baseState = () => ({
  params: {
    category: null,
    price: null
  },
  stage: stages.CATEGORY,
  result: null
})

export default new Vuex.Store({
  state: baseState(),
  mutations: {
    setCategory (state, cat) {
      state.params.category = cat
      state.params.price = null
      state.stage = stages.PRICE
    },
    setPrice (state, price) {
      state.params.price = price
      state.stage = stages.LOADING
    },
    setResult (state, res) {
      state.result = res
      state.stage = stages.RESULT
    },
    reset (state) {
      Object.entries(baseState()).forEach(([key, val]) => {
        state[key] = val
      })
    },
    searchAgain (state) {
      state.stage = stages.LOADING
    }
  },
  actions: {
    async fetchResult ({ state, commit }) {
      try {
        const params = Object.assign({}, state.params)
        const { venue, area, distance } = await venueFetcher(params)
        const { name: category = '' } = venue.categories.find(c => c.primary) || {}
        commit('setResult', {
          area,
          name: venue.name,
          category,
          distance,
          url: venue.url,
          photo: venue.bestPhoto,
          foursquare: venue.canonicalUrl
        })
      } catch (e) {
        console.error(e)
        commit('setResult', { error: e })
      }
    }
  }
})
