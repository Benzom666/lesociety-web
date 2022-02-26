const path = require('path')

module.exports = {
  images: {
    domains: ['secrettime-cdn.s3.eu-west-2.amazonaws.com'],
  },
  devIndicators: {
    autoPrerender: false,
    buildActivity: false,
  },
  env: {
    modules: ['auth', "event"],
    MAPBOX_TOKEN: 'pk.eyJ1Ijoic2VjcmV0dGltZSIsImEiOiJja3poN3dhY2IwZXk3Mm5vMmlqdnpqMDNxIn0.RELof70VoVmL4Y4-C8HHmw'
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
