import { useEffect, useRef, useState } from 'react'

type LazyInViewVideoProps = {
  src: string
  poster: string
  ariaLabel: string
  className?: string
  /** Muted loop autoplay when visible (default true). */
  autoPlayWhenVisible?: boolean
}

/**
 * Below-the-fold video: poster + preload none until near viewport (mobile LCP / bandwidth).
 * Same markup/classes as a normal autoplay loop once active.
 */
export function LazyInViewVideo({
  src,
  poster,
  ariaLabel,
  className = '',
  autoPlayWhenVisible = true,
}: LazyInViewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting)
        if (visible) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px 0px', threshold: 0.12 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !active) return
    if (!el.src) {
      el.src = src
      el.load()
    }
    if (autoPlayWhenVisible) {
      const play = () => {
        void el.play().catch(() => {})
      }
      if (el.readyState >= 2) play()
      else el.addEventListener('loadeddata', play, { once: true })
    }
  }, [active, src, autoPlayWhenVisible])

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={ariaLabel}
      width={1280}
      height={720}
    />
  )
}
