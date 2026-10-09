import { Check, Crosshair, Monitor, Sparkles, Star } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { GameCover } from '../components/GameCover'
import {
  GAMES,
  getGame,
  guidePath,
  parseGuideSlug,
  type Game,
} from '../data/games'
import { SITE_HOST } from '../data/site'
import { CheckoutLink } from '../components/CheckoutLink'
import { NotFoundPage } from './NotFoundPage'

const REQUIREMENTS = [
  'Windows 10 & 11',
  'Intel & AMD',
  'Destiny 2 on PC',
  'Instant digital delivery',
  'Setup help included',
] as const

function ProductShowcaseCard({ game }: { game: Game }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-z-card sm:rounded-3xl">
      <CheckoutLink className="relative block" aria-label="Buy Destiny 2 Hack">
        <GameCover
          slug={game.slug}
          name={game.name}
          aspect="video"
          variant="product"
          priority
          className="rounded-none"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-3 sm:p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-z-soft" strokeWidth={1.75} />
            Gameplay preview
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
            <Crosshair className="h-3.5 w-3.5 text-z-soft" strokeWidth={1.75} />
            Combat
          </span>
        </div>
      </CheckoutLink>
      <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-z-accent/20 text-z-soft">
          <Star className="h-4 w-4" strokeWidth={1.75} fill="currentColor" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">Destiny 2 Hack</p>
          <p className="text-xs text-white/45">Windows PC · price at checkout</p>
        </div>
      </div>
    </div>
  )
}

type GameProductPageProps = {
  guideSlug: string
}

function isProductGuideSlug(slug: string) {
  const lower = slug.toLowerCase()
  return lower.endsWith('-cheats') || lower.endsWith('-hack')
}

export function GameProductPage({ guideSlug }: GameProductPageProps) {
  const slug = parseGuideSlug(guideSlug)
  const game = getGame(slug) ?? (GAMES.length === 1 ? GAMES[0] : undefined)

  if (!isProductGuideSlug(guideSlug)) {
    const maybe = getGame(guideSlug.toLowerCase())
    if (maybe) {
      if (typeof window !== 'undefined') {
        window.location.replace(guidePath(maybe.slug))
      }
      return null
    }
    return <NotFoundPage />
  }

  if (!game) return <NotFoundPage />

  return (
    <>
      <div className="content-surface-nav">
        <Navbar />
      </div>

      <main>
        <section className="page-x py-8 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <a href="/" className="shrink-0 hover:text-white/70">
                Home
              </a>
              <span className="shrink-0">/</span>
              <span className="min-w-0 text-white/70">Destiny2 Cheats</span>
            </nav>

            {/* Product details + image on top (single showcase — no duplicate card) */}
            <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-7">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-z-soft">
                  <Monitor className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  Windows PC · {SITE_HOST}
                </p>

                <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                  Buy <span className="text-z-accent">Destiny 2 Hack</span>
                </h1>

                <p className="mt-4 inline-flex rounded-full border border-z-accent/40 bg-z-accent/15 px-3.5 py-1.5 text-xs font-semibold text-white sm:text-sm">
                  Price shown at checkout
                </p>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                  Windows PC access to the Destiny 2 Hack feature list — Aimbot, ESP, wallhack and
                  radar. The current price and term are on the checkout page.
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
                  {REQUIREMENTS.map((item) => (
                    <li key={item} className="inline-flex items-center gap-2 text-sm text-white/80">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-z-accent/20">
                        <Check className="h-3 w-3 text-z-soft" strokeWidth={2.5} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 lg:hidden">
                  <ProductShowcaseCard game={game} />
                </div>
              </div>

              <aside className="hidden lg:col-span-5 lg:block">
                <div className="sticky top-24">
                  <ProductShowcaseCard game={game} />
                  <CheckoutLink className="cta-gradient mt-4 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    Buy Destiny 2 Hack
                  </CheckoutLink>
                </div>
              </aside>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
