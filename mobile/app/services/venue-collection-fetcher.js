
import { getCurrentLocation } from 'nativescript-geolocation'
import errors from '../constants/errors'
import { search } from './place-client'
import config from './config'

const makeSearch = async ({ category, price }) => {
  let pos
  try {
    pos = await getCurrentLocation()
  } catch (e) {
    throw new Error(errors.LOCATION_DENIED)
  }

  const { category_radii: radii } = await config()
  const radius = JSON.parse(radii)[category]
  const { latitude, longitude, altitude } = pos
  return search({
    category, price, latitude, longitude, altitude, radius
  })
}

export default async params => {
  const attrs = { ...params }
  const { items, area } = await makeSearch(attrs)
  if (items.length === 0) throw new Error(errors.NO_RESULTS)

  return { area, items }
}
