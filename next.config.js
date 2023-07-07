const withPWA = require('next-pwa')({
  dest: 'public',
  scope: '/app',
})

module.exports = withPWA({
  images: {
    domains: ['images.pexels.com'],
  },
  experimental: {
    serverActions: true,
  },
})
