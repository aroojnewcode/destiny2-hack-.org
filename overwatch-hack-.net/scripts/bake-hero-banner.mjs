/**
 * Rebuild homepage hero banner from the latest Destiny key-art upload.
 * High-quality upscale + bottom-left darkening for headline readability.
 */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const candidates = [
  join(
    process.env.USERPROFILE || '',
    '.cursor/projects/c-Users-DELL-7280-Documents-destiny2/assets',
    'c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_cb3b0f0a1e07070e4130870552dcb18e_images_destiny_3-8412ec48-cfe1-4d96-8bf3-9bb495447e8c.jpg',
  ),
  join(
    process.env.USERPROFILE || '',
    '.cursor/projects/c-Users-DELL-7280-Documents-destiny2/assets',
    'c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_cb3b0f0a1e07070e4130870552dcb18e_images_destiny_banner-895d1125-6d08-4f04-9d16-29fa77be05d1.jpg',
  ),
  join(
    process.env.USERPROFILE || '',
    '.cursor/projects/c-Users-DELL-7280-Documents-destiny2/assets',
    'c__Users_DELL_7280_AppData_Roaming_Cursor_User_workspaceStorage_cb3b0f0a1e07070e4130870552dcb18e_images_destiny_2-fee9c838-2300-40fb-b018-26e29db8aee5.jpg',
  ),
]

const src = candidates.find((p) => existsSync(p))
if (!src) {
  console.error('No hero source image found')
  process.exit(1)
}

const meta = await sharp(src).metadata()
console.log('Using source:', src, `${meta.width}x${meta.height}`)

const W = 2560
const H = 1440

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bl" x1="0" y1="1" x2="0.52" y2="0.22">
      <stop offset="0%" stop-color="#06040f" stop-opacity="0.92"/>
      <stop offset="48%" stop-color="#06040f" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#06040f" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="left" x1="0" y1="0.55" x2="1" y2="0.55">
      <stop offset="0%" stop-color="#06040f" stop-opacity="0.62"/>
      <stop offset="38%" stop-color="#06040f" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bot" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#06040f" stop-opacity="0.72"/>
      <stop offset="48%" stop-color="#06040f" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bot)"/>
  <rect width="100%" height="100%" fill="url(#left)"/>
  <rect width="100%" height="100%" fill="url(#bl)"/>
</svg>`)

// Ultra-wide banner → cover so Guardians stay centered and sharp
const base = await sharp(src)
  .resize(W, H, {
    kernel: sharp.kernel.lanczos3,
    fit: 'cover',
    position: 'centre',
  })
  .modulate({ saturation: 1.06, brightness: 1.02 })
  .sharpen({ sigma: 1.1, m1: 0.75, m2: 0.4 })
  .toBuffer()

await sharp(base)
  .composite([{ input: overlay, blend: 'over' }])
  .jpeg({ quality: 96, mozjpeg: true, chromaSubsampling: '4:4:4' })
  .toFile(join(root, 'public/media/destiny-hero-banner.jpg'))

await sharp(base)
  .composite([{ input: overlay, blend: 'over' }])
  .webp({ quality: 94, effort: 6 })
  .toFile(join(root, 'public/media/destiny-hero-banner.webp'))

const posterBase = await sharp(src)
  .resize(1920, 1080, { kernel: sharp.kernel.lanczos3, fit: 'cover', position: 'centre' })
  .sharpen({ sigma: 0.9 })
  .toBuffer()

const posterOverlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
  <defs>
    <linearGradient id="b" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#06040f" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="#06040f" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#b)"/>
</svg>`)

await sharp(posterBase)
  .composite([{ input: posterOverlay, blend: 'over' }])
  .jpeg({ quality: 94, mozjpeg: true })
  .toFile(join(root, 'public/media/destiny-hero-poster.jpg'))

await sharp(posterBase)
  .composite([{ input: posterOverlay, blend: 'over' }])
  .webp({ quality: 92, effort: 6 })
  .toFile(join(root, 'public/media/destiny-hero-poster.webp'))

const out = await sharp(join(root, 'public/media/destiny-hero-banner.webp')).metadata()
console.log('Hero banner ready', `${out.width}x${out.height}`)
