import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { VideoBg } from '../components/VideoBg'
import { BLOGS, blogPath, formatBlogDate } from '../data/blogs'
import { forumPath } from '../data/forums'
import { PRODUCT_PATH, SITE_NAME } from '../data/site'

const QUICK_LINKS = [
  { label: 'Destiny2 Cheats', href: PRODUCT_PATH },
  { label: 'Features', href: blogPath('features-list') },
  { label: 'Status', href: blogPath('anti-cheat-status') },
  { label: 'Fresh install thread', href: forumPath('fresh-install-order') },
  { label: 'FAQ', href: '/faq' },
] as const

function categoryLine(post: (typeof BLOGS)[number], featured: boolean) {
  if (featured) {
    return post.categories?.length
      ? `Featured, ${post.categories.join(', ')}`
      : `Featured, ${post.tag}`
  }
  return post.categories?.length ? post.categories.join(', ') : post.tag
}

export function BlogsPage() {
  const [featured, ...rest] = BLOGS

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <section className="relative flex min-h-[52vh] flex-col overflow-x-clip sm:min-h-[58vh]">
        <VideoBg
          image="/media/destiny-esp-street.webp"
          imageAlt="Destiny 2 ESP screenshot with cyan enemy silhouettes through doorways"
        />
        <div className="relative z-20 flex min-h-[52vh] flex-col sm:min-h-[58vh]">
          <Navbar onVideo />
          <div className="page-x mt-auto pb-12 sm:pb-16">
            <div className="mx-auto max-w-3xl">
              <nav
                className="flex flex-wrap items-center gap-x-1.5 text-xs text-white/45"
                aria-label="Breadcrumb"
              >
                <a href="/" className="hover:text-white/70">
                  Home
                </a>
                <span aria-hidden>›</span>
                <span className="text-white/70">Blogs</span>
              </nav>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Destiny 2 Hack guides
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                Pricing, ESP and aimbot features, PC requirements, BattlEye, choosing a provider,
                aimbot settings, and troubleshooting for Destiny 2 Hack on destiny2hack.org.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-z-soft">
                {QUICK_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="hero-to-body" aria-hidden />

      <main className="page-body relative z-10">
        <section className="page-x py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            {featured ? (
              <article className="border-b border-white/10 pb-12">
                <p className="text-sm font-medium text-z-soft">
                  {categoryLine(featured, true)}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-4xl">
                  <a href={blogPath(featured.slug)} className="hover:text-white/90">
                    {featured.title}
                  </a>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/55">
                  {featured.excerpt}
                </p>
                <p className="mt-4 text-sm text-white/40">
                  {SITE_NAME}, {formatBlogDate(featured.date)}
                </p>
                <a
                  href={blogPath(featured.slug)}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-z-soft transition-colors hover:text-white"
                >
                  Read article →
                </a>
              </article>
            ) : null}

            <div className="divide-y divide-white/10">
              {rest.map((post) => (
                <article key={post.slug} className="py-10">
                  <p className="text-sm text-white/40">
                    {categoryLine(post, false)}, {formatBlogDate(post.date)}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    <a href={blogPath(post.slug)} className="hover:text-white/90">
                      {post.title}
                    </a>
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-white/55">
                    {post.excerpt}
                  </p>
                  <a
                    href={blogPath(post.slug)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-z-soft transition-colors hover:text-white"
                  >
                    Read →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter currentPath="/blogs" />
      </main>
    </div>
  )
}
