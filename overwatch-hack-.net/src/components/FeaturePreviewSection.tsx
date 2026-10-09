import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Eye,
  Play,
  Target,
} from 'lucide-react'
import { CheckoutLink } from './CheckoutLink'
import { PreviewVideoPlayer } from './PreviewVideoPlayer'
import {
  FEATURE_PREVIEW_SLIDES,
  PREVIEW_TABS,
  type FeaturePreviewSlide,
  type PreviewTabId,
} from '../data/feature-previews'

type FeaturePreviewSectionProps = {
  className?: string
  /** Prefer loading first media immediately (product page). */
  priority?: boolean
  /** Skip outer page-x when already inside a padded page shell. */
  flush?: boolean
  /** Hide slides that reuse a product-card image (avoids a repeating second shot). */
  excludeSrc?: string | string[]
  /**
   * side = media + details side-by-side (home).
   * stack = media → tabs → live-preview card (Destiny 2 Cheats page).
   */
  layout?: 'side' | 'stack'
}

const TAB_ICON: Record<PreviewTabId, typeof Eye> = {
  match: Eye,
  combat: Crosshair,
  push: Box,
  video: Play,
}

export function FeaturePreviewSection({
  className = '',
  priority = false,
  flush = false,
  excludeSrc,
  layout = 'side',
}: FeaturePreviewSectionProps) {
  const [index, setIndex] = useState(0)
  const stacked = layout === 'stack'

  const slides = useMemo(() => {
    const blocked = new Set(
      (Array.isArray(excludeSrc) ? excludeSrc : excludeSrc ? [excludeSrc] : []).filter(Boolean),
    )
    return FEATURE_PREVIEW_SLIDES.filter((s) => !blocked.has(s.src))
  }, [excludeSrc])

  const safeIndex = slides.length ? index % slides.length : 0
  const slide = slides[safeIndex] ?? FEATURE_PREVIEW_SLIDES[0]
  const isVideo = slide.kind === 'video'

  const tabSlides = useMemo(() => {
    const map = new Map<PreviewTabId, number>()
    slides.forEach((s, i) => {
      map.set(s.tab, i)
    })
    return map
  }, [slides])

  useEffect(() => {
    setIndex(0)
  }, [slides])

  function go(delta: number) {
    if (!slides.length) return
    setIndex((i) => (i + delta + slides.length) % slides.length)
  }

  function selectTab(tab: PreviewTabId) {
    const next = tabSlides.get(tab)
    if (next != null) setIndex(next)
  }

  const tabList = (
    <div
      className={`flex flex-wrap gap-2 ${stacked ? 'justify-center' : ''}`}
      role="tablist"
      aria-label="Preview categories"
    >
      {PREVIEW_TABS.map((tab) => {
        const available = tabSlides.has(tab.id)
        if (!available) return null
        const active = slide.tab === tab.id
        const Icon = TAB_ICON[tab.id]
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => selectTab(tab.id)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-z-accent text-white'
                : 'border border-white/10 bg-white/[0.04] text-white/65 hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            {tab.label}
          </button>
        )
      })}
    </div>
  )

  const detailsCard = (
    <div
      className={`flex flex-col rounded-2xl border border-white/10 bg-z-card/90 ${
        stacked ? 'p-4 sm:p-5' : 'p-5 sm:p-6'
      }`}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
        Live preview
      </p>
      <h3
        className={`mt-2.5 font-semibold tracking-tight text-white ${
          stacked ? 'text-lg sm:text-xl' : 'mt-3 text-xl sm:text-2xl'
        }`}
      >
        {slide.title}
      </h3>
      <p className="mt-1.5 text-sm text-white/45">{slide.subtitle}</p>

      <ul className={`space-y-2 ${stacked ? 'mt-4' : 'mt-6 space-y-2.5'}`}>
        {slide.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-white/80">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-z-accent" aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      {!stacked ? <div className="mt-auto pt-8">{tabList}</div> : null}
    </div>
  )

  const mediaBlock = (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="relative aspect-video">
        <SlideMedia slide={slide} priority={priority && index === 0} />

        <button
          type="button"
          aria-label="Previous preview"
          onClick={() => go(-1)}
          className={`absolute left-2.5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/75 sm:left-3 ${
            stacked ? 'h-9 w-9' : 'h-10 w-10'
          }`}
        >
          <ChevronLeft className={stacked ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Next preview"
          onClick={() => go(1)}
          className={`absolute right-2.5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-colors hover:bg-black/75 sm:right-3 ${
            stacked ? 'h-9 w-9' : 'h-10 w-10'
          }`}
        >
          <ChevronRight className={stacked ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={1.75} />
        </button>

        {!isVideo ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-2.5 sm:p-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px]">
              <Target className="h-3.5 w-3.5 text-z-soft" strokeWidth={1.75} />
              Gameplay preview
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[11px]">
              <SlideTabIcon tab={slide.tab} />
              {slide.badge}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )

  return (
    <section
      className={`${flush ? 'py-2' : stacked ? 'page-x py-10 sm:py-12' : 'page-x py-14 sm:py-16'} ${className}`.trim()}
      aria-labelledby="feature-preview-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className={`flex flex-col gap-5 ${stacked ? '' : 'gap-6 lg:flex-row lg:items-end lg:justify-between'}`}
        >
          <div className={stacked ? 'max-w-xl' : 'max-w-2xl'}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              Feature preview
            </p>
            <h2
              id="feature-preview-heading"
              className={`font-semibold tracking-tight ${
                stacked
                  ? 'mt-2.5 text-2xl sm:text-3xl'
                  : 'mt-3 text-3xl sm:text-4xl lg:text-[2.5rem]'
              }`}
            >
              <span className="text-z-accent">Destiny 2 Hack</span>{' '}
              <span className="text-white">previews</span>
            </h2>
            <p
              className={`mt-2.5 text-sm leading-relaxed text-white/55 ${stacked ? '' : 'mt-3 sm:text-base'}`}
            >
              Preview artwork for aimbot, ESP, guardian information and radar. These are layout
              previews, not a promise about match outcome.
            </p>
          </div>
          {!stacked ? (
            <CheckoutLink className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-z-accent/50 bg-z-accent/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-z-accent/30 lg:self-auto">
              Get access
              <span aria-hidden>→</span>
            </CheckoutLink>
          ) : (
            <CheckoutLink className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-full border border-z-accent/50 bg-z-accent/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-z-accent/30">
              Get access
              <span aria-hidden>→</span>
            </CheckoutLink>
          )}
        </div>

        {stacked ? (
          /* Compact centered stack — matches product-page screenshot proportions */
          <div className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-3.5">
            {mediaBlock}
            <div className="w-full">{tabList}</div>
            {detailsCard}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(16rem,0.85fr)] lg:items-stretch">
            {mediaBlock}
            <aside className="flex h-full flex-col">{detailsCard}</aside>
          </div>
        )}
      </div>
    </section>
  )
}

function SlideTabIcon({ tab }: { tab: PreviewTabId }) {
  const Icon = TAB_ICON[tab]
  return <Icon className="h-3.5 w-3.5 text-z-soft" strokeWidth={1.75} />
}

function SlideMedia({
  slide,
  priority,
}: {
  slide: FeaturePreviewSlide
  priority: boolean
}) {
  if (slide.kind === 'video') {
    return (
      <PreviewVideoPlayer
        key={slide.src}
        src={slide.src}
        poster={slide.poster}
        alt={slide.alt}
        lazyLoad
      />
    )
  }

  return (
    <img
      src={slide.src}
      alt={slide.alt}
      title={slide.title}
      width={1280}
      height={720}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover"
    />
  )
}
