/** @type {import('pliny/config').PlinyConfig} */
const siteMetadata = {
  title: 'Misumi Emergency',
  author: 'HR Safety Team',
  headerTitle: 'Misumi Emergency',
  description:
    'ระบบเช็คอินความปลอดภัยเมื่อเกิดเหตุฉุกเฉิน พนักงานระบุสถานการณ์ของตนเองจากประกาศของ HR เช่น แผ่นดินไหว/อัคคีภัย',
  language: 'th-TH',
  theme: 'system', // system | dark | light
  siteUrl: 'https://emergency-self-check-in.vercel.app/', // ใส่โดเมนจริงของคุณ
  siteRepo: '',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.svg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/social-card.png`,
  email: 'hr@example.com',
  github: 'https://github.com/<org>',
  x: 'https://x.com/<company>',
  facebook: '',
  youtube: '',
  linkedin: '',
  threads: '',
  instagram: '',
  medium: '',
  bluesky: '',
  locale: 'th-TH',
  stickyNav: true,

  analytics: {
    // เปิดใช้เมื่อพร้อม (ปรับ CSP ใน next.config.mjs ด้วย)
    umamiAnalytics: { umamiWebsiteId: process.env.NEXT_UMAMI_ID },
  },

  newsletter: {
    provider: '', // ปิดการใช้งาน
  },

  comments: {
    provider: '', // ปิดระบบคอมเมนต์สำหรับระบบเช็คอิน
  },

  search: {
    provider: 'kbar',
    kbarConfig: { searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json` },
  },
}

module.exports = siteMetadata
