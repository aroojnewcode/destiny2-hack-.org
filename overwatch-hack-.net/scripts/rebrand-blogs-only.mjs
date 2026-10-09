import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const file = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'blogs.ts')

const REPLACEMENTS = [
  ['https://overwatchhack.net', 'https://overwatchhack.net'],
  ['overwatchhack.net', 'overwatchhack.net'],
  ['Overwatch Hack', 'Overwatch Hack'],
  ['Overwatch hack', 'Overwatch hack'],
  ['Overwatch Hacks', 'Overwatch Hacks'],
  ['Overwatch cheats', 'Overwatch cheats'],
  ['Overwatch cheat', 'Overwatch cheat'],
  ['Overwatch Aimbot', 'Overwatch Aimbot'],
  ['Overwatch ESP', 'Overwatch ESP'],
  ['Overwatch GUIDE', 'OVERWATCH GUIDE'],
  ['Overwatch HACK', 'OVERWATCH HACK'],
  ['Overwatch 2', 'Overwatch 2'],
  ['Overwatch', 'Overwatch'],
  ['counter strike 2', 'overwatch 2'],
  ['overwatch hack', 'overwatch hack'],
  ['overwatch hacks', 'overwatch hacks'],
  ['cs2 cheat', 'overwatch cheat'],
  ['overwatch cheats', 'overwatch cheats'],
  ['overwatch aimbot', 'overwatch aimbot'],
  ['overwatch esp', 'overwatch esp'],
  ['cs2 vac', 'overwatch anti-cheat'],
  ['cs2 stream', 'overwatch stream'],
  ['anti-cheat status', 'anti-cheat status'],
  ['Anti-cheat Status', 'Anti-cheat Status'],
  [' anti-cheat ', ' anti-cheat '],
  ['Blizzard', 'Blizzard'],
  ['launch CS2', 'launch Overwatch 2'],
  ['in CS2', 'in Overwatch 2'],
  ['Overwatch server', 'Overwatch server'],
  ['Overwatch patches', 'Overwatch 2 patches'],
  ['King's Row', "King's Row"],
  ['Busan', 'Busan'],
  ['Inferno banana', 'tight choke points'],
  ['Overpass or Ancient', 'Junkertown or Gibraltar'],
  ['Commercial Overwatch hack guides', 'Commercial Overwatch hack guides'],
  ['overwatch hack, cs2 cheat, overwatch hacks', 'overwatch hack, overwatch cheat, overwatch hacks'],
]

let out = readFileSync(file, 'utf8')
for (const [from, to] of REPLACEMENTS) {
  out = out.split(from).join(to)
}
writeFileSync(file, out, 'utf8')
console.log('blogs.ts rebranded')
