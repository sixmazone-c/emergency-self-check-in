import Link from '@/components/Link'
import Main from './Main'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allIncidents } from 'contentlayer/generated'

export default function Page() {
  const posts = allCoreContent(sortPosts(allIncidents))
  const latest = posts[0] // โพสต์ HR ล่าสุด (เช่น ประกาศแผ่นดินไหว)

  return (
    <>
      <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/30">
        <p className="text-sm font-semibold text-red-700 dark:text-red-300">
          Emergency check-in system
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {latest ? (
            <>
              <span className="text-sm text-gray-700 dark:text-gray-200">latest event:</span>
              <Link href={`/incidents/${latest.slug}`} className="underline underline-offset-4">
                {latest.title}
              </Link>
              <div className="ms-auto">
                <Link
                  href={`/checkin?incident=${encodeURIComponent(latest.slug)}`}
                  className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
                >
                  Check-in Now
                </Link>
              </div>
            </>
          ) : (
            <Link
              href="/checkin"
              className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-white hover:bg-red-700"
            >
              Check-in Now
            </Link>
          )}
        </div>
      </div>

      {/* รายการโพสต์/ประกาศจาก HR (มาจากเทมเพลตเดิมของคุณ) */}
      <Main posts={posts} />
    </>
  )
}
