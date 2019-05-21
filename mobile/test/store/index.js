import store from '../../app/store'
import venueFetcher from '../../app/services/venue-collection-fetcher'
import { fetch } from '../../app/services/place-client'

jest.mock('../../app/services/place-client')
jest.mock('../../app/services/venue-collection-fetcher')
jest.mock('nativescript-vue', () => require('vue'))

const place1 = { id: '1', name: 'place1', categories: [{ name: 'category1' }] }
const place2 = { id: '2', name: 'place2', categories: [{ name: 'category1' }] }
const area = 'area'

const price = 1
const category = 'food'

describe('store', () => {
  describe('searching for venues', () => {
    beforeEach(() => {
      venueFetcher.mockImplementation(() => ({ area, items: [place1, place2] }))
      fetch.mockImplementation(id => ({ 1: place1, 2: place2 }[id]))
    })

    it('behaves correctly', async () => {
      store.commit('setCategory', category)
      store.commit('setPrice', price)

      // it fetches a fresh search
      await store.dispatch('fetchResult')

      expect(venueFetcher).toHaveBeenCalledWith({ category, price })
      expect(fetch).toHaveBeenCalledWith(place1.id)

      expect(store.state.result).toMatchObject({ id: place1.id, name: place1.name, area })
      expect(store.state.seen).toContain(place1.id)

      fetch.mockClear()
      venueFetcher.mockClear()

      // it uses the existing search items
      await store.dispatch('fetchResult')

      expect(venueFetcher).not.toHaveBeenCalled()
      expect(fetch).toHaveBeenCalledWith(place2.id)
      expect(store.state.result).toMatchObject({ id: place2.id, name: place2.name, area })

      fetch.mockClear()
      venueFetcher.mockClear()

      // it fetches again but keeps the fetched place records
      await store.dispatch('fetchResult')

      expect(venueFetcher).toHaveBeenCalledWith({ category, price })
      expect(fetch).not.toHaveBeenCalled()

      expect(store.state.result).toMatchObject({ id: place1.id, name: place1.name, area })
      expect(store.state.seen).toContain(place1.id)
    })
  })
})
