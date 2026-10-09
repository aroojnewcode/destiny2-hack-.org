import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw, RotateCw } from 'lucide-react'

type PreviewVideoPlayerProps = {
  src: string
  poster?: string
  alt: string
  /** Load bytes only after the user presses play (keeps LCP light). */
  lazyLoad?: boolean
  className?: string
}

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * Light feature-preview player: poster-first, play/pause, ±5s, scrub timeline.
 * MP4 should stay ~12s / ~2MB so homepage Lighthouse is not dragged down.
 */
export function PreviewVideoPlayer({
  src,
  poster,
  alt,
  lazyLoad = true,
  className = '',
}: PreviewVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(!lazyLoad)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [seeking, setSeeking] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !ready) return

    const onTime = () => {
      if (!seeking) setCurrent(video.currentTime)
    }
    const onMeta = () => setDuration(video.duration || 0)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)

    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('durationchange', onMeta)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)

    if (video.src && !video.paused) setPlaying(true)

    return () => {
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('durationchange', onMeta)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
    }
  }, [ready, seeking, src])

  async function ensureLoaded() {
    const video = videoRef.current
    if (!video) return null
    if (!ready) {
      setReady(true)
      // Allow React to attach <source> before load/play
      await new Promise<void>((r) => requestAnimationFrame(() => r()))
      video.load()
    }
    return video
  }

  async function togglePlay() {
    const video = await ensureLoaded()
    if (!video) return
    if (video.paused) {
      const p = video.play()
      if (p) p.catch(() => {})
    } else {
      video.pause()
    }
  }

  async function skip(delta: number) {
    const video = await ensureLoaded()
    if (!video) return
    const next = Math.min(Math.max(0, (video.currentTime || 0) + delta), video.duration || 0)
    video.currentTime = next
    setCurrent(next)
  }

  function onSeekInput(value: number) {
    setCurrent(value)
    const video = videoRef.current
    if (video && ready) video.currentTime = value
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div className={`absolute inset-0 ${className}`.trim()}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload={ready ? 'metadata' : 'none'}
        poster={poster}
        width={854}
        height={480}
        aria-label={alt}
        onClick={togglePlay}
      >
        {ready ? <source src={src} type="video/mp4" /> : null}
      </video>

      {!playing && !ready ? (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 z-[2] flex items-center justify-center bg-black/25"
          aria-label="Play feature preview"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md">
            <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" strokeWidth={0} />
          </span>
        </button>
      ) : null}

      <div
        className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-black/85 via-black/40 to-transparent px-3 pb-3 pt-10 sm:px-4 sm:pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label="Back 5 seconds"
            onClick={() => skip(-5)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white hover:bg-black/70"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={togglePlay}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-z-accent/90 text-white hover:bg-z-accent"
          >
            {playing ? (
              <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            ) : (
              <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" strokeWidth={0} />
            )}
          </button>

          <button
            type="button"
            aria-label="Forward 5 seconds"
            onClick={() => skip(5)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white hover:bg-black/70"
          >
            <RotateCw className="h-4 w-4" strokeWidth={1.75} />
          </button>

          <div className="relative min-w-0 flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 my-auto h-1 rounded-full bg-white/20" />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 my-auto h-1 rounded-full bg-z-accent"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Number.isFinite(current) ? current : 0}
              aria-label="Video timeline"
              aria-valuemin={0}
              aria-valuemax={Math.round(duration || 0)}
              aria-valuenow={Math.round(current || 0)}
              onPointerDown={() => setSeeking(true)}
              onPointerUp={() => setSeeking(false)}
              onChange={(e) => onSeekInput(Number(e.target.value))}
              className="preview-timeline relative z-[1] h-4 w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>

          <p className="shrink-0 tabular-nums text-[11px] font-medium text-white/80 sm:text-xs">
            {formatTime(current)} / {formatTime(duration)}
          </p>
        </div>
      </div>
    </div>
  )
}
