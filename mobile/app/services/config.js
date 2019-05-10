import * as firebase from 'nativescript-plugin-firebase'

const production = TNS_ENV === 'production'

export default async () => {
  const { properties } = await firebase.getRemoteConfig({
    developerMode: !production, // play with this boolean to get more frequent updates during development
    cacheExpirationSeconds: production ? 21600 : 600, // 10 minutes, default is 12 hours.. set to a lower value during dev
    properties: [{
      key: 'category_radii',
      default: '{}'
    }]
  })

  return properties
}
