/**
 * One-time rebrand: CS2 Hack / cs2hack.net → Overwatch Hack / overwatchhack.net
 */
import { readFileSync, writeFileSync, readdirSync, statSync, renameSync, unlinkSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')

const SKIP_DIRS = new Set(['node_modules', 'dist', '.git'])
const EXT = new Set([
  '.ts',
  '.tsx',
  '.astro',
  '.mjs',
  '.js',
  '.json',
  '.md',
  '.toml',
  '.txt',
  '.xml',
])

/** Longest / most specific replacements first. */
const REPLACEMENTS = [
  ['https://cs2hack.net', 'https://overwatchhack.net'],
  ['cs2hack.net', 'overwatchhack.net'],
  ['CS2 Hack', 'Overwatch Hack'],
  ['CS2 Hacks', 'Overwatch Hacks'],
  ['Counter-Strike 2', 'Overwatch 2'],
  ['counter-strike 2', 'overwatch 2'],
  ['Counter-Strike', 'Overwatch'],
  ['counter-strike', 'overwatch'],
  ['/counter-strike-2-hack', '/overwatch-2-hack'],
  ['/cs2-cheats', '/overwatch-cheats'],
  ['/cs2-hacks', '/overwatch-hacks'],
  ['/cs2-hack', '/overwatch-hack'],
  ['counter-strike-2-hack', 'overwatch-2-hack'],
  ['cs2-cheats', 'overwatch-cheats'],
  ['cs2-hacks', 'overwatch-hacks'],
  ['cs2-hack', 'overwatch-hack'],
  ["getGame('cs2')", "getGame('overwatch')"],
  ["slug: 'cs2'", "slug: 'overwatch'"],
  ['guideSlug="cs2-hack"', 'guideSlug="overwatch-hack"'],
  ['OFFICIAL_CS2_LINKS', 'OFFICIAL_OVERWATCH_LINKS'],
  ['Cs2ProductPreview', 'OverwatchProductPreview'],
  ['CS2_OG', 'OVERWATCH_OG'],
  ['VAC status', 'anti-cheat status'],
  ['VAC Status', 'Anti-cheat Status'],
  ['VAC patches', 'Overwatch 2 patches'],
  ['VAC rebuilds', 'anti-cheat rebuilds'],
  [' VAC ', ' anti-cheat '],
  ['Premier, Competitive', 'Competitive, Quick Play'],
  ['Premier and', 'Competitive and'],
  ['Dust II, Mirage, Inferno', "King's Row, Busan, Midtown"],
  ['Mirage', "King's Row"],
  ['Dust II', 'Busan'],
  ['Valve modes', 'Blizzard modes'],
  ['Valve account', 'Battle.net account'],
  ['Valve', 'Blizzard'],
  ['CS2 ', 'Overwatch '],
  ['CS2·', 'Overwatch 2·'],
  ['CS2.', 'Overwatch 2.'],
  ['cs2 hack', 'overwatch hack'],
  ['cs2 hacks', 'overwatch hacks'],
  ['cs2 cheats', 'overwatch cheats'],
  ['cs2 aimbot', 'overwatch aimbot'],
  ['cs2 esp', 'overwatch esp'],
  ['cs2 wallhack', 'overwatch wallhack'],
  ['cs2 radar', 'overwatch radar'],
  ['vac cs2 hack', 'overwatch hack anti-cheat'],
  ['CS2 Aimbot', 'Overwatch Aimbot'],
  ['CS2 ESP', 'Overwatch ESP'],
  ['CS2 GUIDE', 'OVERWATCH GUIDE'],
  ['CS2 HACK', 'OVERWATCH HACK'],
  ['Buy CS2', 'Buy Overwatch'],
  ['Search CS2', 'Search Overwatch'],
  ['name: CS2', 'name: Overwatch'],
  ['CS2 hack', 'Overwatch hack'],
  ['CS2 cheats', 'Overwatch cheats'],
  ['CS2 cheat', 'Overwatch cheat'],
  ['CS2 product', 'Overwatch product'],
  ['CS2 preview', 'Overwatch preview'],
  ['CS2 feature', 'Overwatch feature'],
  ['CS2 buyer', 'Overwatch buyer'],
  ['CS2 player', 'Overwatch player'],
  ['CS2 license', 'Overwatch license'],
  ['CS2 patches', 'Overwatch 2 patches'],
  ['CS2 on', 'Overwatch 2 on'],
  ['CS2 ·', 'Overwatch 2 ·'],
  ['for CS2', 'for Overwatch 2'],
  ['on CS2', 'on Overwatch 2'],
  ['/products/cs2-faceit', '/products/overwatch-2-hack'],
  ['cs2hack-net', 'overwatchhack-net'],
  ['cs2-faceit', 'overwatch-2-hack'],
  ['file: \'cs2-hack.jpg\'', "file: 'overwatch-hack.jpg'"],
  ['/og/cs2-hack.jpg', '/og/overwatch-hack.jpg'],
  ['OG_PRODUCT = \'/og/cs2-hack.jpg\'', "OG_PRODUCT = '/og/overwatch-hack.jpg'"],
  ['  cs2: {', '  overwatch: {'],
  ['Missing CS2 media', 'Missing Overwatch media'],
  ['requiredCs2Media', 'requiredOverwatchMedia'],
  ['official CS2 links', 'official Overwatch links'],
  ['factual game context', 'factual game context'],
  ['IMAGE_SEO[slug]', 'IMAGE_SEO[slug]'],
  ['\'CS2 hack\'', "'Overwatch hack'"],
  ['"CS2 hack"', '"Overwatch hack"'],
  ['CS2 media asset', 'Overwatch media asset'],
  ['CS2 · Worldwide', 'Overwatch 2 · Worldwide'],
  ['CS2 Hack —', 'Overwatch Hack —'],
  ['CS2 Hack |', 'Overwatch Hack |'],
  ['CS2 Hack,', 'Overwatch Hack,'],
  ['CS2 Hack.', 'Overwatch Hack.'],
  ['CS2 Hack ', 'Overwatch Hack '],
  ['>CS2 Hack<', '>Overwatch Hack<'],
  ['aria-label="Buy CS2 Hack"', 'aria-label="Buy Overwatch Hack"'],
  ['Buy CS2 Hack', 'Buy Overwatch Hack'],
  ['Check VAC status', 'Check anti-cheat status'],
  ['live VAC', 'live anti-cheat'],
  ['after VAC', 'after anti-cheat'],
  ['pattern = "cs2hack.net"', 'pattern = "overwatchhack.net"'],
  ['pattern = "www.cs2hack.net"', 'pattern = "www.overwatchhack.net"'],
  ['CANONICAL_ORIGIN = \'https://cs2hack.net\'', "CANONICAL_ORIGIN = 'https://overwatchhack.net'"],
  ['SITE_URL || \'https://cs2hack.net\'', "SITE_URL || 'https://overwatchhack.net'"],
  ['under cs2hack.net', 'under overwatchhack.net'],
  ['on cs2hack.net', 'on overwatchhack.net'],
  ['· cs2hack.net', '· overwatchhack.net'],
  ['for CS2 Hack', 'for Overwatch Hack'],
  ['License rules for CS2 Hack', 'License rules for Overwatch Hack'],
  ['How cs2hack.net handles', 'How overwatchhack.net handles'],
]

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (SKIP_DIRS.has(name)) continue
    const st = statSync(path)
    if (st.isDirectory()) walk(path, files)
    else if (EXT.has(extname(name))) files.push(path)
  }
  return files
}

function apply(content) {
  let out = content
  for (const [from, to] of REPLACEMENTS) {
    out = out.split(from).join(to)
  }
  return out
}

const files = walk(root).filter((f) => !f.includes('rebrand-to-overwatch.mjs'))
let changed = 0
for (const file of files) {
  const before = readFileSync(file, 'utf8')
  const after = apply(before)
  if (after !== before) {
    writeFileSync(file, after, 'utf8')
    changed++
  }
}

const pageOld = join(root, 'src', 'pages', 'cs2-hack.astro')
const pageNew = join(root, 'src', 'pages', 'overwatch-hack.astro')
try {
  if (statSync(pageOld).isFile()) renameSync(pageOld, pageNew)
} catch {
  /* already renamed */
}

const compOld = join(root, 'src', 'components', 'Cs2ProductPreview.tsx')
const compNew = join(root, 'src', 'components', 'OverwatchProductPreview.tsx')
try {
  if (statSync(compOld).isFile()) renameSync(compOld, compNew)
} catch {
  /* already renamed */
}

const ogOld = join(root, 'public', 'og', 'cs2-hack.jpg')
const ogNew = join(root, 'public', 'og', 'overwatch-hack.jpg')
try {
  renameSync(ogOld, ogNew)
} catch {
  /* regenerated later */
}

console.log(`Rebrand applied to ${changed} files.`)
