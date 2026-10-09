/**
 * Print title/description lengths for every built HTML page (post-build).
 * Targets: title ≤60 chars, description 120–160 chars (Google SERP sweet spot).
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const dist = join(import.meta.dirname, '..', 'dist')

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name)
    return e.isDirectory() ? walk(p) : e.name.endsWith('.html') ? [p] : []
  })
}

const decode = (s) =>
  s
    .replaceAll('&amp;', '&')
    .replaceAll('&#39;', "'")
    .replaceAll('&quot;', '"')

let warn = 0
for (const file of walk(dist).sort()) {
  const page = relative(dist, file).replaceAll('\\', '/')
  const html = readFileSync(file, 'utf8')
  const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] || '')
  const description = decode(html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '')
  const tFlag = title.length > 60 ? 'TITLE_LONG' : title.length < 30 ? 'TITLE_SHORT' : ''
  const dFlag =
    description.length > 160 ? 'DESC_LONG' : description.length < 120 ? 'DESC_SHORT' : ''
  const flags = [tFlag, dFlag].filter(Boolean).join(',')
  if (flags) warn++
  console.log(
    `${page.padEnd(42)} | T:${String(title.length).padStart(3)} | D:${String(description.length).padStart(3)}${flags ? ` | ${flags}` : ''}`,
  )
  if (flags) {
    if (tFlag) console.log(`  title: ${title}`)
    if (dFlag) console.log(`  desc:  ${description}`)
  }
}
console.log(`\nPages with length flags: ${warn}`)
