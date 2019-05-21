import stages from '../constants/stages'
import venueFetcher from '../services/venue-collection-fetcher'
import * as places from './places'

export const baseState = () => ({
  params: {
    category: null,
    price: null
  },
  currentSearch: { items: [], area: null },
  seen: [],
  stage: stages.CATEGORY,
  result: null
})

export default {
  state: baseState(),
  modules: { places },
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
    setResult (state, {
      area, place, distance, error
    }) {
      if (error) {
        state.result = { error }
      } else {
        // set result
        state.result = { area, distance, ...place.asJSON }

        // remove from currentSearch
        const currentItemIndex = state.currentSearch.items.findIndex(item => item.id === place.id)
        if (currentItemIndex !== -1) state.currentSearch.items.splice(currentItemIndex, 1)

        // set in seen places
        state.seen = [...state.seen, place.id]
      }
      state.stage = stages.RESULT
    },
    setCurrentSearch (state, search) {
      state.currentSearch = search
      state.seen = []
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
  getters: {
    unseen (state) {
      return state.currentSearch.items.filter(item => state.seen.indexOf(item.id) < 0)
    }
  },
  actions: {
    async fetchResult ({
      state, commit, dispatch, getters
    }) {
      try {
        if (!getters.unseen.length) {
          const { area, items } = await venueFetcher(state.params)
          commit('setCurrentSearch', { items, area })
        }

        const [{ distance, id }] = state.currentSearch.items
        const place = await dispatch('places/getPlace', id)

        commit('setResult', {
          area: state.currentSearch.area,
          distance,
          place
        })
      } catch (e) {
        console.error(e)
        commit('setResult', { error: e })
        if (global.TNS_ENV !== 'production') throw e
      }
    }
  }
}
