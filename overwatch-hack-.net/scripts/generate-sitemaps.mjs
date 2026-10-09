/**
 * Single sitemap at /sitemap.xml — every indexed page URL + image entries.
 * One urlset only (never a sitemap index). 404 is excluded.
 */
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')
const pagesDir = join(root, 'src', 'pages')
const SITE = (process.env.SITE_URL || 'https://destiny2hack.org').replace(/\/$/, '')
const TODAY = new Date().toLocaleDateString('en-CA')
const HREFLANG = ['en', 'x-default']

const HERO_FULL = '/media/destiny-wallhack-players.webp'
const COVER = '/media/destiny-radar-esp.webp'
const BOX = '/media/destiny-esp-aimbot.webp'
const ESP = '/media/destiny-esp-street.webp'
const MENU = '/media/destiny-esp-street.webp'
const CONTROL = '/media/destiny-esp-street.webp'
const HOME_ART = '/media/destiny-wallhack-players.webp'
const TACTICAL_ART = '/media/destiny-radar-esp.webp'
const VIDEO_THUMB = '/media/destiny-product-poster.webp'
const PREVIEW_VIDEO = '/videos/destiny-product-loop.mp4'
const OG_DEFAULT = '/og/destiny-2-hack.jpg'

const ALL_SITE_IMAGES = [
  HERO_FULL,
  COVER,
  BOX,
  ESP,
  MENU,
  CONTROL,
  HOME_ART,
  TACTICAL_ART,
  VIDEO_THUMB,
  '/og/home.jpg',
  '/og/destiny-2-hack.jpg',
  '/og/forums.jpg',
  '/og/reviews.jpg',
  '/og/faq.jpg',
  '/og/support.jpg',
  '/og/privacy.jpg',
  '/og/terms.jpg',
  '/og/refunds.jpg',
]

const FORUM_IMAGES = {
  'cheat-price': COVER,
  'features-list': COVER,
  hotkeys: MENU,
  'complete-setup': HERO_FULL,
  'disable-antivirus': CONTROL,
  'undetected-status': COVER,
  'aimbot-settings': MENU,
  'esp-wallhack-guide': ESP,
  'radar-hack-guide': MENU,
  'stream-proof-setup': HOME_ART,
  'anti-cheat-status': COVER,
  'windows-setup': HERO_FULL,
  'match-play-guide': BOX,
  'loader-errors': TACTICAL_ART,
}

const PAGE_META = {
  '/': { priority: '1.0', changefreq: 'daily' },
  '/destiny-2-hack': { priority: '0.9', changefreq: 'weekly' },
  '/blogs': { priority: '0.85', changefreq: 'weekly' },
  '/forums': { priority: '0.85', changefreq: 'weekly' },
  '/reviews': { priority: '0.8', changefreq: 'weekly' },
  '/faq': { priority: '0.75', changefreq: 'monthly' },
  '/support': { priority: '0.75', changefreq: 'weekly' },
  '/privacy': { priority: '0.4', changefreq: 'yearly' },
  '/terms': { priority: '0.4', changefreq: 'yearly' },
  '/refunds': { priority: '0.45', changefreq: 'yearly' },
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

/** Keep captions ASCII-safe for maximum crawler compatibility. */
function asciiSafe(value) {
  return String(value)
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, '')
}

function siteUrl(path) {
  return !path || path === '/' ? `${SITE}/` : `${SITE}${path.startsWith('/') ? path : `/${path}`}`
}

function loadGames() {
  const src = readFileSync(join(dataDir, 'games.ts'), 'utf8')
  return [...src.matchAll(/\{\s*slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g)].map(
    (match) => ({ slug: match[1], name: match[2] }),
  )
}

function loadEntries(fileName) {
  const src = readFileSync(join(dataDir, fileName), 'utf8')
  const pattern =
    /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*excerpt:\s*['"]([^'"]+)['"],\s*metaTitle:\s*['"]([^'"]+)['"],\s*metaDescription:\s*['"]([^'"]+)['"],[\s\S]*?date:\s*['"](\d{4}-\d{2}-\d{2})['"]/g
  return [...src.matchAll(pattern)].map((match) => ({
    slug: match[1],
    title: match[2],
    excerpt: match[3],
    metaTitle: match[4],
    metaDescription: match[5],
    date: match[6],
  }))
}

function loadBlogs() {
  return loadEntries('blogs.ts')
}

function loadForums() {
  return loadEntries('forums.ts')
}

function loadStaticRoutes() {
  return readdirSync(pagesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.astro') && entry.name !== '404.astro')
    .map((entry) => (entry.name === 'index.astro' ? '/' : `/${entry.name.slice(0, -6)}`))
}

function alternateLinks(url) {
  return HREFLANG.map(
    (language) =>
      `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(url)}" />`,
  ).join('\n')
}

function imageBlock({ src, title, caption }) {
  return `    <image:image>
      <image:loc>${escapeXml(siteUrl(src))}</image:loc>
      <image:title>${escapeXml(asciiSafe(title))}</image:title>
      <image:caption>${escapeXml(asciiSafe(caption))}</image:caption>
    </image:image>`
}

function videoBlock({ thumb, title, description, content }) {
  return `    <video:video>
      <video:thumbnail_loc>${escapeXml(siteUrl(thumb))}</video:thumbnail_loc>
      <video:title>${escapeXml(asciiSafe(title))}</video:title>
      <video:description>${escapeXml(asciiSafe(description))}</video:description>
      <video:content_loc>${escapeXml(siteUrl(content))}</video:content_loc>
      <video:family_friendly>yes</video:family_friendly>
      <video:live>no</video:live>
    </video:video>`
}

function urlEntry({ path, priority, changefreq, lastmod = TODAY, images, videos = [] }) {
  if (!images?.length) throw new Error(`Sitemap entry for ${path} is missing images`)
  const url = siteUrl(path)
  const media = [
    ...images.map((image) => imageBlock(image)),
    ...videos.map((video) => videoBlock(video)),
  ]
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateLinks(url)}
${media.join('\n')}
  </url>`
}

function imagesForPath(path, games, blogs, forums) {
  if (path === '/') {
    return [
      {
        src: '/og/home.jpg',
        title: 'Destiny 2 Hack Open Graph',
        caption: 'Google and social preview image for destiny2hack.org homepage.',
      },
      {
        src: HERO_FULL,
        title: 'Destiny 2 Hack Hero',
        caption: 'Buy Destiny 2 hack - Destiny 2 Aimbot, ESP and radar hack guardian artwork for PC.',
      },
      {
        src: COVER,
        title: 'Destiny 2 Hack Product Cover',
        caption: 'Destiny 2 hack product cover for checkout and social previews.',
      },
      {
        src: VIDEO_THUMB,
        title: 'Destiny 2 Hack Preview Thumbnail',
        caption: 'Thumbnail for the Destiny 2 Aimbot and ESP preview video.',
      },
      {
        src: OG_DEFAULT,
        title: 'Destiny 2 Hack Product Social Preview',
        caption: 'Default Open Graph image for destiny2hack.org product pages.',
      },
    ]
  }

  const game = games.find((g) => path === `/${g.slug}-hack`)
  if (game) {
    return [
      {
        src: '/og/destiny-2-hack.jpg',
        title: 'Destiny 2 Hack Open Graph',
        caption: 'Google and social preview for the Destiny 2 hack product page.',
      },
      {
        src: COVER,
        title: 'Destiny 2 Aimbot ESP Product Artwork',
        caption: 'Product features, compatibility, status and price before checkout.',
      },
      {
        src: HERO_FULL,
        title: `${game.name} Cheats Product Hero`,
        caption: `Guardian artwork for ${game.name} Aimbot, ESP and radar hack product details.`,
      },
      {
        src: MENU,
        title: `${game.name} Cheats Menu Preview`,
        caption: `Menu and Aimbot settings preview for ${game.name} cheats.`,
      },
      {
        src: ESP,
        title: `${game.name} ESP Gameplay`,
        caption: `Player ESP and wallhack preview for ${game.name}.`,
      },
      {
        src: VIDEO_THUMB,
        title: 'Destiny 2 Hack Preview Thumbnail',
        caption: 'Thumbnail for the Destiny 2 hack preview video.',
      },
    ]
  }

  if (path === '/blogs') {
    return [
      {
        src: '/og/blogs.jpg',
        title: 'Destiny 2 Hack Blogs Open Graph',
        caption: 'Google preview image for Destiny 2 cheat guides on destiny2hack.org.',
      },
      {
        src: ESP,
        title: 'Destiny 2 Hack Blog Artwork',
        caption: 'Artwork reference for Destiny 2 pricing, Aimbot and ESP guides.',
      },
    ]
  }

  if (path === '/forums') {
    return [
      {
        src: '/og/forums.jpg',
        title: 'Destiny 2 Hack Forums Open Graph',
        caption: 'Google preview image for the Destiny 2 Hack guides index.',
      },
      {
        src: MENU,
        title: 'Destiny 2 Hack Forum Artwork',
        caption: 'Artwork reference for Destiny 2 setup and feature guides.',
      },
    ]
  }

  if (path.startsWith('/blogs/')) {
    const slug = path.slice('/blogs/'.length)
    const blog = blogs.find((b) => b.slug === slug)
    return [
      {
        src: `/og/blogs-${slug}.jpg`,
        title: `${blog?.title || slug} Open Graph`,
        caption:
          blog?.metaDescription ||
          `Google preview image for ${blog?.title || slug} on destiny2hack.org.`,
      },
      {
        src: FORUM_IMAGES[slug] || MENU,
        title: `${blog?.title || slug} Artwork`,
        caption:
          blog?.excerpt || `Destiny 2 Hack blog artwork for ${blog?.title || slug}.`,
      },
    ]
  }

  if (path.startsWith('/forums/')) {
    const slug = path.slice('/forums/'.length)
    const forum = forums.find((f) => f.slug === slug)
    return [
      {
        src: `/og/forums-${slug}.jpg`,
        title: `${forum?.title || slug} Open Graph`,
        caption:
          forum?.metaDescription ||
          `Google preview image for ${forum?.title || slug} on destiny2hack.org.`,
      },
      {
        src: MENU,
        title: `${forum?.title || slug} Artwork`,
        caption:
          forum?.excerpt ||
          `Visible Destiny 2 Hack forum artwork for ${forum?.title || slug}.`,
      },
    ]
  }

  if (path === '/reviews') {
    return [
      {
        src: '/og/reviews.jpg',
        title: 'Destiny 2 Hack Reviews Open Graph',
        caption: 'Google preview image for Destiny 2 hack reviews.',
      },
    ]
  }
  if (path === '/faq') {
    return [
      {
        src: '/og/faq.jpg',
        title: 'Destiny 2 Hack FAQ Open Graph',
        caption: 'Google preview image for the Destiny 2 Hack FAQ.',
      },
    ]
  }
  if (path === '/support') {
    return [
      {
        src: '/og/support.jpg',
        title: 'Destiny 2 Hack Support Open Graph',
        caption: 'Google preview image for Destiny 2 Hack support.',
      },
    ]
  }
  if (path === '/privacy') {
    return [
      {
        src: '/og/privacy.jpg',
        title: 'Destiny 2 Hack Privacy Policy',
        caption: 'Privacy policy preview for destiny2hack.org orders and support.',
      },
    ]
  }
  if (path === '/terms') {
    return [
      {
        src: '/og/terms.jpg',
        title: 'Destiny 2 Hack Terms of Use',
        caption: 'License terms preview for Destiny 2 Hack.',
      },
    ]
  }
  if (path === '/refunds') {
    return [
      {
        src: '/og/refunds.jpg',
        title: 'Destiny 2 Hack Refund Policy',
        caption: 'Refund rules preview for digital Destiny 2 Hack licenses.',
      },
    ]
  }

  return [{ src: OG_DEFAULT, title: 'Destiny 2 Hack', caption: 'Destiny 2 Hack page artwork.' }]
}

function videosForPath(path) {
  if (path === '/destiny-2-hack') {
    return [
      {
        thumb: VIDEO_THUMB,
        title: 'Destiny 2 Hack Aimbot and ESP Preview',
        description:
          'Self-hosted Destiny 2 hack preview showing Aimbot, ESP menu and match gameplay on PC.',
        content: PREVIEW_VIDEO,
      },
    ]
  }
  return []
}

function collectAllPaths(games, blogs, forums, staticRoutes) {
  const paths = new Set([
    ...staticRoutes,
    ...games.map((game) => `/${game.slug}-hack`),
    ...blogs.map((blog) => `/blogs/${blog.slug}`),
    ...forums.map((forum) => `/forums/${forum.slug}`),
  ])
  // Never index error page
  paths.delete('/404')
  return [...paths]
}

function buildSitemap(games, blogs, forums, allPaths) {
  const dateByPath = new Map([
    ...blogs.map((b) => [`/blogs/${b.slug}`, b.date]),
    ...forums.map((f) => [`/forums/${f.slug}`, f.date]),
  ])

  const sorted = [...allPaths].sort((a, b) => {
    const rank = (path) => {
      if (path === '/') return 0
      if (path.endsWith('-hack')) return 1
      if (path === '/blogs') return 2
      if (path.startsWith('/blogs/')) return 3
      if (path === '/forums') return 4
      if (path.startsWith('/forums/')) return 5
      if (path === '/reviews') return 6
      if (path === '/faq') return 6
      if (path === '/support') return 7
      return 10
    }
    const diff = rank(a) - rank(b)
    return diff !== 0 ? diff : a.localeCompare(b)
  })

  const entries = sorted.map((path) => {
    const meta = PAGE_META[path] || {
      priority: path.startsWith('/blogs/') || path.startsWith('/forums/') ? '0.8' : '0.5',
      changefreq: path.startsWith('/blogs/') || path.startsWith('/forums/') ? 'monthly' : 'weekly',
    }
    return urlEntry({
      path,
      priority: meta.priority,
      changefreq: meta.changefreq,
      lastmod: dateByPath.get(path) || TODAY,
      images: imagesForPath(path, games, blogs, forums),
      videos: videosForPath(path),
    })
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${entries.join('\n')}
</urlset>
`
}

/** GSC-friendly index (200 on /sitemap-index.xml — not a redirect). */
function buildSitemapIndex() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(siteUrl('/sitemap.xml'))}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>
`
}

function validate(games, blogs, forums, allPaths, sitemap) {
  const errors = []
  if (forums.some((forum) => ['instructions', 'how-to-load'].includes(forum.slug))) {
    errors.push('Retired forum slug remains indexed')
  }
  for (const game of games) {
    const page = join(pagesDir, `${game.slug}-hack.astro`)
    if (!existsSync(page)) errors.push(`Product route has no page file: /${game.slug}-cheats`)
  }
  if (blogs.length && !existsSync(join(pagesDir, 'blogs', '[slug].astro'))) {
    errors.push('Blog routes have no dynamic page file: src/pages/blogs/[slug].astro')
  }
  if (forums.length && !existsSync(join(pagesDir, 'forums', '[slug].astro'))) {
    errors.push('Forum routes have no dynamic page file: src/pages/forums/[slug].astro')
  }
  for (const image of ALL_SITE_IMAGES) {
    const diskPath = join(publicDir, image.replace(/^\//, ''))
    if (!existsSync(diskPath)) errors.push(`Missing image asset on disk: ${image}`)
  }

  const expectedUrls = new Set(allPaths.map(siteUrl))
  const pageLocs = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const imageLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []

  for (const url of expectedUrls) {
    if (!pageLocs.includes(url)) errors.push(`Missing URL: ${url}`)
  }
  for (const url of pageLocs) {
    if (!expectedUrls.has(url)) errors.push(`Unexpected URL: ${url}`)
  }
  if (new Set(pageLocs).size !== pageLocs.length) errors.push('sitemap.xml contains duplicate page URLs')
  if (sitemap.includes('<sitemapindex')) errors.push('sitemap.xml must be a single urlset, not an index')
  if ((sitemap.match(/<urlset[\s>]/g) || []).length !== 1) {
    errors.push('sitemap.xml must contain exactly one <urlset>')
  }
  if (urlBlocks.length !== expectedUrls.size) {
    errors.push(`Expected ${expectedUrls.size} <url> entries, found ${urlBlocks.length}`)
  }
  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
    if (!block.includes('<image:image>') || !block.includes('<image:loc>')) {
      errors.push(`URL missing image entry: ${loc}`)
    }
  }
  for (const image of ALL_SITE_IMAGES) {
    if (!imageLocs.includes(siteUrl(image))) errors.push(`Sitemap missing required image: ${image}`)
  }
  if (!sitemap.includes(siteUrl(PREVIEW_VIDEO))) {
    errors.push('Sitemap missing Destiny 2 preview video content_loc')
  }
  if (/Tarkov|tarkovcheats|EFT Reaper|Warzone|warzonecheats|Ricochet/i.test(sitemap)) {
    errors.push('Sitemap still contains legacy Tarkov/Warzone labels')
  }
  if (!sitemap.includes('destiny2hack.org')) {
    errors.push('Sitemap must target destiny2hack.org')
  }
  if (/tarkovcheats|warzonecheats|wardogshacks|theisle/i.test(sitemap)) {
    errors.push('Sitemap contains a non-Destiny 2 domain')
  }
  if (imageLocs.length < expectedUrls.size) {
    errors.push('Image count is lower than page count - every URL needs an image')
  }
  if (/[^\x09\x0A\x0D\x20-\x7E]/.test(sitemap.replace(/https?:\/\//g, ''))) {
    // Allow non-ascii only inside https URLs if any; captions should be ascii.
  }
  if (errors.length) throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
}

function main() {
  const games = loadGames()
  const blogs = loadBlogs()
  const forums = loadForums()
  const staticRoutes = loadStaticRoutes()
  const allPaths = collectAllPaths(games, blogs, forums, staticRoutes)
  const sitemap = buildSitemap(games, blogs, forums, allPaths)
  validate(games, blogs, forums, allPaths, sitemap)

  writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
  writeFileSync(
    join(publicDir, 'robots.txt'),
    [
      'User-agent: Googlebot',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: Google-InspectionTool',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: Bingbot',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      '',
      'User-agent: *',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      'Allow: /media/',
      'Allow: /og/',
      'Allow: /videos/',
      'Disallow: /404',
      'Disallow: /404.html',
      '',
      `Sitemap: ${siteUrl('/sitemap.xml')}`,
      'Sitemap: https://www.destiny2hack.org/sitemap.xml',
      `Sitemap: ${siteUrl('/sitemap-index.xml')}`,
      '',
    ].join('\n'),
    'utf8',
  )

  writeFileSync(join(publicDir, 'sitemap-index.xml'), buildSitemapIndex(), 'utf8')

  for (const name of [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
    'sitemap-blogs.xml',
    'sitemap-regions.xml',
    'sitemap_index.xml',
  ]) {
    for (const dir of [publicDir, join(root, 'dist')]) {
      const path = join(dir, name)
      if (existsSync(path)) unlinkSync(path)
    }
  }

  console.log(
    `Sitemap OK: ${allPaths.length} pages in single sitemap.xml (${siteUrl('/sitemap.xml')})`,
  )
}

main()
