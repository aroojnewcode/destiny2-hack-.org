import { useEffect, useRef, useState } from 'react'
import { DESTINY_HOME_VIDEO } from '../data/media'

type FeaturePreviewVideoProps = {
  className?: string
  /** Product page uses wider crop + brand mask wrapper */
  variant?: 'inline' | 'product'
  wide?: boolean
  /** Native controls: play/pause and seek (product page). */
  interactive?: boolean
  /** Load immediately (above-the-fold product hero). */
  priority?: boolean
}

/**
 * Below-the-fold feature preview — defers download until near viewport (mobile-friendly).
 * UI matches prior inline/product video blocks.
 */
export function FeaturePreviewVideo({
  className = '',
  variant = 'inline',
  wide = false,
  interactive = false,
  priority = false,
}: FeaturePreviewVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(priority)

  useEffect(() => {
    if (priority) return
    const root = rootRef.current
    if (!root) return

    if (typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    )
    observer.observe(root)
    return () => observer.disconnect()
  }, [priority])

  useEffect(() => {
    const video = videoRef.current
    if (!active || !video) return
    video.load()
    if (interactive) return
    const play = video.play()
    if (play) play.catch(() => {})
  }, [active, interactive])

  const productVideoClass = interactive
    ? 'feature-preview-video__player feature-preview-video__player--interactive absolute inset-0 z-[1] h-full w-full object-cover'
    : 'video-brand-crop absolute inset-0 z-[1] h-full w-full object-cover'

  const inlineVideoClass = interactive
    ? 'feature-preview-video__player feature-preview-video__player--interactive h-full w-full object-cover'
    : 'feature-preview-video__player h-full w-full object-cover [filter:saturate(0.94)_contrast(1.04)_brightness(0.94)_hue-rotate(8deg)]'

  const videoEl = (
    <video
      ref={videoRef}
      className={variant === 'product' ? productVideoClass : inlineVideoClass}
      autoPlay={!interactive}
      muted={!interactive}
      loop
      playsInline
      controls={interactive}
      controlsList={interactive ? 'nodownload noplaybackrate' : undefined}
      preload={priority ? 'auto' : interactive ? 'metadata' : 'none'}
      width={1280}
      height={720}
      poster={DESTINY_HOME_VIDEO.poster}
      aria-label={DESTINY_HOME_VIDEO.title}
    >
      {active ? <source src={DESTINY_HOME_VIDEO.src} type="video/mp4" /> : null}
    </video>
  )

  const decorativeOverlays = !interactive ? (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[rgba(124,58,237,0.22)] mix-blend-soft-light"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-z-bg/50 via-transparent to-z-bg/20" />
      <div className="video-brand-blur video-brand-blur--top" aria-hidden />
      <div className="video-brand-blur" aria-hidden />
    </>
  ) : (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-10 bg-gradient-to-b from-z-bg/80 to-transparent sm:h-12"
      aria-hidden
    />
  )

  if (variant === 'product') {
    const maskClass = interactive
      ? 'feature-preview-video--interactive video-brand-mask border border-z-soft/20'
      : 'video-brand-mask border border-z-soft/20'
    const stageClass = interactive
      ? `feature-preview-video__stage feature-preview-video__stage--controls bg-black ${
          wide ? 'aspect-video lg:aspect-[21/9]' : 'aspect-video'
        }`
      : `relative w-full overflow-hidden ${wide ? 'aspect-video lg:aspect-[21/9]' : 'aspect-video'}`

    return (
      <div ref={rootRef} className={`${maskClass} ${className}`.trim()}>
        <div className={stageClass}>
          {videoEl}
          {decorativeOverlays}
        </div>
        <p className="sr-only">{DESTINY_HOME_VIDEO.title}</p>
      </div>
    )
  }

  const rootClass = [
    className,
    interactive ? 'feature-preview-video--interactive' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const inlineStageClass = interactive
    ? 'feature-preview-video__stage feature-preview-video__stage--controls relative aspect-video bg-black'
    : 'relative aspect-video'

  return (
    <div ref={rootRef} className={rootClass}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
        <div className={inlineStageClass}>
          {videoEl}
          {interactive ? (
            decorativeOverlays
          ) : (
            <div
              className="pointer-events-none absolute inset-0 bg-[rgba(124,58,237,0.18)] mix-blend-soft-light"
              aria-hidden
            />
          )}
        </div>
      </div>
    </div>
  )
}
