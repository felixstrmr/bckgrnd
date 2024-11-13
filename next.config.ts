import createJiti from 'jiti'
import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('./lib/env')

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
}

export default nextConfig
