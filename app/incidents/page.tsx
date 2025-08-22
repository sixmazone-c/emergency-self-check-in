import Link from '@/components/Link'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allIncidents } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'

export const metadata = {
  title: 'Incidents',
  description: 'All incident posts from HR',
}

export default function IncidentsPage() {
  const posts = allCoreContent(sortPosts(allIncidents))

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Incidents</h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-6">
            <div className="flex items-baseline gap-4">
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(post.date, 'th-TH')}
              </time>
              <h2 className="text-xl font-semibold">{post.title}</h2>
            </div>

            {post.summary && (
              <p className="mt-2 text-gray-600 dark:text-gray-300">{post.summary}</p>
            )}

            <div className="mt-3 flex items-center gap-4">
              <Link
                href={`/check-in?incident=${encodeURIComponent(post.slug)}`}
                className="text-primary-600 hover:text-primary-700 dark:hover:text-primary-400"
                aria-label={`Read more: "${post.title}"`}
              >
                Read more →
              </Link>

              <Link
                href={`/check-in?incident=${encodeURIComponent(post.slug)}`}
                className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
              >
                Check-in
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
