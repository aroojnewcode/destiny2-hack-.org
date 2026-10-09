import { PRODUCT_PATH } from './site'

export type ForumCategory = 'Setup' | 'Features' | 'Status' | 'Support'

export type ForumThread = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  category: ForumCategory
  date: string
  replies: number
  views: number
  lastReplyDate: string
  lastReplyAuthor: string
  closed: boolean
  closedNote: string
  body: string[]
}

export const FORUM_CATEGORIES: Array<'All' | ForumCategory> = [
  'All',
  'Setup',
  'Features',
  'Status',
  'Support',
]

/** Community Q&A archive — separate from /blogs editorial guides. */
export const FORUM_THREADS: ForumThread[] = [
  {
    slug: 'save-settings-configs',
    title: 'Can you save Destiny 2 Hack settings/configs?',
    excerpt:
      'Yes — export your Aimbot FOV, ESP colors and hotkeys from the menu, then re-import after a rebuild so you do not re-tune every update.',
    metaTitle: 'Save Destiny 2 Hack Settings/Configs | Forum',
    metaDescription:
      'Archived forum thread: how to save and re-import Destiny 2 Hack Aimbot, ESP and hotkey configs on destiny2hack.org.',
    category: 'Features',
    date: '2026-09-12',
    replies: 8,
    views: 1643,
    lastReplyDate: '2026-10-03',
    lastReplyAuthor: 'kai',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'Yes. Open the Destiny 2 Hack menu, use the config export option, and keep the file off your Destiny 2 install folder.',
      'After a rebuild or clean reinstall, import the same file so silent-aim FOV, ESP boxes and hotkeys come back without starting from defaults.',
      'If export is greyed out, confirm the build is clear-to-load on the product page and that Windows Defender did not quarantine the config folder.',
    ],
  },
  {
    slug: 'wait-after-game-patch',
    title: 'Destiny 2 update after a game patch: do I wait?',
    excerpt:
      'Yes — wait for clear-to-load on destiny2hack.org. Loading while BattlEye shows Updating is the fastest way to waste a session.',
    metaTitle: 'Wait After Destiny 2 Patch? | Forum Archive',
    metaDescription:
      'Archived thread: when to wait after a Destiny 2 / BattlEye patch before loading Destiny 2 Hack on destiny2hack.org.',
    category: 'Status',
    date: '2026-09-20',
    replies: 7,
    views: 2947,
    lastReplyDate: '2026-09-30',
    lastReplyAuthor: 'ghostyy',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'When Bungie or BattlEye ships a client patch, our status page may flip to Updating while we rebuild.',
      'Do not force-load. Wait until Destiny 2 Hack shows clear-to-load on the product page, then run one clean load with overlays closed.',
      'If status stays Updating longer than usual, check Support with your order ID — do not download random “fixed” loaders elsewhere.',
    ],
  },
  {
    slug: 'esp-not-showing-through-walls',
    title: 'ESP not showing through walls in Crucible?',
    excerpt:
      'Usually a render distance, team filter or stream-proof mode issue — not a missing license. Check ESP toggles before reinstalling.',
    metaTitle: 'Destiny 2 ESP Not Showing Through Walls | Forum',
    metaDescription:
      'Archived forum help: Destiny 2 player ESP / wallhack not visible in Crucible — filters, distance and stream-proof checks.',
    category: 'Features',
    date: '2026-08-28',
    replies: 11,
    views: 2214,
    lastReplyDate: '2026-09-18',
    lastReplyAuthor: 'nox',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'Confirm Player ESP and wallhack are enabled, team filter is set to enemies, and max distance is not set too low for the map.',
      'Stream-proof mode can hide overlays from some capture paths — turn it off once to verify ESP draws in-game.',
      'If boxes still never appear after a clear-to-load build, re-run antivirus exclusions and reload once with Destiny 2 already in orbit.',
    ],
  },
  {
    slug: 'defender-quarantined-loader',
    title: 'Windows Defender quarantined the Destiny 2 loader',
    excerpt:
      'Add the delivery folder to exclusions, restore the file, then load again. Do not run the menu from Downloads long-term.',
    metaTitle: 'Defender Quarantined Destiny 2 Loader | Forum',
    metaDescription:
      'Archived thread: fix Windows Defender quarantining the Destiny 2 Hack loader — exclusions, restore and clean load order.',
    category: 'Setup',
    date: '2026-08-14',
    replies: 14,
    views: 3812,
    lastReplyDate: '2026-09-22',
    lastReplyAuthor: 'mira',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'This is the most common setup failure. Move the official delivery folder out of Downloads, add it to Defender exclusions, then restore anything quarantined.',
      'Reboot once, launch Destiny 2 from the official client, then open the loader as admin when status is clear.',
      'Third-party AV (Norton, Avast, etc.) needs the same exclusion — see Support if restore keeps failing.',
    ],
  },
  {
    slug: 'aimbot-too-obvious-trials',
    title: 'Aimbot feels too obvious in Trials — what settings?',
    excerpt:
      'Tighten FOV, add smoothing, use chest/nearest bone first. Blatant snaps get spectate reports faster than ESP.',
    metaTitle: 'Destiny 2 Aimbot Settings for Trials | Forum',
    metaDescription:
      'Archived forum advice: quieter Destiny 2 silent-aim settings for Trials — FOV, smoothing and hitbox choices.',
    category: 'Features',
    date: '2026-09-01',
    replies: 9,
    views: 1988,
    lastReplyDate: '2026-09-25',
    lastReplyAuthor: 'veil',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'Start conservative: small FOV, high smoothing, visible-check on, chest or nearest bone before head-only.',
      'Save a “Trials” config separate from your casual Crucible preset so you do not mix aggressive settings.',
      'Full dial-in steps live on the Aimbot settings blog — this thread only covers the common over-tune mistakes.',
    ],
  },
  {
    slug: 'stream-proof-obs-capture',
    title: 'Will stream-proof hide ESP from OBS?',
    excerpt:
      'Supported overlays stay out of common capture tools when stream-proof is on — verify with a local recording before going live.',
    metaTitle: 'Destiny 2 Stream-Proof vs OBS | Forum Archive',
    metaDescription:
      'Archived thread: using Destiny 2 Hack stream-proof with OBS — what is hidden and how to verify before streaming.',
    category: 'Setup',
    date: '2026-07-30',
    replies: 6,
    views: 1420,
    lastReplyDate: '2026-08-19',
    lastReplyAuthor: 'orbit',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'Enable stream-proof in the menu, then record a short local clip in OBS. You should see clean gameplay without ESP boxes if the build supports it.',
      'Some GPU capture modes differ — if ESP still appears, switch capture method once before blaming the toggle.',
      'Never show the cheat menu on stream even with stream-proof enabled.',
    ],
  },
  {
    slug: 'license-expired-renew',
    title: 'License expired — how do I renew on destiny2hack.org?',
    excerpt:
      'Renew from the same product checkout with the email used on the original order. Keep the order ID for Support.',
    metaTitle: 'Renew Destiny 2 Hack License | Forum',
    metaDescription:
      'Archived forum thread: renewing an expired Destiny 2 Hack license on destiny2hack.org and what to send Support.',
    category: 'Support',
    date: '2026-08-05',
    replies: 5,
    views: 1104,
    lastReplyDate: '2026-09-10',
    lastReplyAuthor: 'sable',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'Open the Destiny 2 Hack product page, complete checkout again with the same email, and wait for the new delivery message.',
      'If payment succeeded but nothing arrived, contact Support with the order ID — do not buy a second time until they check.',
      'Refund timing follows the refund policy for digital licenses.',
    ],
  },
  {
    slug: 'clear-to-load-vs-updating',
    title: 'What does clear-to-load vs Updating mean?',
    excerpt:
      'Clear-to-load means the current build is ready. Updating means wait — a BattlEye or client change is being rebuilt.',
    metaTitle: 'Clear-to-Load vs Updating | Destiny 2 Forum',
    metaDescription:
      'Archived thread explaining Destiny 2 Hack anti-cheat status: clear-to-load versus Updating on destiny2hack.org.',
    category: 'Status',
    date: '2026-09-08',
    replies: 10,
    views: 2560,
    lastReplyDate: '2026-09-28',
    lastReplyAuthor: 'rift',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'Clear-to-load: safe to follow setup and open the loader for Destiny 2 on Windows.',
      'Updating: do not load. Watch the product / status page until it flips back.',
      'Status can change after Destiny 2 patches — always check before a session, not only on purchase day.',
    ],
  },
  {
    slug: 'fresh-install-order',
    title: 'Fresh install: what order do I load Destiny 2 Hack?',
    excerpt:
      'Exclusions first, Destiny 2 running from the official client, then loader — never the other way around on a new PC.',
    metaTitle: 'Fresh Install Load Order | Destiny 2 Forum',
    metaDescription:
      'Archived setup thread: correct fresh-install load order for Destiny 2 Hack on Windows 10/11.',
    category: 'Setup',
    date: '2026-07-18',
    replies: 12,
    views: 3201,
    lastReplyDate: '2026-09-15',
    lastReplyAuthor: 'pixel',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      '1) Add Defender exclusions. 2) Close Discord/NVIDIA overlays. 3) Launch Destiny 2. 4) Confirm clear-to-load. 5) Run the official loader.',
      'Skipping exclusions is why most “loader missing” tickets happen on day one.',
      'Full checklist is on the complete-setup blog; this thread is the short community version.',
    ],
  },
  {
    slug: 'spoofer-required-or-not',
    title: 'Do I need the spoofer every session?',
    excerpt:
      'Only when the current build includes it and Support/status says hardware protection is required — not every casual load.',
    metaTitle: 'Destiny 2 Spoofer Required? | Forum Archive',
    metaDescription:
      'Archived forum answer: when Destiny 2 Hack spoofer is required versus optional on destiny2hack.org.',
    category: 'Support',
    date: '2026-08-22',
    replies: 4,
    views: 987,
    lastReplyDate: '2026-09-05',
    lastReplyAuthor: 'ash',
    closed: true,
    closedNote: 'Closed by archive',
    body: [
      'Follow the product page notes for the current build. If spoofer is listed and status asks for it, run it before the main load.',
      'If the build does not ship a spoofer, do not download third-party tools claiming to “help”.',
      'Hardware bans and account risk still exist — status clear does not remove ToS risk.',
    ],
  },
]

export function forumPath(slug: string) {
  return `/forums/${slug}`
}

export function getForumThread(slug: string) {
  return FORUM_THREADS.find((t) => t.slug === slug)
}

export function formatForumDate(iso: string) {
  const d = new Date(`${iso}T12:00:00Z`)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatForumNumber(n: number) {
  return n.toLocaleString('en-US')
}

export const FORUM_QUICK_LINKS = [
  { label: 'Destiny2 Cheats', href: PRODUCT_PATH },
  { label: 'Features', href: '/blogs/features-list' },
  { label: 'Status', href: '/blogs/anti-cheat-status' },
  { label: 'Setup', href: '/blogs/complete-setup' },
  { label: 'Support', href: '/support' },
] as const
