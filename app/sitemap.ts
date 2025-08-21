// app/sitemap.ts
import type { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { allIncidents } from 'contentlayer/generated'

export const dynamic = 'force-static' // content is static from files

// helper to turn contentlayer path into slug (e.g. "incidents/2025-08-21-earthquake-bkk" -> "2025-08-21-earthquake-bkk")
const clean = (s: string) =>
  s
    .replace(/^incidents\//, '')
    .replace(/^\/+/, '')
    .split('/')
    .pop()!

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteMetadata.siteUrl.replace(/\/$/, '')

  const incidentItems = allIncidents.map((p) => ({
    url: `${base}/incidents/${encodeURIComponent(clean(p.slug))}`,
    lastModified: new Date(p.lastmod || p.date),
  }))

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/incidents`, lastModified: new Date() },
    ...incidentItems,
  ]
}
