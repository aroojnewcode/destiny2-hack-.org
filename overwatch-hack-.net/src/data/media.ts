export type SeoMediaItem = {
  image: string
  video?: string
  alt: string
  title: string
  caption: string
  videoTitle?: string
  videoDescription?: string
}

/** One gameplay screenshot per slot. Each keeps its own alt text. WebP for faster loads. */
export const DESTINY_SHOT_WALLHACK = '/media/destiny-wallhack-players.webp'
export const DESTINY_SHOT_ESP_STREET = '/media/destiny-esp-street.webp'
export const DESTINY_SHOT_RADAR = '/media/destiny-radar-esp.webp'
export const DESTINY_SHOT_ESP_AIMBOT = '/media/destiny-esp-aimbot.webp'
export const DESTINY_PRODUCT_COVER = '/media/destiny-product-cover.webp'
export const DESTINY_HERO_POSTER = '/media/destiny-hero-poster.webp'
export const DESTINY_PRODUCT_POSTER = '/media/destiny-product-poster.webp'

export const DESTINY_HERO = DESTINY_SHOT_WALLHACK
export const DESTINY_SOLDIER = DESTINY_SHOT_WALLHACK
export const DESTINY_COVER = DESTINY_PRODUCT_COVER
export const DESTINY_BOX = DESTINY_SHOT_ESP_AIMBOT
export const DESTINY_ESP = DESTINY_SHOT_ESP_AIMBOT
export const DESTINY_MENU = DESTINY_SHOT_ESP_STREET
export const DESTINY_GAMEPLAY = DESTINY_SHOT_ESP_STREET
export const DESTINY_HOME_ART = DESTINY_SHOT_WALLHACK
export const DESTINY_CONTROL = DESTINY_SHOT_ESP_STREET
export const DESTINY_TACTICAL = DESTINY_SHOT_RADAR
export const DESTINY_VIDEO_THUMB = DESTINY_SHOT_ESP_AIMBOT

export const DESTINY_HOME_VIDEO = {
  id: 'destiny-product-loop',
  src: '/videos/destiny-product-loop.mp4',
  poster: DESTINY_PRODUCT_POSTER,
  title: 'Destiny 2 feature preview — ESP and aim assist gameplay loop',
  caption:
    'Destiny 2 feature preview — ESP, wallhack boxes and guardian tracking through cover (~12s purple-tinted loop, no cheat menu UI).',
} as const

export const DESTINY_HERO_VIDEO = {
  src: '/videos/destiny-hero-loop.mp4',
  poster: DESTINY_HERO_POSTER,
} as const

const SHOT_WALLHACK: SeoMediaItem = {
  image: DESTINY_SHOT_WALLHACK,
  alt: 'Destiny 2 cheat gameplay with aimbot FOV circle, green ESP box and skeleton wallhack on an enemy guardian in an industrial Crucible map',
  title: 'Destiny 2 wallhack and aimbot FOV',
  caption: 'Aimbot FOV ring with green bounding-box ESP and skeleton wallhack on a guardian through cover.',
}

const SHOT_ESP_STREET: SeoMediaItem = {
  image: DESTINY_SHOT_ESP_STREET,
  alt: 'Destiny 2 ESP screenshot aiming down sights with green bounding box and skeleton overlay on an enemy in a sunlit courtyard',
  title: 'Destiny 2 ESP bounding box',
  caption: 'Player ESP with green box and skeleton tracking while aiming in the Crucible.',
}

const SHOT_RADAR: SeoMediaItem = {
  image: DESTINY_SHOT_RADAR,
  alt: 'Destiny 2 cheat gameplay with aimbot FOV circle, green ESP box and skeleton wallhack on an enemy guardian in an industrial Crucible map',
  title: 'Destiny 2 ESP and aim assist',
  caption: 'ESP box and skeleton overlay with aimbot FOV during a Crucible fight.',
}

const SHOT_ESP_AIMBOT: SeoMediaItem = {
  image: DESTINY_SHOT_ESP_AIMBOT,
  alt: 'Destiny 2 aimbot gameplay with green ESP box, skeleton overlay and floating damage numbers while aiming at an enemy guardian outdoors',
  title: 'Destiny 2 aimbot and ESP',
  caption: 'Silent-aim style tracking with ESP box, skeleton and live damage readouts.',
}

export const PAGE_MEDIA = {
  home: SHOT_WALLHACK,
  product: {
    ...SHOT_RADAR,
    video: DESTINY_HOME_VIDEO.src,
    videoTitle: DESTINY_HOME_VIDEO.title,
    videoDescription: DESTINY_HOME_VIDEO.caption,
  },
  forums: SHOT_ESP_STREET,
  reviews: SHOT_ESP_AIMBOT,
  faq: SHOT_ESP_STREET,
  support: SHOT_ESP_STREET,
} as const satisfies Record<string, SeoMediaItem>

const FORUM_MEDIA: Record<string, SeoMediaItem> = {
  'cheat-price': SHOT_WALLHACK,
  'features-list': SHOT_WALLHACK,
  hotkeys: SHOT_ESP_STREET,
  'complete-setup': SHOT_ESP_STREET,
  'disable-antivirus': SHOT_ESP_STREET,
  'undetected-status': SHOT_RADAR,
  'aimbot-settings': SHOT_WALLHACK,
  'esp-wallhack-guide': SHOT_ESP_AIMBOT,
  'radar-hack-guide': SHOT_RADAR,
  'stream-proof-setup': SHOT_ESP_AIMBOT,
  'anti-cheat-status': SHOT_RADAR,
  'windows-setup': SHOT_ESP_STREET,
  'match-play-guide': SHOT_RADAR,
  'loader-errors': SHOT_ESP_STREET,
}

export function getForumMedia(slug: string): SeoMediaItem {
  return FORUM_MEDIA[slug] || PAGE_MEDIA.forums
}