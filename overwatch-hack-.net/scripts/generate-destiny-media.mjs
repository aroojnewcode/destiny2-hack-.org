/**
 * Replace leftover gameplay screenshots with original Destiny-styled stills.
 * No third-party game footage. ESP boxes are drawn, not captured.
 */
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const mediaDir = join(root, 'public', 'media')
await mkdir(mediaDir, { recursive: true })

function scene(w, h, { sky, ground, accent, title, boxes }) {
  const boxSvg = boxes
    .map(
      (b) => `
      <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="none" stroke="${b.color}" stroke-width="3"/>
      <text x="${b.x}" y="${b.y - 10}" fill="${b.color}" font-size="22" font-family="Arial, sans-serif">${b.label}</text>
    `,
    )
    .join('')
  return Buffer.from(`
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${sky}"/>
          <stop offset="1" stop-color="#12080a"/>
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${ground}"/>
          <stop offset="1" stop-color="#1a0c08"/>
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#sky)"/>
      <polygon points="0,${h * 0.62} ${w},${h * 0.48} ${w},${h} 0,${h}" fill="url(#floor)"/>
      <polygon points="${w * 0.18},${h * 0.42} ${w * 0.42},${h * 0.36} ${w * 0.42},${h * 0.78} ${w * 0.18},${h * 0.86}" fill="#2a160f" opacity="0.9"/>
      <polygon points="${w * 0.58},${h * 0.34} ${w * 0.86},${h * 0.4} ${w * 0.86},${h * 0.82} ${w * 0.58},${h * 0.74}" fill="#3a2014" opacity="0.85"/>
      <rect x="${w * 0.46}" y="${h * 0.28}" width="8" height="${h * 0.5}" fill="${accent}" opacity="0.35"/>
      <circle cx="${w * 0.72}" cy="${h * 0.22}" r="70" fill="#f2c14e" opacity="0.18"/>
      <text x="48" y="64" fill="#f4efe6" font-size="28" font-family="Arial, sans-serif" letter-spacing="3">${title}</text>
      ${boxSvg}
      <circle cx="${w / 2}" cy="${h / 2}" r="4" fill="#ffffff"/>
      <line x1="${w / 2 - 18}" y1="${h / 2}" x2="${w / 2 - 8}" y2="${h / 2}" stroke="#ffffff" stroke-width="2"/>
      <line x1="${w / 2 + 8}" y1="${h / 2}" x2="${w / 2 + 18}" y2="${h / 2}" stroke="#ffffff" stroke-width="2"/>
      <line x1="${w / 2}" y1="${h / 2 - 18}" x2="${w / 2}" y2="${h / 2 - 8}" stroke="#ffffff" stroke-width="2"/>
      <line x1="${w / 2}" y1="${h / 2 + 8}" x2="${w / 2}" y2="${h / 2 + 18}" stroke="#ffffff" stroke-width="2"/>
    </svg>
  `)
}

const shots = [
  {
    file: 'destiny-wallhack-players.png',
    w: 1600,
    h: 900,
    sky: '#1b120c',
    ground: '#4a2a16',
    accent: '#e8d7b0',
    title: 'GUARDIAN ESP',
    boxes: [
      { x: 980, y: 280, w: 150, h: 320, color: '#5ee7ff', label: 'Titan  42m' },
      { x: 420, y: 340, w: 120, h: 260, color: '#f5c16c', label: 'Hunter  18m' },
    ],
  },
  {
    file: 'destiny-esp-street.png',
    w: 1600,
    h: 900,
    sky: '#24160f',
    ground: '#5c341c',
    accent: '#d7c4a3',
    title: 'DISTANCE ESP',
    boxes: [
      { x: 260, y: 300, w: 130, h: 280, color: '#7af0ff', label: 'Warlock  27m' },
      { x: 1080, y: 250, w: 160, h: 340, color: '#7af0ff', label: 'Hunter  61m' },
      { x: 720, y: 360, w: 90, h: 180, color: '#f0d48a', label: 'Titan  11m' },
    ],
  },
  {
    file: 'destiny-esp-aimbot.png',
    w: 1600,
    h: 900,
    sky: '#120e18',
    ground: '#3d2418',
    accent: '#c9a36a',
    title: 'SILENT AIM',
    boxes: [{ x: 860, y: 240, w: 170, h: 360, color: '#ff5a6a', label: 'Target  24m' }],
    extra: (w, h) =>
      `<circle cx="${w / 2}" cy="${h / 2}" r="150" fill="none" stroke="#ff5a6a" stroke-width="2" opacity="0.8"/>`,
  },
  {
    file: 'destiny-radar-esp.png',
    w: 1600,
    h: 900,
    sky: '#161018',
    ground: '#3a2216',
    accent: '#e6d3a1',
    title: 'RADAR',
    boxes: [
      { x: 300, y: 260, w: 140, h: 300, color: '#6ef0ff', label: 'Guardian  33m' },
      { x: 1120, y: 310, w: 120, h: 250, color: '#6ef0ff', label: 'Guardian  19m' },
    ],
  },
  {
    file: 'destiny-radar-skeleton.png',
    w: 1600,
    h: 900,
    sky: '#1a1210',
    ground: '#4e2e18',
    accent: '#f0e2c4',
    title: 'CRUCIBLE RADAR',
    boxes: [{ x: 640, y: 220, w: 180, h: 380, color: '#8ef6ff', label: 'Zone  15m' }],
  },
  {
    file: 'destiny-product-cover.png',
    w: 1600,
    h: 900,
    sky: '#20140e',
    ground: '#6a3a1c',
    accent: '#f2d48a',
    title: 'DESTINY 2 HACK',
    boxes: [
      { x: 240, y: 280, w: 140, h: 300, color: '#5ee7ff', label: 'Hunter  22m' },
      { x: 1040, y: 240, w: 170, h: 360, color: '#f5c16c', label: 'Titan  38m' },
    ],
  },
]

for (const shot of shots) {
  let svg = scene(shot.w, shot.h, shot).toString()
  if (shot.extra) {
    svg = svg.replace('</svg>', `${shot.extra(shot.w, shot.h)}</svg>`)
  }
  await sharp(Buffer.from(svg)).png().toFile(join(mediaDir, shot.file))
}

const posterSvg = scene(1920, 1080, {
  sky: '#140e0c',
  ground: '#5a3016',
  accent: '#f0d7a2',
  title: 'DESTINY 2',
  boxes: [
    { x: 1180, y: 300, w: 180, h: 400, color: '#7af0ff', label: 'Guardian  29m' },
    { x: 360, y: 360, w: 140, h: 300, color: '#f5c16c', label: 'Guardian  14m' },
  ],
})

await sharp(posterSvg).jpeg({ quality: 86 }).toFile(join(mediaDir, 'destiny-hero-poster.jpg'))
await sharp(posterSvg)
  .resize(1280, 720)
  .jpeg({ quality: 86 })
  .toFile(join(mediaDir, 'destiny-product-poster.jpg'))

console.log('Destiny media stills written.')
