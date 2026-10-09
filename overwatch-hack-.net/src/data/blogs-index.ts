/**
 * Lightweight blog cards for the homepage — avoids pulling full article bodies
 * into the home JS chunk. Must stay in sync with BLOGS.slice(0, 6).
 */
export type BlogCard = {
  slug: string
  title: string
  excerpt: string
  tag: string
}

export const HOME_BLOG_CARDS: BlogCard[] = [
  {
    slug: 'cheat-price',
    title: 'Destiny 2 Cheat Price: Plans from $35',
    excerpt:
      'A plain breakdown of Destiny 2 Hack pricing on destiny2hack.org — what $35 covers, how renewals work, and what to check before you pay.',
    tag: 'Buyer Guides',
  },
  {
    slug: 'features-list',
    title: 'Destiny 2 ESP and Aimbot Features Explained',
    excerpt:
      'What Destiny 2 Hack includes on destiny2hack.org — silent aim, player ESP, Super and ability ESP, wallhack, radar and extras — before you open checkout from $35.',
    tag: 'Features',
  },
  {
    slug: 'aimbot-settings',
    title: 'Destiny 2 Aimbot Settings for Silent Aim',
    excerpt:
      'Tune Destiny 2 Aimbot FOV, smoothing, hitbox and silent aim so player tracking stays effective without looking robotic to spectating admins.',
    tag: 'Aimbot',
  },
  {
    slug: 'esp-wallhack-guide',
    title: 'Destiny 2 ESP and Wallhack Setup',
    excerpt:
      'Configure Destiny 2 ESP and wallhack for player boxes, utility tracking and utility highlighting without flooding your HUD.',
    tag: 'ESP',
  },
  {
    slug: 'radar-hack-guide',
    title: 'Destiny 2 Radar Hack Overlay Guide',
    excerpt:
      'Use the Destiny 2 radar hack 2D overlay to track off-screen players, avoid flanks and approach the objective safer.',
    tag: 'Radar',
  },
  {
    slug: 'hotkeys',
    title: 'Destiny 2 Hack Hotkeys After Load',
    excerpt:
      'Menu and toggle hotkeys for Destiny 2 hack after a clean load — Aimbot, ESP, Super and ability ESP, radar and panic binds.',
    tag: 'Hotkeys',
  },
]
