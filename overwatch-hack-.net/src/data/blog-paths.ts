/** Blog article path helpers — separate from /forums threads. */

export function blogPath(slug: string) {
  return `/blogs/${slug}`
}

export function blogsPath() {
  return '/blogs'
}

export function forumsPath() {
  return '/forums'
}
