/**
 * Rebrand Overwatch Hack / overwatchhack.net → Destiny 2 Hack / destiny2hack.org
 * and strip other-game vocabulary (maps, heroes, modes, publishers).
 */
import { readFileSync, writeFileSync, readdirSync, statSync, renameSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git'])
const SKIP_FILES = new Set([
  'rebrand-to-overwatch.mjs',
  'rebrand-blogs-only.mjs',
  'rebrand-to-destiny.mjs',
  'sync-zadeyo-interiors.mjs',
])
const EXT = new Set(['.ts', '.tsx', '.astro', '.mjs', '.js', '.json', '.md', '.toml', '.txt', '.xml', '.css'])

/** Longest / most specific first. */
const REPLACEMENTS = [
  ['https://www.overwatchhack.net', 'https://www.destiny2hack.org'],
  ['https://overwatchhack.net', 'https://destiny2hack.org'],
  ['www.overwatchhack.net', 'www.destiny2hack.org'],
  ['overwatchhack.net', 'destiny2hack.org'],
  ['overwatchhack-net', 'destiny2hack-org'],
  ['https://overwatch.blizzard.com/', 'https://www.bungie.net/7/en/Destiny'],
  ['https://battle.net/shop/en-us/product/overwatch', 'https://store.steampowered.com/app/1085660/Destiny_2/'],
  ['https://support.blizzard.com/', 'https://help.bungie.net/'],
  ['OverwatchProductPreview', 'DestinyProductPreview'],
  ['OFFICIAL_OVERWATCH_LINKS', 'OFFICIAL_DESTINY_LINKS'],
  ['requiredOverwatchMedia', 'requiredDestinyMedia'],
  ['Missing Overwatch media', 'Missing Destiny media'],
  ['OVERWATCH_', 'DESTINY_'],
  ['/products/overwatch-2-hack', '/products/destiny-2-hack'],
  ['overwatch-2-hack', 'destiny-2-hack'],
  ['overwatch-hacks', 'destiny-2-hacks'],
  ['overwatch-cheats', 'destiny-2-cheats'],
  ['overwatch-hack', 'destiny-2-hack'],
  ['/media/overwatch-', '/media/destiny-'],
  ['/videos/overwatch-', '/videos/destiny-'],
  ['overwatch-wallhack-players.png', 'destiny-wallhack-players.png'],
  ['overwatch-esp-street.png', 'destiny-esp-street.png'],
  ['overwatch-esp-aimbot.png', 'destiny-esp-aimbot.png'],
  ['overwatch-radar-esp.png', 'destiny-radar-esp.png'],
  ['overwatch-radar-skeleton.png', 'destiny-radar-skeleton.png'],
  ['overwatch-product-cover.png', 'destiny-product-cover.png'],
  ['overwatch-product-poster.jpg', 'destiny-product-poster.jpg'],
  ['overwatch-hero-poster.jpg', 'destiny-hero-poster.jpg'],
  ['overwatch-product-loop', 'destiny-product-loop'],
  ['overwatch-hero-loop', 'destiny-hero-loop'],
  ["getGame('overwatch')", "getGame('destiny-2')"],
  ["slug: 'overwatch'", "slug: 'destiny-2'"],
  ["guidePath('overwatch')", "guidePath('destiny-2')"],
  ['  overwatch: {', "  'destiny-2': {"],
  ['dayzqrh', 'destiny2hack'],
  ['Overwatch 2', 'Destiny 2'],
  ['overwatch 2', 'destiny 2'],
  ['OW2', 'Destiny 2'],
  ['OVERWATCH HACK', 'DESTINY 2 HACK'],
  ['OVERWATCH GUIDE', 'DESTINY 2 GUIDE'],
  ['Overwatch Hacks', 'Destiny 2 Hacks'],
  ['Overwatch Hack', 'Destiny 2 Hack'],
  ['Overwatch Aimbot', 'Destiny 2 Aimbot'],
  ['Overwatch ESP', 'Destiny 2 ESP'],
  ['Overwatch-only', 'Destiny 2-only'],
  ['Overwatch', 'Destiny 2'],
  ['overwatch', 'destiny 2'],
  ["King's Row, Busan, Midtown", 'Twilight Gap, Bannerfall, Burnout'],
  ["King's Row, Busan", 'Twilight Gap, Bannerfall'],
  ["King's Row", 'Twilight Gap'],
  ['Busan', 'Bannerfall'],
  ['Midtown', 'Burnout'],
  ['Junkertown or Gibraltar', 'Javelin-4 or Vostok'],
  ['Junkertown', 'Javelin-4'],
  ['Gibraltar', 'Vostok'],
  ['Circuit Royal', 'Endless Vale'],
  ['Inferno and Ancient', 'Bannerfall and Burnout'],
  ['Inferno', 'Bannerfall'],
  ['Ancient', 'Burnout'],
  ['Blizzard anti-cheat', 'BattlEye'],
  ['Blizzard', 'Bungie'],
  ['Battle.net', 'Steam'],
  ['battle.net', 'steam'],
  ['Mercy', 'Warlock'],
  ['Orisa', 'Titan'],
  ['Quick Play, Competitive, Arcade, Deathmatch and Custom Games', 'Control, Survival, Trials of Osiris, Rumble and Private Matches'],
  ['Quick Play, Competitive and Arcade', 'Control, Survival and Trials of Osiris'],
  ['Competitive and Quick Play', 'Survival and Control'],
  ['Quick Play and Competitive', 'Control and Survival'],
  ['Quick Play, Competitive', 'Control, Survival'],
  ['Quick Play', 'Control'],
  ['Arcade modes', 'private matches'],
  ['Arcade', 'private matches'],
  ['Deathmatch', 'Rumble'],
  ['Custom Games', 'Private Matches'],
  ['Active Duty maps', 'Crucible maps'],
  ['Active Duty', 'Crucible'],
  ['payload map', 'Crucible map'],
  ['payload defense', 'zone defense'],
  ['payload or point', 'zone or point'],
  ['the payload', 'the zone'],
  ['payload', 'zone'],
  ['enemy hero outline', 'enemy guardian outline'],
  ['enemy hero', 'enemy guardian'],
  ['off-screen heroes', 'off-screen guardians'],
  ['Hero boxes', 'Guardian boxes'],
  ['hero names', 'guardian names'],
  ['hero outline', 'guardian outline'],
  ['hero tracking', 'guardian tracking'],
  ['Hero artwork', 'Guardian artwork'],
  ['hero artwork', 'guardian artwork'],
  ['See heroes', 'See guardians'],
  ['heroes through', 'guardians through'],
  ['heroes and', 'guardians and'],
  ['Hero info', 'Guardian info'],
  ['draws heroes', 'draws guardians'],
  ['ultimate and ability', 'Super and ability'],
  ['Ultimate and ability', 'Super and ability'],
  ['Ultimate timers', 'Super timers'],
  ['ultimate awareness', 'Super awareness'],
  ['ultimate readouts', 'Super readouts'],
  ['ultimate tags', 'Super tags'],
  ['build ultimate', 'build Super'],
  ['through walls and smokes', 'through walls and cover'],
  ['walls and smokes', 'walls and cover'],
  ['read a site before', 'read a point before'],
  ['costs the site', 'costs the point'],
  ['before you swing', 'before you push'],
  ['wide-swing a choke', 'push a lane'],
  ['hitscan', 'sniper'],
]

function apply(content) {
  let out = content
  for (const [from, to] of REPLACEMENTS) out = out.split(from).join(to)
  return out
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name) || SKIP_FILES.has(name)) continue
    const path = join(dir, name)
    const st = statSync(path)
    if (st.isDirectory()) walk(path, files)
    else if (EXT.has(extname(name)) && name !== '_redirects') files.push(path)
  }
  return files
}

const files = walk(root).filter((f) => !f.endsWith('package-lock.json'))
let changed = 0
for (const file of files) {
  const before = readFileSync(file, 'utf8')
  const after = apply(before)
  if (after !== before) {
    writeFileSync(file, after, 'utf8')
    changed++
  }
}

const redirectsPath = join(root, 'public', '_redirects')
const redirectLines = readFileSync(redirectsPath, 'utf8').split(/\r?\n/)
const rewritten = redirectLines.map((line) => {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) return apply(line)
  const parts = trimmed.split(/\s+/)
  if (parts.length < 3) return apply(line)
  const [src, dest, code, ...rest] = parts
  const nextDest = apply(dest)
  return [src, nextDest, code, ...rest].join('  ')
})
const legacy = [
  '/overwatch-hack  /destiny-2-hack  301',
  '/overwatch-hack/  /destiny-2-hack  301',
  '/overwatch-hacks  /destiny-2-hack  301',
  '/overwatch-cheats  /destiny-2-hack  301',
  '/overwatch-2-hack  /destiny-2-hack  301',
]
for (const row of legacy) {
  if (!rewritten.some((line) => line.trim().startsWith(row.split(/\s+/)[0] + ' ') || line.trim() === row)) {
    rewritten.push(row)
  }
}
writeFileSync(redirectsPath, rewritten.join('\n'), 'utf8')

function renameIf(from, to) {
  if (existsSync(from) && !existsSync(to)) renameSync(from, to)
}

renameIf(join(root, 'src', 'pages', 'overwatch-hack.astro'), join(root, 'src', 'pages', 'destiny-2-hack.astro'))
renameIf(
  join(root, 'src', 'components', 'OverwatchProductPreview.tsx'),
  join(root, 'src', 'components', 'DestinyProductPreview.tsx'),
)
renameIf(join(root, 'public', 'og', 'overwatch-hack.jpg'), join(root, 'public', 'og', 'destiny-2-hack.jpg'))

const mediaDir = join(root, 'public', 'media')
for (const name of readdirSync(mediaDir)) {
  if (name.startsWith('overwatch-')) {
    renameIf(join(mediaDir, name), join(mediaDir, name.replace(/^overwatch-/, 'destiny-')))
  }
}
const videoDir = join(root, 'public', 'videos')
for (const name of readdirSync(videoDir)) {
  if (name.startsWith('overwatch-') && name.endsWith('.mp4')) {
    renameIf(join(videoDir, name), join(videoDir, name.replace(/^overwatch-/, 'destiny-')))
  }
}

console.log(`Rebrand applied to ${changed} files.`)
