import * as http from 'http'
import { getCurrentLocation } from 'nativescript-geolocation'

const CLIENT_ID = '0UEDOFOFV1LV2E0D1BRP3OW122CGX0IG2FTKAYJ00ZGY2DKY'
const CLIENT_SECRET = 'KJMVEAOMV1TZFTKMLTMHYQE0JXVYLN5MIEUIUHIJG4ZBQTUG'

const baseURL = 'https://api.foursquare.com/v2/venues'
const authParams = `&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20181024`

const buildUrl = ({ category, price, latitude, longitude, altitude }) =>
  `${`${baseURL}/explore?openNow=1`
        + `&ll=${latitude},${longitude}`
        + `&alt=${altitude}`
        + `&section=${category}`
        + `&price=${price}`}${
    authParams}`

export default class VenueFetcher {
  constructor (params) {
    this.params = params
  }

  run () {
    return getCurrentLocation()
      .then(({ latitude, longitude, altitude }) => {
        const { category, price } = this.params
        const url = buildUrl({ category, price, latitude, longitude, altitude })

        return http.getJSON(url)
      }).then(data => {
        const items = data.response.groups[0].items

        if (items.length === 0) throw new Error('No Results')

        const { venue: { id, location: { distance } } } = items[Math.floor(Math.random() * items.length)]

        this.distance = distance
        this.area = data.response.headerLocation
        return id
      }).then(id => {
        const url = `${baseURL}/${id}?${authParams}`
        return http.getJSON(url)
      })
      .then(({ response: { venue } }) => ({
        area: this.area,
        venue,
        distance: this.distance
      }))
  }
}
