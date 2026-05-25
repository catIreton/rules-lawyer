import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  // basePath only applies in production — GitHub Pages serves from /rules-lawyer,
  // but the dev server should remain at localhost:3000/
  basePath: isProd ? '/rules-lawyer' : '',
  trailingSlash: true,
  // GitHub Pages cannot run Next.js image optimisation — see README warning
  images: { unoptimized: true },
  // Allow the dev server to be accessed from other devices on the local network
  allowedDevOrigins: ['192.168.1.171'],
}

export default nextConfig
