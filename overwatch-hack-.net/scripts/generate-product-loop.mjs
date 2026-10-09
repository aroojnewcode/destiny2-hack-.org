/**
 * Feature preview loop (home + product page) from YouTube.
 * ~12s mid clip, no audio, purple grade, light H.264 for web (~2MB).
 * Soft side crop reduces burned-in cheat-menu panels when present.
 *
 *   npm run generate:product-loop
 *   PREVIEW_YT_URL=https://youtu.be/... npm run generate:product-loop
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const tmp = join(root, '.tmp-product-video')
const sourceTpl = join(tmp, 'source.%(ext)s')
const sourceMp4 = join(tmp, 'source.mp4')
const outVideo = join(root, 'public', 'videos', 'destiny-product-loop.mp4')
const outPoster = join(root, 'public', 'media', 'destiny-product-poster.jpg')

const url =
  process.env.PREVIEW_YT_URL || 'https://youtu.be/S6Bd1Vs7-zw?si=0P_HGLHzmomce6cb'
const loopSec = Math.min(20, Math.max(8, Number(process.env.PREVIEW_LOOP_SEC || 12)))

/** Crop left menu strip + bottom caption band, then fit 960x540. */
const vf = [
  'crop=iw*0.88:ih*0.82:iw*0.10:ih*0.04',
  'scale=854:480:force_original_aspect_ratio=increase',
  'crop=854:480:(iw-854)/2:(ih-480)/2',
  'fps=24',
  'eq=saturation=1.06:brightness=-0.03:gamma=0.97',
  'colorbalance=rs=0.07:gs=-0.08:bs=0.22:rm=0.05:gm=-0.05:bm=0.14',
  'format=yuv420p',
].join(',')

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: 'inherit', windowsHide: true })
}

mkdirSync(tmp, { recursive: true })

run('yt-dlp', [
  '-f',
  'bv*[height<=720][ext=mp4]+ba[ext=m4a]/bv*[height<=720]/b[height<=720]',
  '--merge-output-format',
  'mp4',
  '--no-write-subs',
  '--no-write-auto-subs',
  '--force-overwrites',
  '-o',
  sourceTpl,
  url,
])

const duration = Number(
  execFileSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      sourceMp4,
    ],
    { encoding: 'utf8' },
  ).trim(),
)

const start = Math.max(0, (duration - loopSec) / 2)

run('ffmpeg', [
  '-y',
  '-ss',
  String(start),
  '-t',
  String(loopSec),
  '-i',
  sourceMp4,
  '-an',
  '-sn',
  '-vf',
  vf,
  '-c:v',
  'libx264',
  '-preset',
  'slow',
  '-crf',
  '28',
  '-profile:v',
  'main',
  '-level',
  '3.1',
  '-pix_fmt',
  'yuv420p',
  '-movflags',
  '+faststart',
  '-tag:v',
  'avc1',
  outVideo,
])

run('ffmpeg', [
  '-y',
  '-ss',
  String(start + Math.min(8, loopSec / 3)),
  '-i',
  sourceMp4,
  '-frames:v',
  '1',
  '-update',
  '1',
  '-vf',
  vf,
  '-q:v',
  '3',
  outPoster,
])

if (process.env.KEEP_PREVIEW_SOURCE !== '1') {
  try {
    rmSync(tmp, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
}

const kb = Math.round(statSync(outVideo).size / 1024)
console.log(
  `Product loop: ${outVideo} (${loopSec}s from t=${start.toFixed(1)}s, ${kb} KB)`,
)
console.log(`Poster: ${outPoster}`)
