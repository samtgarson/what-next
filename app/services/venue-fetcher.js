
import { getCurrentLocation } from 'nativescript-geolocation'
import errors from '../constants/errors'
import { search, fetch } from './place-client'


const makeSearch = async ({ category, price }) => {
  let pos
  try {
    pos = await getCurrentLocation()
  } catch (e) {
    throw new Error(errors.LOCATION_DENIED)
  }

  const { latitude, longitude, altitude } = pos
  return search({
    category, price, latitude, longitude, altitude
  })
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
  const venue = await fetch(id)

  return { area, venue, distance }
}
