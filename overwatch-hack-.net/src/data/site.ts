import { DESTINY_OG } from './images'
import { PAGE_OG } from './og'

export const SITE_URL = 'https://destiny2hack.org'
export const SITE_NAME = 'Destiny 2 Hack'
export const SITE_HOST = 'destiny2hack.org'
export const PRODUCT_PATH = '/destiny-2-hack'

/**
 * Sole purpose — used in schema + about copy.
 * Single-product site: Destiny 2 hack for PC (worldwide).
 * Canonical host is apex https://destiny2hack.org (www 301s to apex in the Worker).
 */
export const SITE_PURPOSE =
  'Buy a Destiny 2 hack for Windows PC — silent-aim Aimbot, player ESP, wallhack, radar and live anti-cheat status with instant digital delivery.'

/** Primary brand is Destiny 2 Hack; “cheats” is a search synonym, not a second brand. */
export const SITE_ABOUT = [
  'destiny 2 hack',
  'destiny 2 hacks',
  'destiny 2 cheats',
  'destiny 2 aimbot',
  'destiny 2 esp',
  'destiny 2 wallhack',
  'destiny 2 radar',
  'destiny2hack.org',
] as const

/** Meta keywords for search engines (destiny 2 hack, destiny 2 cheat). */
export const SITE_META_KEYWORDS = [
  ...new Set([
    ...SITE_ABOUT,
    'destiny 2 cheat',
    'destiny 2 cheat menu',
    'anti-cheat status destiny 2',
  ]),
].join(', ')

/** Offer price shown on product schema + purchase UI. */
export const PRODUCT_PRICE_USD = '35'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

export const OG_IMAGE = DESTINY_OG

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  /** Prefer /og/*.jpg (1200x630) for Google SERP thumbnails */
  image?: string
  imageAlt?: string
  robots?: string
}

const INDEX_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const SEO = {
  home: {
    title: 'Destiny 2 Hack — Aimbot, ESP & Wallhack for PC',
    description:
      'Buy Destiny 2 Hack for Windows — silent aim, player ESP, wallhack and radar from $35. Destiny 2 cheats with live BattlEye status before checkout.',
    path: '/',
    ogType: 'website',
    image: PAGE_OG.home,
    imageAlt: 'Destiny 2 Hack — Aimbot, ESP and radar for PC',
    robots: INDEX_ROBOTS,
  },
  blogs: {
    title: 'Destiny 2 Hack Guides | Aimbot, ESP, Price & Setup',
    description:
      'Destiny 2 Hack guides on destiny2hack.org — pricing, Aimbot and ESP, Windows setup, BattlEye status and troubleshooting before you buy.',
    path: '/blogs',
    ogType: 'website',
    image: PAGE_OG.blogs,
    imageAlt: 'Destiny 2 Hack blogs — Aimbot, ESP and setup guides',
    robots: INDEX_ROBOTS,
  },
  forums: {
    title: 'Destiny 2 Hack Forum | Archived Setup & Status Threads',
    description:
      'Archived Destiny 2 Hack forum on destiny2hack.org — read-only threads on Aimbot, ESP, BattlEye status, antivirus and loader setup. Replies are closed.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_OG.forums,
    imageAlt: 'Destiny 2 Hack archived forum — setup, features, status and support threads',
    robots: INDEX_ROBOTS,
  },
  reviews: {
    title: 'Destiny 2 Hack Reviews | Buyer Feedback',
    description:
      'Real Destiny 2 Hack buyer reviews: silent aim, player ESP, wallhack and anti-cheat rebuilds before you buy a PC license from $35 on destiny2hack.org.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_OG.reviews,
    imageAlt: 'Destiny 2 Hack buyer reviews',
    robots: INDEX_ROBOTS,
  },
  faq: {
    title: 'Destiny 2 Hack FAQ | Price, Anti-cheat Status & Setup',
    description:
      'FAQ for buying Destiny 2 Hack on Windows PC — price, Aimbot and ESP features, anti-cheat status, Control and Survival, setup and delivery.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_OG.faq,
    imageAlt: 'Destiny 2 Hack FAQ — price, anti-cheat status and setup',
    robots: INDEX_ROBOTS,
  },
  support: {
    title: 'Destiny 2 Hack Support | Loader, Delivery & Setup',
    description:
      'Get help with the Destiny 2 Hack loader — delivery email, Windows setup, antivirus exclusions, menu errors and anti-cheat status updates.',
    path: '/support',
    ogType: 'website',
    image: PAGE_OG.support,
    imageAlt: 'Destiny 2 Hack support for loader and delivery help',
    robots: INDEX_ROBOTS,
  },
  product: {
    title: 'Destiny 2 Hack — Aimbot, ESP & Radar | Price from $35',
    description:
      'Destiny 2 Hack for PC from $35 — silent aim Aimbot, player ESP, wallhack, radar and live BattlEye status before checkout on destiny2hack.org.',
    path: PRODUCT_PATH,
    ogType: 'product',
    image: PAGE_OG.product,
    imageAlt: 'Destiny 2 Hack — Aimbot, ESP and radar product details',
    robots: INDEX_ROBOTS,
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'Destiny 2 Hack — Aimbot, ESP & Wallhack for PC',
  h2Features: 'Aimbot, ESP, wallhack & radar',
  h2Featured: 'ESP and silent aim Aimbot',
  h2About: 'Check anti-cheat status before you buy Destiny 2 Hack',
  h2Access: 'Buy Destiny 2 Hack',
  h2Faq: 'Destiny 2 Hack FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
