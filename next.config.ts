import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ['localhost.com', '*.localhost.com'],
}

export default nextConfig
