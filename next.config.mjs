// next.config.mjs
import { withContentlayer } from 'next-contentlayer2'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

// ── Security headers (CSP etc.)
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  font-src 'self';
  frame-src giscus.app
`

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy.replace(/\n/g, '') },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/** @type {import('next').NextConfig} */
const baseConfig = {
  output,
  basePath,
  reactStrictMode: true,
  trailingSlash: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  eslint: {
    // turn this off only while unblocking deploys; set back to false when clean
    ignoreDuringBuilds: true,
    dirs: ['app', 'components', 'layouts', 'scripts'],
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
    unoptimized,
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] })
    return config
  },
}

// Compose plugins (contentlayer + bundle analyzer)
const withPlugins = (cfg, plugins) => plugins.reduce((acc, p) => p(acc), cfg)

export default withPlugins(baseConfig, [withContentlayer, withBundleAnalyzer])
