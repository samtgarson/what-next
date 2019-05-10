import * as http from 'tns-core-modules/http'
import qs from 'querystring'

const authParams = qs.stringify({
  client_id: global.FOURSQUARE_CLIENT_ID,
  client_secret: global.FOURSQUARE_CLIENT_SECRET,
  v: '20181024'
})

const baseURL = 'https://api.foursquare.com/v2/venues'

const buildUrl = ({
  category, price, latitude, longitude, altitude, radius
}) => {
  const params = {
    openNow: 1,
    ll: `${latitude},${longitude}`,
    alt: altitude,
    section: category,
    price
  }

  if (radius) params.radius = radius
  const query = qs.stringify(params)

  return `${baseURL}/explore?${query}&${authParams}`
}

export const search = async params => {
  const url = buildUrl(params)
  const { response: { headerLocation: area, groups } } = await http.getJSON(url)
  const { items } = groups[0]
  return { items, area }
}

export const fetch = async id => {
  const detailUrl = `${baseURL}/${id}?${authParams}`
  const { response: { venue } } = await http.getJSON(detailUrl)
  return venue
}
