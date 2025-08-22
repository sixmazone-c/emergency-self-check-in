import 'css/prism.css'
import 'katex/dist/katex.css'

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import siteMetadata from '@/data/siteMetadata'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allCoreContent, sortPosts, coreContent } from 'pliny/utils/contentlayer'
import { allIncidents, type Incidents } from 'contentlayer/generated'
import type { ComponentType, ReactNode } from 'react'
import PostSimple from '@/layouts/PostSimple'

type LayoutProps = {
  content: unknown
  authorDetails: unknown[]
  next?: unknown
  prev?: unknown
  children?: ReactNode
}

const layoutMap = {
  PostSimple: PostSimple as unknown as ComponentType<LayoutProps>,
} satisfies Record<string, ComponentType<LayoutProps>>

type LayoutKey = keyof typeof layoutMap
const defaultLayout: LayoutKey = 'PostSimple'

const layouts = { PostSimple }

const clean = (s: string) =>
  s
    .replace(/^(blog|incidents)\//, '')
    .replace(/^\/+/, '')
    .split('/')
    .pop()!

export async function generateStaticParams() {
  return allIncidents.map((p) => ({ slug: clean(p.slug) }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const { slug } = await props.params
  const post = allIncidents.find((p) => clean(p.slug) === slug)
  if (!post) return

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const imageList = Array.isArray(post.images)
    ? post.images
    : post.images
      ? [post.images]
      : [siteMetadata.socialBanner]
  const ogImages = imageList.map((img) => ({
    url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
  }))

  return {
    title: post.title,
    description: post.summary ?? '',
    openGraph: {
      title: post.title,
      description: post.summary ?? '',
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary ?? '',
      images: imageList,
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const routeSlug = decodeURIComponent(slug).toLowerCase()

  const sortedCore = allCoreContent(sortPosts(allIncidents))
  const index = sortedCore.findIndex((p) => clean(p.slug).toLowerCase() === routeSlug)
  if (index === -1) return notFound()

  const prev = sortedCore[index + 1]
  const next = sortedCore[index - 1]
  const post = allIncidents.find((p) => clean(p.slug).toLowerCase() === routeSlug) as Incidents
  const mainContent = coreContent(post)

  type LayoutKey = keyof typeof layouts
  const defaultLayout: LayoutKey = 'PostSimple'

  const layoutKey: LayoutKey = ((post as { layout?: LayoutKey }).layout ??
    defaultLayout) as LayoutKey

  const Layout = layoutMap[layoutKey]

  const { components: mdxComponents } = await import('@/components/MDXComponents')

  return (
    <>
      <Layout content={mainContent} authorDetails={[]} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={mdxComponents} />
      </Layout>

      {/* ปุ่ม Check-in */}
      <div className="not-prose mt-6">
        <a
          href={`/checkin?incident=${encodeURIComponent(clean(post.slug))}`}
          className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Check-in now
        </a>
      </div>
    </>
  )
}
