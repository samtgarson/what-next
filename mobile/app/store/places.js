import Place from '../services/place'

export const namespaced = true

export const state = { all: {} }

export const getters = {
  records: ({ all }) => Object.values(all).map(p => new Place(p)),
  byId: ({ all }) => id => all[id] && new Place(all[id])
}

export const mutations = {
  save (s, place) {
    s.all[place.id] = place
  }
}

export const actions = {
  async getPlace (ctx, id) {
    const existing = ctx.getters.byId(id)
    if (existing) return existing

    const place = await Place.fromSearch(id)
    ctx.commit('save', place)

    return place
  }
}
