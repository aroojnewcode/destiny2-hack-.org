import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'src')
const EXT = new Set(['.ts', '.tsx'])

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (EXT.has(extname(name))) out.push(p)
  }
  return out
}

/** Fix single-quoted strings broken by Twilight Gap apostrophe. */
function fixContent(text) {
  return text.replace(/'([^'\n]*Twilight Gap[^'\n]*)'/g, (_, inner) => {
    return `"${inner.replace(/"/g, '\\"')}"`
  })
}

for (const file of walk(root)) {
  const before = readFileSync(file, 'utf8')
  const after = fixContent(before)
  if (after !== before) writeFileSync(file, after, 'utf8')
}
