import { blogPath } from './blog-paths'
import { PRODUCT_PATH } from './site'

/** Official Destiny 2 destinations for factual game context. */
export const OFFICIAL_DESTINY_LINKS = [
  {
    label: 'Destiny 2',
    href: 'https://www.bungie.net/7/en/Destiny',
    description: 'Official Destiny 2 site',
  },
  {
    label: 'Destiny 2 on Steam',
    href: 'https://store.steampowered.com/app/1085660/Destiny_2/',
    description: 'Official PC store page and client download',
  },
  {
    label: 'Bungie Help',
    href: 'https://help.bungie.net/',
    description: 'Bungie account and client help',
  },
] as const

/** Primary internal routes for crawl equity. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Live status, price and checkout' },
  {
    label: 'Destiny2 Cheats',
    to: PRODUCT_PATH,
    description: 'Destiny 2 Hack — Aimbot, ESP, wallhack, radar and checkout',
  },
  {
    label: 'Blogs',
    to: '/blogs',
    description: 'Destiny 2 Hack guides — price, Aimbot, ESP, setup',
  },
  {
    label: 'Forum archive',
    to: '/forums',
    description: 'Archived Destiny 2 Hack community threads',
  },
  {
    label: 'Player reviews',
    to: '/reviews',
    description: 'Player reviews and ratings',
  },
  {
    label: 'FAQ answers',
    to: '/faq',
    description: 'Frequently asked questions',
  },
  {
    label: 'Support desk',
    to: '/support',
    description: 'Delivery, menu and setup help',
  },
  {
    label: 'Privacy policy',
    to: '/privacy',
    description: 'Order data and site privacy',
  },
  {
    label: 'Terms of use',
    to: '/terms',
    description: 'License rules and risk disclaimer',
  },
  {
    label: 'Refund policy',
    to: '/refunds',
    description: 'When digital license refunds apply',
  },
] as const

export const SITE_GUIDE_LINKS = [
  { label: 'Features checklist', to: blogPath('features-list') },
  { label: 'Aimbot settings', to: blogPath('aimbot-settings') },
  { label: 'ESP & wallhack', to: blogPath('esp-wallhack-guide') },
  { label: 'Radar', to: blogPath('radar-hack-guide') },
  { label: 'Hotkeys', to: blogPath('hotkeys') },
  { label: 'Complete setup', to: blogPath('complete-setup') },
  { label: 'Windows setup', to: blogPath('windows-setup') },
  { label: 'Antivirus exclusions', to: blogPath('disable-antivirus') },
  { label: 'Stream-proof setup', to: blogPath('stream-proof-setup') },
  { label: 'anti-cheat status', to: blogPath('anti-cheat-status') },
  { label: 'Match settings', to: blogPath('match-play-guide') },
  { label: 'Menu errors', to: blogPath('loader-errors') },
  { label: 'Status checklist', to: blogPath('undetected-status') },
] as const

const CHECKOUT_HOST = ['za', 'deyo', '.com'].join('')
const CHECKOUT_REF = ['U', 'R', 'O', 'O', 'J'].join('')
const CHECKOUT_PRODUCT = '/products/destiny-2'

export const CHECKOUT_URL = `https://${CHECKOUT_HOST}/go/${CHECKOUT_REF}?to=${encodeURIComponent(CHECKOUT_PRODUCT)}`

export function getCheckoutUrl(_productSlug?: string): string {
  return CHECKOUT_URL
}

export const CHECKOUT_REL = 'nofollow noopener noreferrer'