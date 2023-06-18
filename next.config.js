const path = require("path");
require("dotenv").config();

module.exports = {
  images: {
    domains:
      process.env.NODE_ENV === "production"
        ? [`${process.env.NEXT_PUBLIC_PROD_BUCKET_URL}`]
        : [`${process.env.NEXT_PUBLIC_DEV_BUCKET_URL}`],
  },

  devIndicators: {
    autoPrerender: false,
    buildActivity: false,
  },

  env: {
    modules: ["auth", "event"],
    MAPBOX_TOKEN:
      "pk.eyJ1Ijoic2VjcmV0dGltZSIsImEiOiJja3poN3dhY2IwZXk3Mm5vMmlqdnpqMDNxIn0.RELof70VoVmL4Y4-C8HHmw",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
};
