import pkg from './package'
import Sass from "sass"


const customSass = {
  implementation: Sass
}

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'What Next?',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#E05E94' },

  build: {
    loaders: {
      scss: customSass
    }
  }
}
