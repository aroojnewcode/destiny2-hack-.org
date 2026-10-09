import {
  DESTINY_HERO,
  DESTINY_PRODUCT_COVER,
  DESTINY_MENU,
  DESTINY_SHOT_WALLHACK,
  DESTINY_SHOT_ESP_STREET,
  DESTINY_SHOT_ESP_AIMBOT,
} from './media'
import { DESTINY_OG, getOgImageForPath, PAGE_OG } from './og'

export { DESTINY_OG, getOgImageForPath, PAGE_OG }
export { forumOgImage } from './og'

export const DESTINY_PRODUCT_HERO = DESTINY_PRODUCT_COVER

export type ImageSeoFields = {
  alt: string
  title: string
  caption: string
}

export const IMAGE_SEO: Record<
  string,
  ImageSeoFields & {
    heroAlt: string
    heroTitle: string
    heroCaption: string
  }
> = {
  'destiny-2': {
    alt: 'Destiny 2 cheat product screenshot with green ESP box and skeleton wallhack on an enemy guardian',
    title: 'Destiny 2 Hack ESP product screenshot',
    caption: 'Product artwork showing green bounding-box ESP and skeleton wallhack in the Crucible.',
    heroAlt:
      'Destiny 2 Hack buy card — spectator view with aimbot FOV circle, green ESP box and skeleton overlay on a guardian on stairs',
    heroTitle: 'Buy Destiny 2 Hack — ESP box and skeleton screenshot',
    heroCaption: 'Checkout card art with aimbot FOV, green ESP box and skeleton wallhack.',
  },
}

type PageImage = ImageSeoFields & { src: string; og: string }

/** On-page media + dedicated OG JPEG for Google SERP thumbnails. */
export const PAGE_IMAGES: Record<
  'home' | 'forums' | 'reviews' | 'faq' | 'support' | 'product',
  PageImage
> = {
  home: {
    src: DESTINY_SHOT_WALLHACK,
    og: PAGE_OG.home,
    alt: 'Destiny 2 cheat gameplay with aimbot FOV circle, green ESP box and skeleton wallhack on an enemy guardian',
    title: 'Destiny 2 wallhack and aimbot FOV',
    caption: 'Aimbot FOV with green ESP box and skeleton wallhack in the Crucible.',
  },
  forums: {
    src: DESTINY_SHOT_ESP_STREET,
    og: PAGE_OG.forums,
    alt: 'Destiny 2 ESP screenshot aiming down sights with green bounding box and skeleton overlay on an enemy guardian',
    title: 'Destiny 2 ESP bounding box',
    caption: 'Green bounding-box ESP and skeleton while aiming in the Crucible.',
  },
  reviews: {
    src: DESTINY_SHOT_ESP_AIMBOT,
    og: PAGE_OG.reviews,
    alt: 'Destiny 2 aimbot gameplay with green ESP box, skeleton overlay and floating damage numbers on an enemy guardian',
    title: 'Destiny 2 aimbot and ESP',
    caption: 'Aim assist with ESP box, skeleton and live damage readouts.',
  },
  faq: {
    src: DESTINY_MENU,
    og: PAGE_OG.faq,
    alt: 'Destiny 2 ESP screenshot aiming down sights with green bounding box and skeleton overlay on an enemy guardian',
    title: 'Destiny 2 ESP bounding box',
    caption: 'Green bounding-box ESP and skeleton while aiming in the Crucible.',
  },
  support: {
    src: DESTINY_HERO,
    og: PAGE_OG.support,
    alt: 'Destiny 2 cheat gameplay with aimbot FOV circle, green ESP box and skeleton wallhack on an enemy guardian',
    title: 'Destiny 2 wallhack and aimbot FOV',
    caption: 'Aimbot FOV with green ESP box and skeleton wallhack in the Crucible.',
  },
  product: {
    src: DESTINY_PRODUCT_COVER,
    og: PAGE_OG.product,
    alt:
      'Destiny 2 Hack buy card — spectator view with aimbot FOV circle, green ESP box and skeleton overlay on a guardian on stairs',
    title: 'Destiny 2 Hack buy card — ESP and skeleton',
    caption: 'Checkout card art with aimbot FOV, green ESP box and skeleton wallhack.',
  },
}

export function getGameImage(_slug: string): string {
  return DESTINY_PRODUCT_COVER
}

export function getProductHeroImage(_slug: string): string {
  return DESTINY_PRODUCT_COVER
}

export function getOgImage(path?: string): string {
  return getOgImageForPath(path)
}

export function getPageImage(key: keyof typeof PAGE_IMAGES) {
  return PAGE_IMAGES[key]
}

export function getImageAlt(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroAlt : seo.alt
  return variant === 'product' ? `${name} product details` : `${name} product artwork`
}

export function getImageTitle(
  slug: string,
  name: string,
  variant: 'catalog' | 'product' = 'catalog',
): string {
  const seo = IMAGE_SEO[slug]
  if (seo) return variant === 'product' ? seo.heroTitle : seo.title
  return `${name} product`
}
