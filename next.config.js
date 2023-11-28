/** @type {import('next').NextConfig} */

const isProduction = true

const nextConfig = {
    output: 'export',
    assetPrefix: isProduction ? '/json2yaml' : '',
    trailingSlash: true,
    basePath: isProduction ? '/json2yaml' : '',
    images: { unoptimized: false },
    reactStrictMode: true,
  }

module.exports = nextConfig
