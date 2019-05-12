import * as firebase from 'nativescript-plugin-firebase'

const production = TNS_ENV === 'production'

export default async () => {
  const { properties } = await firebase.getRemoteConfig({
    developerMode: !production,
    cacheExpirationSeconds: production ? 21600 : 600,
    properties: [{
      key: 'category_radii',
      default: '{}'
    }]
  })

  return properties
}
