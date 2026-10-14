/**
 * Auto-generate 1200x630 JPEG Open Graph images for every indexed URL.
 * Google SERP / social crawlers fetch these for right-side thumbnails.
 * Never overwrites first-party /media gameplay screenshots.
 */
import { access, mkdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const ogDir = join(root, 'public', 'og')
const mediaDir = join(root, 'public', 'media')
const publicDir = join(root, 'public')
const blogsPath = join(root, 'src', 'data', 'blogs.ts')
const forumsPath = join(root, 'src', 'data', 'forums.ts')

await mkdir(ogDir, { recursive: true })
await mkdir(mediaDir, { recursive: true })

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

const requiredDestinyMedia = [
  join(mediaDir, 'destiny-wallhack-players.png'),
  join(mediaDir, 'destiny-esp-street.png'),
  join(mediaDir, 'destiny-esp-aimbot.png'),
  join(mediaDir, 'destiny-product-poster.jpg'),
  join(mediaDir, 'destiny-hero-poster.jpg'),
]

for (const path of requiredDestinyMedia) {
  if (!(await exists(path))) {
    throw new Error(`Missing Destiny media asset (do not regenerate): ${path}`)
  }
}

function overlaySvg(width, height, eyebrow, title, subtitle) {
  const titleSize = Math.min(54, Math.round(width * 0.042))
  const lines = String(title).match(/.{1,28}(\s|$)/g)?.map((s) => s.trim()).filter(Boolean) || [
    title,
  ]
  const titleLines = lines.slice(0, 2)
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#08060f" stop-opacity="0.55"/>
          <stop offset="0.45" stop-color="#08060f" stop-opacity="0.72"/>
          <stop offset="1" stop-color="#14081f" stop-opacity="0.88"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shade)"/>
      <text x="64" y="210" fill="#c084fc" font-size="22" font-family="Arial, sans-serif" font-weight="700" letter-spacing="4">${escapeXml(eyebrow)}</text>
      ${titleLines
        .map(
          (line, i) =>
            `<text x="64" y="${290 + i * 64}" fill="#ffffff" font-size="${titleSize}" font-family="Arial, sans-serif" font-weight="700">${escapeXml(line)}</text>`,
        )
        .join('\n')}
      <text x="64" y="480" fill="#c9bdd2" font-size="26" font-family="Arial, sans-serif">${escapeXml(subtitle)}</text>
      <text x="64" y="560" fill="#9299a3" font-size="20" font-family="Arial, sans-serif">destiny2hack.org</text>
    </svg>
  `)
}

async function writeOgJpeg(outPath, sourcePath, eyebrow, title, subtitle) {
  const base = sharp(sourcePath).resize(1200, 630, { fit: 'cover', position: 'centre' })
  const overlay = sharp(overlaySvg(1200, 630, eyebrow, title, subtitle))
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: '#08060f' },
  })
    .composite([
      { input: await base.toBuffer(), top: 0, left: 0 },
      { input: await overlay.png().toBuffer(), top: 0, left: 0 },
    ])
    .jpeg({ quality: 90, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(outPath)
}

function loadForumSlugs(src) {
  return [...src.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1])
}

function loadForumMeta(src) {
  const pattern =
    /slug:\s*['"]([^'"]+)['"],[\s\S]*?metaTitle:\s*['"]([^'"]+)['"],[\s\S]*?metaDescription:\s*['"]([^'"]+)['"]/g
  return [...src.matchAll(pattern)].map((m) => ({
    slug: m[1],
    title: m[2],
    description: m[3],
  }))
}

const heroPoster = join(mediaDir, 'destiny-hero-poster.jpg')
const wallhackShot = join(mediaDir, 'destiny-wallhack-players.png')
const espStreet = join(mediaDir, 'destiny-esp-street.png')
const espAimbot = join(mediaDir, 'destiny-esp-aimbot.png')
const productPoster = join(mediaDir, 'destiny-product-poster.jpg')

const staticOg = [
  {
    file: 'home.jpg',
    source: heroPoster,
    eyebrow: 'Destiny 2 HACK',
    title: 'Destiny 2 Aimbot, ESP & Radar',
    subtitle: 'Destiny 2 cheats from $35 · live anti-cheat status',
  },
  {
    file: 'destiny-2-hack.jpg',
    source: wallhackShot,
    eyebrow: 'PRODUCT DETAILS',
    title: 'Destiny 2 Aimbot, ESP & Wallhack',
    subtitle: 'Features, anti-cheat status and price',
  },
  {
    file: 'blogs.jpg',
    source: espStreet,
    eyebrow: 'BLOGS',
    title: 'Destiny 2 Cheat Guides',
    subtitle: 'Price, Aimbot, ESP and setup on destiny2hack.org',
  },
  {
    file: 'forums.jpg',
    source: espStreet,
    eyebrow: 'FORUM ARCHIVE',
    title: 'Destiny 2 Hack Forum',
    subtitle: 'Read-only setup, status and support threads',
  },
  {
    file: 'reviews.jpg',
    source: espAimbot,
    eyebrow: 'REVIEWS',
    title: 'Destiny 2 Hack Buyer Reviews',
    subtitle: 'Real Destiny 2 Aimbot and ESP feedback',
  },
  {
    file: 'faq.jpg',
    source: productPoster,
    eyebrow: 'FAQ',
    title: 'Destiny 2 Hack FAQ',
    subtitle: 'Price, anti-cheat status and setup answers',
  },
  {
    file: 'support.jpg',
    source: productPoster,
    eyebrow: 'SUPPORT',
    title: 'Destiny 2 Hack Support',
    subtitle: 'Loader, delivery and Windows help',
  },
  {
    file: 'privacy.jpg',
    source: heroPoster,
    eyebrow: 'POLICY',
    title: 'Privacy Policy',
    subtitle: 'How destiny2hack.org handles order data',
  },
  {
    file: 'terms.jpg',
    source: heroPoster,
    eyebrow: 'POLICY',
    title: 'Terms of Use',
    subtitle: 'License rules for Destiny 2 Hack',
  },
  {
    file: 'refunds.jpg',
    source: wallhackShot,
    eyebrow: 'POLICY',
    title: 'Refund Policy',
    subtitle: 'Digital license refund rules',
  },
]

const created = []

for (const item of staticOg) {
  const out = join(ogDir, item.file)
  await writeOgJpeg(out, item.source, item.eyebrow, item.title, item.subtitle)
  created.push(item.file)
}

function loadMetaList(src, fallbackLabel) {
  const list = loadForumMeta(src)
  if (list.length) return list
  return loadForumSlugs(src).map((slug) => ({
    slug,
    title: `Destiny 2 Hack ${slug}`,
    description: `${fallbackLabel} on destiny2hack.org`,
  }))
}

const blogsSrc = await readFile(blogsPath, 'utf8')
const forumsSrc = await readFile(forumsPath, 'utf8')
const blogs = loadMetaList(blogsSrc, 'Destiny 2 hack blog')
const forums = loadMetaList(forumsSrc, 'Destiny 2 hack forum thread')

for (const blog of blogs) {
  const file = `blogs-${blog.slug}.jpg`
  const out = join(ogDir, file)
  const source =
    /esp|wallhack|radar/i.test(blog.slug)
      ? espStreet
      : /aimbot|features|hotkeys|setup|windows|antivirus|loader|stream|price/i.test(blog.slug)
        ? productPoster
        : wallhackShot
  await writeOgJpeg(
    out,
    source,
    'Destiny 2 BLOG',
    blog.title.replace(/\s*\|\s*.*$/, '').slice(0, 48),
    'Destiny 2 hack · destiny2hack.org',
  )
  created.push(file)
}

for (const forum of forums) {
  const file = `forums-${forum.slug}.jpg`
  const out = join(ogDir, file)
  const source =
    /esp|wallhack|radar|aimbot/i.test(forum.slug) ? espStreet : wallhackShot
  await writeOgJpeg(
    out,
    source,
    'Destiny 2 FORUM',
    forum.title.replace(/\s*\|\s*.*$/, '').slice(0, 48),
    'Destiny 2 Hack forum · destiny2hack.org',
  )
  created.push(file)
}

const faviconSvg = join(publicDir, 'favicon.svg')
if (await exists(faviconSvg)) {
  const touchOut = join(publicDir, 'apple-touch-icon.png')
  await sharp(faviconSvg)
    .resize(180, 180, { fit: 'contain', background: '#08060f' })
    .png()
    .toFile(touchOut)
  created.push('apple-touch-icon.png')
}

console.log(`SEO OG images ready (${created.length}): ${created.slice(0, 8).join(', ')}…`)
