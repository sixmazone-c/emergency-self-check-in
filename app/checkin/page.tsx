import { Suspense } from 'react'
import type { Metadata } from 'next'
import CheckinClient from './CheckinClient'

export const metadata: Metadata = {
  title: 'Emergency Self Check-in',
  // Optional: removes the metadataBase warning
  // metadataBase: new URL('https://your-domain.com'),
}

export default function CheckinPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Emergency Self Check-in</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Submit your current safety status so HR can coordinate assistance if needed.
      </p>

      <Suspense fallback={<p>Loading…</p>}>
        <CheckinClient />
      </Suspense>
    </div>
  )
}
