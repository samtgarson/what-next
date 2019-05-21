import { fetch } from './place-client'

export default class Place {
  constructor (attrs) {
    Object.entries(attrs).forEach(([key, val]) => {
      this[key] = val
    })
  }

  static async fromSearch (id) {
    const attrs = await fetch(id)
    return new Place(attrs)
  }

  get category () {
    const categories = this.categories || []
    const { name } = categories.find(c => c.primary) || categories[0]
    return name
  }

  get asJSON () {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      url: this.url,
      photo: this.bestPhoto,
      foursquare: this.canonicalUrl
    }
  }
}
