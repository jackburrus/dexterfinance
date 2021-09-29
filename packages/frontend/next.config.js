module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['https://ipfs.io', 'images.cryptocompare.com'],
  },
  env: {
    ALCHEMYAPIKEY: process.env.ALCHEMYAPIKEY,
    ALCHEMYAPIKEYMAINNET: process.env.ALCHEMYAPIKEYMAINNET,
    Etherscan: process.env.Etherscan,
  },
}
