/**
 * Build homepage hero loop from a YouTube URL (middle segment, web-optimized).
 *
 *   node scripts/generate-hero-loop.mjs
 *   HERO_YT_URL=https://youtu.be/... node scripts/generate-hero-loop.mjs
 *
 * Requires yt-dlp + ffmpeg on PATH.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const tmp = join(root, '.tmp-hero-video')
const source = join(tmp, 'source.%(ext)s')
const sourceMp4 = join(tmp, 'source.mp4')
const outVideo = join(root, 'public', 'videos', 'destiny-hero-loop.mp4')
const outPoster = join(root, 'public', 'media', 'destiny-hero-poster.jpg')

const url =
  process.env.HERO_YT_URL || 'https://youtu.be/KBaB8IT8Jt8?si=_YisqcKmmeIBHRKy'
/** Short mid-clip loop (6–10s). Default 8s. */
const loopSec = Math.min(10, Math.max(6, Number(process.env.HERO_LOOP_SEC || 8)))

/** Light size, keep detail: 960w @ 24fps, CRF 23, purple tint for brand. */
const vf =
  'fps=24,scale=960:-2:flags=lanczos,eq=saturation=1.05:brightness=-0.04:gamma=0.96,colorbalance=rs=0.06:gs=-0.08:bs=0.22:rm=0.04:gm=-0.05:bm=0.14,format=yuv420p'

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: 'inherit', windowsHide: true })
}

mkdirSync(tmp, { recursive: true })

run('yt-dlp', [
  '-f',
  'bv*[height<=720][ext=mp4]+ba[ext=m4a]/bv*[height<=720]/b[height<=720]',
  '--merge-output-format',
  'mp4',
  '-o',
  source,
  '--force-overwrites',
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
  '-vf',
  vf,
  '-c:v',
  'libx264',
  '-preset',
  'slow',
  '-crf',
  '23',
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
  String(start + Math.min(2, loopSec / 2)),
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

if (process.env.KEEP_HERO_SOURCE !== '1') {
  try {
    rmSync(tmp, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
}

const kb = Math.round(statSync(outVideo).size / 1024)
console.log(`Hero loop: ${outVideo} (${loopSec}s from t=${start.toFixed(1)}s, ${kb} KB)`)
console.log(`Poster: ${outPoster}`)
