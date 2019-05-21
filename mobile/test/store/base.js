import Place from '../../app/services/place'
import store, { baseState } from '../../app/store/base'
import venueFetcher from '../../app/services/venue-collection-fetcher'
import errors from '../../app/constants/errors'

jest.mock('../../app/services/place-client')
jest.mock('../../app/services/venue-collection-fetcher')

const distance = 123
const place1 = {
  id: '1', name: 'place1', categories: [{ name: 'category1' }], location: { distance }
}
const place2 = {
  id: '2', name: 'place2', categories: [{ name: 'category1' }], location: { distance }
}
const place3 = {
  id: '3', name: 'place3', categories: [{ name: 'category1' }], location: { distance }
}

let ctx
const commit = jest.fn((mutation, params) => {
  if (mutation === 'setCurrentSearch') {
    ctx.state.currentSearch = params
  }
})
beforeEach(() => {
  ctx = {
    state: baseState(),
    commit,
    dispatch: jest.fn(),
    getters: {
      unseen: []
    }
  }
  ctx.state.params = {
    category: 'category',
    price: 'price'
  }
})

describe('base store', () => {
  describe('actions', () => {
    const area = 'Area'
    const items = [place1, place2, place3]
    const run = () => {
      jest.clearAllMocks()
      return store.actions.fetchResult(ctx)
    }

    beforeEach(async () => {
      venueFetcher.mockImplementation(() => ({ area, items }))
      await run()
    })

    describe('fetchResult', () => {
      describe('when there is no current search', () => {
        it('fetches some places', () => {
          expect(venueFetcher).toHaveBeenCalledWith(ctx.state.params)
        })

        it('commits the search', () => {
          expect(ctx.commit).toHaveBeenCalledWith('setCurrentSearch', { area, items })
        })

        describe('when there are no search results', () => {
          const error = new Error(errors.NO_RESULTS)
          let thrown
          beforeEach(async () => {
            venueFetcher.mockImplementationOnce(() => { throw error })
            try {
              await run()
            } catch (e) {
              thrown = e
            }
          })

          it('is the correct error', () => {
            expect(thrown).toEqual(error)
          })

          it('commits the error', () => {
            expect(ctx.commit).toHaveBeenCalledTimes(1)
            expect(ctx.commit).toHaveBeenCalledWith('setResult', { error })
          })
        })
      })

      describe('when there is a current search', () => {
        const place = new Place(place1)

        beforeEach(async () => {
          ctx.getters.unseen = [place1, place2]
          ctx.state.currentSearch = { items, area }
          ctx.dispatch.mockImplementationOnce(() => place)
          await run()
        })

        it('fetches the next place', () => {
          expect(ctx.dispatch).toHaveBeenCalledWith('places/getPlace', place1.id)
        })

        it('commits the result', () => {
          expect(ctx.commit).toHaveBeenCalledTimes(1)
          expect(ctx.commit).toHaveBeenCalledWith('setResult', { area, place })
        })

        describe('but they have all been seen', () => {
          beforeEach(async () => {
            ctx.getters.unseen = []
            ctx.state.currentSearch = { items, area }
            await run()
          })

          it('fetches some places', () => {
            expect(venueFetcher).toHaveBeenCalledWith(ctx.state.params)
          })

          it('commits the search', () => {
            expect(ctx.commit).toHaveBeenCalledWith('setCurrentSearch', { area, items })
          })
        })
      })
    })
  })
})
