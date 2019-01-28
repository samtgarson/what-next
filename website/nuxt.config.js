const PRODUCTION = process.env.NODE_ENV === 'production'
if (!PRODUCTION) {
  require('dotenv-safe').load({
    sample: 'config/.env.example',
    path: 'config/.env'
  })
}

const autoprefixer = require('autoprefixer')
const { readdirSync } = require('fs')
const { resolve } = require('path')


const plugins = readdirSync(resolve(__dirname, 'plugins')).map(f => {
  const [name] = f.split('.')
  return `@/plugins/${name}`
})

const serverMiddleware = []
if (PRODUCTION) serverMiddleware.unshift('@/server-middleware/logger.js')

module.exports = {
  build: {
    postcss: [
      autoprefixer()
    ],
    babel: {
      presets: [
        'env',
        'vue-app'
      ]
    }
  },
  css: [
    '@@/node_modules/normalize.css/normalize.css'
  ],
  head: {
    bodyAttrs: {
      class: ''
    }
  },
  plugins,
  serverMiddleware,
  modules: [
    ['nuxt-env', {
      keys: ['API_URL']
    }]
  ]
}
