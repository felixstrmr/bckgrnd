import { MAX_TASK_FILE_SIZE } from '@/lib/constants'
import createJiti from 'jiti'
import type { NextConfig } from 'next'
import { fileURLToPath } from 'node:url'
const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('./lib/env')

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: MAX_TASK_FILE_SIZE * 1024 * 1024,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'gmltfsdubomonqecltxr.supabase.co',
        protocol: 'https',
      },
      {
        hostname: '**.bckgrnd.one',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
