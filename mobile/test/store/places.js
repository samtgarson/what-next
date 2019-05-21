import Place from '../../app/services/place'
import { getters, mutations, actions } from '../../app/store/places'
import { fetch } from '../../app/services/place-client'

jest.mock('../../app/services/place-client')

const place1 = { id: '1', name: 'place1' }
const place2 = { id: '2', name: 'place2' }
const place3 = { id: '3', name: 'place3' }

let state
beforeEach(() => {
  state = {
    all: {
      [place1.id]: place1,
      [place2.id]: place2
    }
  }
})

describe('place store', () => {
  describe('getters', () => {
    describe('records', () => {
      let result

      beforeEach(() => {
        result = getters.records(state)
      })

      it('returns all the places', () => {
        expect(result.map(({ id }) => id)).toContain(place1.id, place2.id)
      })

      it('returns Places', () => {
        result.forEach(res => {
          expect(res).toBeInstanceOf(Place)
        })
      })
    })

    describe('byId', () => {
      let result
      const { id } = place1

      beforeEach(() => {
        result = getters.byId(state)
      })

      it('returns a function', () => {
        expect(result).toBeInstanceOf(Function)
      })

      it('returns the correct place', () => {
        const place = result(id)

        expect(place).toMatchObject(place1)
      })

      it('returns a Place', () => {
        expect(result(id)).toBeInstanceOf(Place)
      })
    })
  })

  describe('mutations', () => {
    describe('save', () => {
      it('saves the place', () => {
        mutations.save(state, place3)

        expect(state.all).toHaveProperty(place3.id, place3)
      })
    })
  })

  describe('actions', () => {
    describe('getPlace', () => {
      let result

      const ctx = {
        getters: {
          byId: jest.fn()
        },
        commit: jest.fn()
      }

      beforeEach(() => {
        jest.spyOn(Place, 'fromSearch')
      })

      describe('when place is already fetched', () => {
        const { id } = place1

        beforeEach(async () => {
          ctx.getters.byId.mockImplementationOnce(() => new Place(place1))
          result = await actions.getPlace(ctx, id)
        })

        it('does not fetch a new place', () => {
          expect(Place.fromSearch).not.toHaveBeenCalled()
        })

        it('does not commit a new place', () => {
          expect(ctx.commit).not.toHaveBeenCalled()
        })

        it('returns the correct place', () => {
          expect(result).toEqual(place1)
        })
      })

      describe('when the place is not present locally', () => {
        const id = 4
        const expectedPlace = fetch(id)

        beforeEach(async () => {
          result = await actions.getPlace(ctx, id)
        })

        it('fetches a new place', () => {
          expect(Place.fromSearch).toHaveBeenCalledWith(id)
        })

        it('commits a new place', () => {
          expect(ctx.commit).toHaveBeenCalledWith('save', expectedPlace)
        })

        it('returns the correct place', () => {
          expect(result).toStrictEqual(new Place(expectedPlace))
        })
      })
    })
  })
})
