import {
  DESTINY_HOME_VIDEO,
  DESTINY_SHOT_ESP_AIMBOT,
  DESTINY_SHOT_ESP_STREET,
  DESTINY_SHOT_WALLHACK,
} from './media'

/** One preview category per tab — Match / Combat / Push / Video in order. */
export type PreviewTabId = 'match' | 'combat' | 'push' | 'video'

export type FeaturePreviewSlide = {
  id: string
  tab: PreviewTabId
  kind: 'video' | 'image'
  src: string
  poster?: string
  alt: string
  title: string
  subtitle: string
  features: string[]
  badge: string
}

/**
 * Shared home + product feature preview.
 * One slide per tab, left-to-right: Match → Combat → Push → Video.
 * Match and Push use different screenshots so tabs never look identical.
 */
export const FEATURE_PREVIEW_SLIDES: FeaturePreviewSlide[] = [
  {
    id: 'match-wallhack',
    tab: 'match',
    kind: 'image',
    src: DESTINY_SHOT_WALLHACK,
    alt: 'Destiny 2 wallhack and aimbot FOV circle on an enemy guardian in Crucible',
    title: 'Wallhack and FOV in a match',
    subtitle: 'Wallhack · FOV',
    features: ['Wallhack', 'Aimbot FOV', 'Skeleton ESP'],
    badge: 'Match',
  },
  {
    id: 'combat-aimbot',
    tab: 'combat',
    kind: 'image',
    src: DESTINY_SHOT_ESP_AIMBOT,
    alt: 'Destiny 2 aimbot and ESP during a fight with green box and skeleton wallhack',
    title: 'Aimbot and ESP during a fight',
    subtitle: 'Aimbot · ESP',
    features: ['Aimbot', 'ESP Box', 'Triggerbot'],
    badge: 'Combat',
  },
  {
    id: 'push-esp-street',
    tab: 'push',
    kind: 'image',
    src: DESTINY_SHOT_ESP_STREET,
    alt: 'Destiny 2 ESP bounding box and skeleton while aiming in a sunlit courtyard',
    title: 'ESP through cover on a push',
    subtitle: 'ESP · Skeleton',
    features: ['ESP Box', 'Skeleton', 'Distance'],
    badge: 'Push',
  },
  {
    id: 'live-video',
    tab: 'video',
    kind: 'video',
    src: DESTINY_HOME_VIDEO.src,
    poster: DESTINY_HOME_VIDEO.poster,
    alt: DESTINY_HOME_VIDEO.title,
    title: 'Live Destiny 2 Hack preview',
    subtitle: 'Gameplay · 12s · scrub & pause',
    features: ['Aimbot', 'ESP', 'Wallhack'],
    badge: 'Video',
  },
]

export const PREVIEW_TABS: Array<{
  id: PreviewTabId
  label: string
}> = [
  { id: 'match', label: 'Match' },
  { id: 'combat', label: 'Combat' },
  { id: 'push', label: 'Push' },
  { id: 'video', label: 'Video' },
]
