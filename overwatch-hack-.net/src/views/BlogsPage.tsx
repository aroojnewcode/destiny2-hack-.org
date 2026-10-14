import { useMemo, useState } from 'react'
import {
  BookOpen,
  Calendar,
  ChevronDown,
  LayoutGrid,
  RefreshCw,
  Settings2,
  Sparkles,
  Wrench,
} from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import {
  BLOGS,
  blogCoverImage,
  blogPath,
  blogTopic,
  formatBlogCardDate,
  type BlogPost,
  type BlogTopic,
} from '../data/blogs'

type FilterId = 'all' | BlogTopic
type SortId = 'newest' | 'oldest' | 'title'

const FILTERS: {
  id: FilterId
  label: string
  icon: typeof LayoutGrid
}[] = [
  { id: 'all', label: 'All articles', icon: LayoutGrid },
  { id: 'Features', label: 'Features', icon: Sparkles },
  { id: 'Guides', label: 'Guides', icon: BookOpen },
  { id: 'Setup', label: 'Setup', icon: Wrench },
  { id: 'Updates', label: 'Updates', icon: RefreshCw },
]

const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: 'newest', label: 'Newest first' },
  { id: 'oldest', label: 'Oldest first' },
  { id: 'title', label: 'Title A–Z' },
]

function topicIcon(topic: BlogTopic) {
  switch (topic) {
    case 'Features':
      return Sparkles
    case 'Setup':
      return Wrench
    case 'Updates':
      return RefreshCw
    default:
      return BookOpen
  }
}

function sortPosts(posts: BlogPost[], sort: SortId) {
  const next = [...posts]
  if (sort === 'title') {
    next.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort === 'oldest') {
    next.sort((a, b) => a.date.localeCompare(b.date))
  } else {
    next.sort((a, b) => b.date.localeCompare(a.date))
  }
  return next
}

function BlogCard({ post }: { post: BlogPost }) {
  const topic = blogTopic(post)
  const TopicIcon = topicIcon(topic)
  const cover = blogCoverImage(post)

  return (
    <a
      href={blogPath(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-z-card ring-1 ring-white/8 transition duration-300 hover:-translate-y-0.5 hover:ring-z-soft/35"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={cover}
          alt=""
          width={640}
          height={400}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-z-card/80 via-transparent to-black/20" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm ring-1 ring-white/10">
          <TopicIcon className="h-3 w-3 text-z-soft" strokeWidth={2} />
          {topic}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm ring-1 ring-white/10">
          <Calendar className="h-3 w-3 text-white/70" strokeWidth={2} />
          {formatBlogCardDate(post.date)}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-white/90">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/65">{post.excerpt}</p>
      </div>
    </a>
  )
}

export function BlogsPage() {
  const [filter, setFilter] = useState<FilterId>('all')
  const [sort, setSort] = useState<SortId>('newest')

  const posts = useMemo(() => {
    const filtered =
      filter === 'all' ? BLOGS : BLOGS.filter((post) => blogTopic(post) === filter)
    return sortPosts(filtered, sort)
  }, [filter, sort])

  const activeSortLabel = SORT_OPTIONS.find((option) => option.id === sort)?.label ?? 'Newest first'

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <Navbar />

      <main className="page-body relative z-10">
        <section className="page-x pb-16 pt-10 sm:pb-20 sm:pt-14">
          <div className="mx-auto max-w-6xl">
            <header className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-z-soft">Blog</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Destiny 2 Hack Blogs
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                Filter by topic or sort to find setup guides, feature deep-dives, and patch-day
                notes.
              </p>
            </header>

            <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Filter articles by topic"
              >
                {FILTERS.map(({ id, label, icon: Icon }) => {
                  const active = filter === id
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFilter(id)}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                        active
                          ? 'bg-z-hover text-white ring-1 ring-z-soft/70'
                          : 'bg-z-elevated text-white/75 ring-1 ring-white/10 hover:bg-z-hover hover:text-white'
                      }`}
                    >
                      <Icon
                        className={`h-3.5 w-3.5 ${active ? 'text-z-soft' : 'text-white/50'}`}
                        strokeWidth={1.75}
                      />
                      {label}
                    </button>
                  )
                })}
              </div>

              <label className="flex w-full flex-col gap-1.5 sm:w-auto sm:min-w-[220px]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Sort by
                </span>
                <span className="relative block">
                  <Settings2
                    className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-z-soft"
                    strokeWidth={1.75}
                  />
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as SortId)}
                    className="w-full appearance-none rounded-full bg-z-elevated py-2.5 pl-10 pr-10 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-z-hover focus:outline-none focus:ring-z-soft/50"
                    aria-label={`Sort by ${activeSortLabel}`}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.id} value={option.id} className="bg-z-card text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
                    strokeWidth={1.75}
                  />
                </span>
              </label>
            </div>

            {posts.length ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="mt-12 text-center text-sm text-white/50">
                No articles in this topic yet.
              </p>
            )}
          </div>
        </section>

        <SiteFooter currentPath="/blogs" />
      </main>
    </div>
  )
}
