import { useMemo, useState } from 'react'
import { ArrowRight, Crosshair, Eye, Radar, Sparkles } from 'lucide-react'
import { SiteFooter } from '../components/SiteFooter'
import { HeroSearch } from '../components/HeroSearch'
import { FaqSection } from '../components/FaqSection'
import { guidePath } from '../data/games'
import { CheckoutLink } from '../components/CheckoutLink'
import { FeaturePreviewSection } from '../components/FeaturePreviewSection'
import { FeatureModulesSection } from '../components/FeatureModulesSection'
import { HOME_FAQS } from '../data/faqs'
import { HOME_HEADINGS, PRODUCT_PATH, SITE_NAME, SITE_PURPOSE } from '../data/site'
import { HOME_BLOG_CARDS } from '../data/blogs-index'
import { blogPath } from '../data/blog-paths'

const FEATURES = [
  {
    icon: Crosshair,
    label: 'Destiny 2 Aimbot',
    desc: 'Silent aim with FOV, smoothing and bone selection — shots land near an enemy and still look legit.',
  },
  {
    icon: Eye,
    label: 'ESP / Wallhack',
    desc: 'Guardian boxes, distance and health through walls — Super and ability info when supported.',
  },
  {
    icon: Radar,
    label: 'Radar hack',
    desc: '2D radar for off-screen guardians so flanks stop ending your team fights.',
  },
  {
    icon: Sparkles,
    label: 'anti-cheat status',
    desc: 'We publish live anti-cheat status after Destiny 2 patches — clear to load, or wait.',
  },
] as const

/** Below-fold home body — deferred until near viewport. */
export function HomeBelowFold() {
  const [blogQuery, setBlogQuery] = useState('')

  const blogSearchItems = useMemo(
    () =>
      HOME_BLOG_CARDS.map((post) => ({
        id: post.slug,
        title: post.title,
        href: blogPath(post.slug),
        subtitle: post.tag,
        keywords: `${post.excerpt} ${post.tag}`,
      })),
    [],
  )

  const filteredBlogCards = useMemo(() => {
    const term = blogQuery.trim().toLowerCase()
    if (!term) return HOME_BLOG_CARDS
    return HOME_BLOG_CARDS.filter((post) => {
      const hay = `${post.title} ${post.excerpt} ${post.tag}`.toLowerCase()
      return hay.includes(term)
    })
  }, [blogQuery])

  return (
    <>
      <div className="hero-to-body" aria-hidden />

      <div className="page-body relative z-10">
        <section className="page-band page-x border-t border-z-soft/15 py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {HOME_HEADINGS.h2Features}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="page-card flex h-full min-h-[168px] flex-col rounded-2xl p-5"
                >
                  <div className="icon-well mb-4">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturePreviewSection />

        <FeatureModulesSection />

        <section id="picks" className="page-x py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Blogs
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Destiny 2 Hack Blogs
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Pricing, Aimbot, ESP, radar, Windows setup, anti-cheat status and loader fixes before
                  you buy on destiny2hack.org.
                </p>
              </div>
              <a
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white"
              >
                All blogs
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div className="relative z-20 mt-8 max-w-xl">
              <HeroSearch
                value={blogQuery}
                onChange={setBlogQuery}
                submitTo="filter"
                items={blogSearchItems}
                placeholder="Search Destiny 2 Hack Blogs…"
              />
            </div>

            <div id="blog-results" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBlogCards.length ? (
                filteredBlogCards.map((post) => (
                  <a
                    key={post.slug}
                    href={blogPath(post.slug)}
                    className="page-card group flex h-full flex-col rounded-2xl p-5 sm:p-6"
                  >
                    <p className="text-xs uppercase tracking-wider text-white/45">{post.tag}</p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-white">
                      {post.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-white/80">
                      Read guide
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={1.75}
                      />
                    </span>
                  </a>
                ))
              ) : (
                <p className="col-span-full text-sm text-white/55">
                  No blogs match “{blogQuery.trim()}”. Try Aimbot, ESP, setup, or price.
                </p>
              )}
            </div>

            <div className="page-card mt-8 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="text-lg font-semibold text-white">Destiny 2 Hack product</p>
                <p className="mt-1 text-sm text-white/55">
                  Detailed features · anti-cheat status · price · checkout
                </p>
              </div>
              <a
                href={guidePath('destiny-2')}
                className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white"
              >
                View product details
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="page-band page-x border-t border-white/10 py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
            <div className="page-card flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  About {SITE_NAME}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {HOME_HEADINGS.h2About}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  {SITE_PURPOSE} Clear features, honest status labels, and deep forums for
                  setup. Then check{' '}
                  <a
                    href={PRODUCT_PATH}
                    className="text-white/80 underline-offset-2 hover:underline"
                  >
                    the Destiny 2 feature list
                  </a>
                  ,{' '}
                  <a href="/reviews" className="text-white/80 underline-offset-2 hover:underline">
                    reviews
                  </a>
                  , or{' '}
                  <a href="/support" className="text-white/80 underline-offset-2 hover:underline">
                    loader help
                  </a>
                  .
                </p>
              </div>
              <a
                href={guidePath('destiny-2')}
                className="cta-gradient mt-8 inline-flex w-fit items-center justify-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium text-white"
              >
                See Destiny 2 product details
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>

            <div
              id="access"
              className="page-card flex h-full min-h-[240px] flex-col justify-between rounded-2xl p-6 sm:rounded-3xl sm:p-8 lg:p-10"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                  Checkout
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {HOME_HEADINGS.h2Access}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
                  Confirm Destiny 2 Hack anti-cheat status is clear to load, then checkout for digital delivery
                  on supported Windows builds — worldwide.
                </p>
              </div>
              <CheckoutLink className="cta-gradient mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-fit">
                Get Destiny 2 Hacks license
              </CheckoutLink>
            </div>
          </div>
        </section>

        <FaqSection
          id="faq"
          heading={HOME_HEADINGS.h2Faq}
          intro="anti-cheat status, Aimbot and ESP, servers, delivery and checkout — before you buy."
          items={HOME_FAQS}
          moreHref="/faq"
          moreLabel="Full FAQ →"
        />

        <SiteFooter currentPath="/" />
      </div>
    </>
  )
}
