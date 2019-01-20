import * as http from 'http'
import { getCurrentLocation } from 'nativescript-geolocation'
import qs from 'querystring'
import errors from '../constants/errors'

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

const makeSearch = async ({ category, price }) => {
  let pos
  try {
    pos = await getCurrentLocation()
  } catch (e) {
    throw new Error(errors.LOCATION_DENIED)
  }

  const { latitude, longitude, altitude } = pos
  const url = buildUrl({
    category, price, latitude, longitude, altitude
  })
  const { response: { headerLocation: area, groups } } = await http.getJSON(url)
  const { items } = groups[0]
  return { items, area }
}

const getDetails = async id => {
  const detailUrl = `${baseURL}/${id}?${authParams}`
  const { response: { venue } } = await http.getJSON(detailUrl)
  return venue
}

const makeSelection = items => {
  const {
    venue: { id, location: { distance } }
  } = items[Math.floor(Math.random() * items.length)]

  return { id, distance }
}

export default async params => {
  const { items, area } = await makeSearch(params)
  if (items.length === 0) throw new Error(errors.NO_RESULTS)

  const { id, distance } = makeSelection(items)
  const venue = await getDetails(id)

  return { area, venue, distance }
}
