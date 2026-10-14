import { useMemo, useState } from 'react'
import { LayoutGrid, MessageSquare } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import {
  FORUM_CATEGORIES,
  FORUM_QUICK_LINKS,
  FORUM_THREADS,
  formatForumDate,
  formatForumNumber,
  forumPath,
  type ForumCategory,
} from '../data/forums'
import { PRODUCT_PATH, SITE_HOST, SITE_NAME } from '../data/site'

type Filter = 'All' | ForumCategory

export function ForumsPage() {
  const [filter, setFilter] = useState<Filter>('All')

  const threads = useMemo(() => {
    if (filter === 'All') return FORUM_THREADS
    return FORUM_THREADS.filter((t) => t.category === filter)
  }, [filter])

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x pt-10 sm:pt-14">
          <div className="mx-auto max-w-5xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 text-xs text-white/45"
              aria-label="Breadcrumb"
            >
              <a href="/" className="hover:text-white/70">
                Home
              </a>
              <span aria-hidden>›</span>
              <span className="text-white/70">Forum</span>
            </nav>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              {SITE_NAME} forum
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/65">
              Destiny 2 Hack help threads on{' '}
              <a href="/" className="font-medium text-z-soft hover:text-white">
                {SITE_HOST}
              </a>
              . Topics cover{' '}
              <a href="/blogs/features-list" className="font-medium text-z-soft hover:text-white">
                player ESP
              </a>
              , Aimbot setup, BattlEye{' '}
              <a
                href="/blogs/anti-cheat-status"
                className="font-medium text-z-soft hover:text-white"
              >
                Status page
              </a>{' '}
              checks, and the{' '}
              <a href={PRODUCT_PATH} className="font-medium text-z-soft hover:text-white">
                product page
              </a>{' '}
              before checkout. Need a live answer? Open{' '}
              <a href="/support" className="font-medium text-z-soft hover:text-white">
                Support
              </a>
              .
            </p>

            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-z-soft">
              {FORUM_QUICK_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              ))}
            </div>

            <div
              className="mt-8 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Forum categories"
            >
              {FORUM_CATEGORIES.map((cat) => {
                const active = filter === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(cat)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-z-accent text-white'
                        : 'border border-white/10 bg-white/[0.04] text-white/75 hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    {cat === 'All' ? (
                      <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.75} />
                    ) : null}
                    {cat}
                  </button>
                )
              })}
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <div className="hidden grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_7rem] gap-4 border-b border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40 sm:grid sm:px-5">
                <span>Thread</span>
                <span className="text-center">Replies</span>
                <span className="text-center">Views</span>
                <span className="text-right">Last reply</span>
              </div>

              <ul className="divide-y divide-white/10">
                {threads.map((thread) => (
                  <li key={thread.slug}>
                    <a
                      href={forumPath(thread.slug)}
                      className="grid grid-cols-1 gap-3 px-4 py-5 transition-colors hover:bg-white/[0.03] sm:grid-cols-[minmax(0,1fr)_5.5rem_5.5rem_7rem] sm:items-center sm:gap-4 sm:px-5"
                    >
                      <div className="flex gap-3">
                        <MessageSquare
                          className="mt-1 h-4 w-4 shrink-0 text-z-soft/70"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-z-soft">{thread.category}</p>
                          <h2 className="mt-1 text-base font-semibold tracking-tight text-white sm:text-lg">
                            {thread.title}
                          </h2>
                          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/50">
                            {thread.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-6 pl-7 sm:contents">
                        <div className="text-left sm:text-center">
                          <p className="text-base font-semibold text-white">
                            {formatForumNumber(thread.replies)}
                          </p>
                          <p className="text-xs text-white/40">replies</p>
                        </div>
                        <div className="text-left sm:text-center">
                          <p className="text-base font-semibold text-white">
                            {formatForumNumber(thread.views)}
                          </p>
                          <p className="text-xs text-white/40">views</p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className="text-sm font-medium text-white">
                            {formatForumDate(thread.lastReplyDate)}
                          </p>
                          <p className="text-xs text-white/40">{thread.lastReplyAuthor}</p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {threads.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-white/50">
                  No threads in this category.
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <SiteFooter currentPath="/forums" />
      </main>
    </div>
  )
}
