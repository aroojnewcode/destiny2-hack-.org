import { ArrowLeft } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { CheckoutLink } from '../components/CheckoutLink'
import {
  FORUM_THREADS,
  formatForumDate,
  formatForumNumber,
  forumPath,
  getForumThread,
} from '../data/forums'
import { PRODUCT_PATH, SITE_HOST } from '../data/site'
import { NotFoundPage } from './NotFoundPage'

type ForumThreadPageProps = {
  slug: string
}

export function ForumThreadPage({ slug }: ForumThreadPageProps) {
  const thread = getForumThread(slug)
  if (!thread) return <NotFoundPage />

  const related = FORUM_THREADS.filter((t) => t.slug !== thread.slug).slice(0, 4)

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <article className="page-x py-10 sm:py-14">
          <div className="mx-auto max-w-3xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <a href="/" className="hover:text-white/70">
                Home
              </a>
              <span>/</span>
              <a href="/forums" className="hover:text-white/70">
                Forum
              </a>
              <span>/</span>
              <span className="text-white/70">{thread.category}</span>
            </nav>

            <p className="mt-6 text-xs font-medium text-z-soft">{thread.category}</p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {thread.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/60">{thread.excerpt}</p>
            <p className="mt-3 text-sm text-white/40">
              {formatForumNumber(thread.replies)} replies · {formatForumNumber(thread.views)} views
              · last reply {formatForumDate(thread.lastReplyDate)} by {thread.lastReplyAuthor}
            </p>

            <div className="mt-10 space-y-4 text-sm leading-relaxed text-white/60 sm:text-base">
              {thread.body.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            <div className="page-card mt-12 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white">Need a live answer?</h2>
              <p className="mt-2 text-sm text-white/55">
                Check anti-cheat status on the product page, then buy Destiny 2 Hack on {SITE_HOST}{' '}
                or open Support with your order ID.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PRODUCT_PATH}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/5"
                >
                  Product page
                </a>
                <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white">
                  Buy Destiny 2 Hack
                </CheckoutLink>
              </div>
            </div>

            <a
              href="/forums"
              className="mt-10 inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              All forum threads
            </a>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="page-band page-x border-t border-white/10 py-12">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-xl font-semibold text-white">More forum threads</h2>
              <ul className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">
                {related.map((t) => (
                  <li key={t.slug}>
                    <a
                      href={forumPath(t.slug)}
                      className="block px-5 py-4 transition-colors hover:bg-white/[0.03]"
                    >
                      <p className="text-xs text-z-soft">{t.category}</p>
                      <p className="mt-1 font-semibold text-white">{t.title}</p>
                      <p className="mt-1 text-sm text-white/50 line-clamp-1">{t.excerpt}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <SiteFooter currentPath={forumPath(thread.slug)} />
      </main>
    </div>
  )
}
