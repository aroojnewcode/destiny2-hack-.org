/**
 * Host redirects for legacy Pages Functions (if invoked).
 * Canonical host is apex — always 301 www → non-www over HTTPS.
 * Sitemap/robots must stay 200 on www (GSC URL-prefix properties).
 */
function isSeoCrawlerFile(pathname) {
  return (
    pathname === '/sitemap.xml' ||
    pathname === '/sitemap-index.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.css'
  )
}

export async function onRequest(context) {
  const url = new URL(context.request.url)
  const seoFile = isSeoCrawlerFile(url.pathname)

  if (url.protocol === 'http:') {
    url.protocol = 'https:'
  }

  const host = url.hostname.toLowerCase()
  if (host.startsWith('www.') && !seoFile) {
    url.hostname = host.slice(4)
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }

  if (url.protocol === 'http:') {
    url.protocol = 'https:'
    return Response.redirect(url.toString(), 301)
  }

  return context.next()
}
