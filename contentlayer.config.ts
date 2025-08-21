// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import readingTime from 'reading-time'

export const Incidents = defineDocumentType(() => ({
  name: 'Incidents',
  filePathPattern: 'incidents/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    summary: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    draft: { type: 'boolean' },
    images: { type: 'list', of: { type: 'string' } },
    incidentId: { type: 'string' },
    severity: { type: 'enum', options: ['low', 'medium', 'high', 'critical'], default: 'low' },
    status: { type: 'enum', options: ['open', 'closed'], default: 'open' },
    deadline: { type: 'date' },
    areas: { type: 'list', of: { type: 'string' } },
    hotline: { type: 'string' },
    mapUrl: { type: 'string' },
  },
  computedFields: {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
      type: 'string',
      resolve: (doc) => {
        // "incidents/2025-08-21-earthquake-bkk" -> "2025-08-21-earthquake-bkk"
        // "incidents/nested-route/foo"          -> "foo"
        const p = doc._raw.flattenedPath.replace(/^incidents\//, '')
        return p.split('/').pop()!
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Incidents],
})
