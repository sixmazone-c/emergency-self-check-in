'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

type Payload = {
  incident?: string
  employeeId: string
  fullName: string
  status: 'safe' | 'need_help' | 'injured' | 'unknown'
  location: string
  phone?: string
  notes?: string
}

const STATUS_OPTIONS: Array<{ value: Payload['status']; label: string }> = [
  { value: 'safe', label: 'Safe / ปลอดภัย' },
  { value: 'need_help', label: 'Need Help / ต้องการความช่วยเหลือ' },
  { value: 'injured', label: 'Injured / ได้รับบาดเจ็บ' },
  { value: 'unknown', label: 'Unknown / Unreachable / ติดต่อไม่ได้' },
]

export default function CheckInPage() {
  const sp = useSearchParams()

  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState<null | { id: string }>(null)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<Payload>({
    incident: sp.get('incident') ?? undefined,
    employeeId: '',
    fullName: '',
    status: 'safe',
    location: '',
    phone: '',
    notes: '',
  })

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError(null)

    try {
      if (!form.employeeId || !form.fullName || !form.location) {
        throw new Error('Please provide Employee ID, Full Name, and Current Location.')
      }

      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error(await res.text())
      const data = (await res.json()) as { ok: boolean; id: string }
      setSuccess({ id: data.id })
    } catch (err) {
      setError(err?.message ?? 'Failed to submit. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Emergency Self Check-in</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Submit your current safety status so HR can coordinate assistance if needed.
      </p>

      {form.incident && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-800/40 dark:bg-amber-950/30">
          Incident: <span className="font-medium">{form.incident}</span>
        </div>
      )}

      {success ? (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/30 dark:text-emerald-200">
          ✅ Your check-in was received. Reference ID:&nbsp;
          <span className="font-mono">{success.id}</span>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm">Employee ID *</span>
              <input
                className="w-full rounded-lg border bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
                value={form.employeeId}
                onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                required
                inputMode="text"
                autoComplete="off"
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm">Full Name *</span>
              <input
                className="w-full rounded-lg border bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                required
                autoComplete="name"
              />
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-sm">Status *</span>
            <select
              className="w-full rounded-lg border bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Payload['status'] })}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-1">
            <span className="text-sm">Current Location *</span>
            <input
              className="w-full rounded-lg border bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
              placeholder="e.g., Building A, 12th floor / Bang Na"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
              autoComplete="off"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm">Phone</span>
              <input
                className="w-full rounded-lg border bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                inputMode="tel"
                autoComplete="tel"
              />
            </label>

            <label className="space-y-1">
              <span className="text-sm">Notes</span>
              <input
                className="w-full rounded-lg border bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </label>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              ❌ {error}
            </p>
          )}

          <button
            disabled={sending}
            className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            {sending ? 'Submitting…' : 'Submit Check-in'}
          </button>
        </form>
      )}
    </div>
  )
}
