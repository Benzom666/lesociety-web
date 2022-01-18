const path = require('path')

module.exports = {
  devIndicators: {
    autoPrerender: false,
    buildActivity: false,
  },
  env: {
    modules: ['auth', "event"]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ]
  },
}
