import { useEffect, useState } from 'react'
import { DESTINY_HERO_VIDEO } from '../data/media'

type VideoBgProps = {
  /** Poster and fallback still. Shown immediately, and to crawlers. */
  image?: string
  imageAlt?: string
  /** Short muted loop. Omit on pages that should stay a still image. */
  video?: string
}

/** Full-bleed hero. A still paints first; an optional short loop plays over it. */
export function VideoBg({
  image = DESTINY_HERO_VIDEO.poster,
  imageAlt = 'Destiny 2 guardian gameplay preview on the homepage background',
  video,
}: VideoBgProps) {
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    if (!video) return
    let cancelled = false
    const start = () => {
      if (!cancelled) setLoadVideo(true)
    }
    // Defer hero video bytes until after first paint / idle — poster stays LCP.
    const ric = window.requestIdleCallback?.(start, { timeout: 1800 })
    const t = ric == null ? window.setTimeout(start, 400) : undefined
    return () => {
      cancelled = true
      if (ric != null) window.cancelIdleCallback?.(ric)
      if (t != null) window.clearTimeout(t)
    }
  }, [video])

  return (
    <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 z-0 bg-z-bg" aria-hidden />
      <img
        src={image}
        alt={imageAlt}
        width={960}
        height={540}
        decoding="async"
        fetchPriority="high"
        className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
      />
      {video && loadVideo ? (
        <video
          className="hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={image}
          aria-label={imageAlt}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent" />
    </div>
  )
}
