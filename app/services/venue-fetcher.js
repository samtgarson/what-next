import * as http from 'http'
import { getCurrentLocation } from 'nativescript-geolocation'
import qs from 'querystring'

const authParams = qs.stringify({
  client_id: global.FOURSQUARE_CLIENT_ID,
  client_secret: global.FOURSQUARE_CLIENT_SECRET,
  v: '20181024'
})

const baseURL = 'https://api.foursquare.com/v2/venues'

const buildUrl = ({
  category, price, latitude, longitude, altitude
}) => {
  const query = qs.stringify({
    openNow: 1,
    ll: `${latitude},${longitude}`,
    alt: altitude,
    section: category,
    price
  })

  return `${baseURL}/explore?${query}&${authParams}`
}

export default class VenueFetcher {
  constructor (params) {
    this.params = params
  }

  run () {
    const makeSearch = ({ latitude, longitude, altitude }) => {
      const { category, price } = this.params
      const url = buildUrl({
        category, price, latitude, longitude, altitude
      })

      return http.getJSON(url)
    }

    const getDetails = data => {
      const { items } = data.response.groups[0]

      if (items.length === 0) throw new Error('No Results')

      const {
        venue: { id, location: { distance } }
      } = items[Math.floor(Math.random() * items.length)]

      this.distance = distance
      this.area = data.response.headerLocation

      const url = `${baseURL}/${id}?${authParams}`
      return http.getJSON(url)
    }

    const formatResult = ({ response: { venue } }) => ({
      area: this.area,
      venue,
      distance: this.distance
    })

    return getCurrentLocation()
      .then(makeSearch)
      .then(getDetails)
      .then(formatResult)
  }
}
