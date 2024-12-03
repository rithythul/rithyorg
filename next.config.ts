import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Suppress the warning about the punycode module
    config.ignoreWarnings = [
      { module: /node_modules\/punycode/ }
    ]
    return config
  }
}

export default nextConfig


