/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // basePath: '/src',
  // async redirects() {
  //   return [];
  // }
}

module.exports = nextConfig
