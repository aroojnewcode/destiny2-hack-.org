import { PRODUCT_PATH } from './site'

export type ForumCategory = 'Setup' | 'Features' | 'Status' | 'Support'

export type ForumReply = {
  author: string
  date: string
  body: string
}

export type ForumThread = {
  slug: string
  title: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  category: ForumCategory
  date: string
  author: string
  replies: number
  views: number
  lastReplyDate: string
  lastReplyAuthor: string
  closed: boolean
  closedNote: string
  body: string[]
  comments: ForumReply[]
}

type ForumThreadInput = Omit<
  ForumThread,
  'replies' | 'lastReplyDate' | 'lastReplyAuthor'
> & {
  comments: ForumReply[]
}

function defineThread(thread: ForumThreadInput): ForumThread {
  const last = thread.comments[thread.comments.length - 1]
  return {
    ...thread,
    replies: thread.comments.length,
    lastReplyDate: last?.date ?? thread.date,
    lastReplyAuthor: last?.author ?? thread.author,
  }
}

export const FORUM_CATEGORIES: Array<'All' | ForumCategory> = [
  'All',
  'Setup',
  'Features',
  'Status',
  'Support',
]

/** Community Q&A threads — separate from /blogs editorial guides. */
export const FORUM_THREADS: ForumThread[] = [
  defineThread({
    slug: 'save-settings-configs',
    title: 'Can you save Destiny 2 Hack settings/configs?',
    excerpt:
      'Yes — export your Aimbot FOV, ESP colors and hotkeys from the menu, then re-import after a rebuild so you do not re-tune every update.',
    metaTitle: 'Save Destiny 2 Hack Settings/Configs | Forum',
    metaDescription:
      'Destiny 2 Hack forum thread: how to save and re-import Aimbot FOV, ESP colors and hotkey configs after a rebuild on destiny2hack.org.',
    category: 'Features',
    date: '2026-09-12',
    author: 'mira',
    views: 1643,
    closed: false,
    closedNote: '',
    body: [
      'Yes. Open the Destiny 2 Hack menu, use the config export option, and keep the file off your Destiny 2 install folder.',
      'After a rebuild or clean reinstall, import the same file so silent-aim FOV, ESP boxes and hotkeys come back without starting from defaults.',
      'If export is greyed out, confirm the build is clear-to-load on the product page and that Windows Defender did not quarantine the config folder.',
    ],
    comments: [
      {
        author: 'veil',
        date: '2026-09-14',
        body: 'Export worked after I moved the folder out of Downloads. Defender had been eating the .cfg file.',
      },
      {
        author: 'nox',
        date: '2026-09-18',
        body: 'I keep a Trials config and a casual Crucible config — naming them in the menu helps after rebuilds.',
      },
      {
        author: 'orbit',
        date: '2026-09-22',
        body: 'Greyed-out export for me was Updating status. Once clear-to-load came back, export unlocked.',
      },
      {
        author: 'pixel',
        date: '2026-09-27',
        body: 'Do not store configs inside the Destiny 2 install path — Steam verify can wipe them.',
      },
      {
        author: 'rift',
        date: '2026-09-30',
        body: 'Re-import after every rebuild has saved me hours of FOV tuning. Worth doing first load.',
      },
      {
        author: 'sable',
        date: '2026-10-01',
        body: 'If import fails, check the file was not quarantined again before opening a Support ticket.',
      },
      {
        author: 'ash',
        date: '2026-10-02',
        body: 'Hotkeys came back fine; ESP colors needed a second import on my Win11 box.',
      },
      {
        author: 'kai',
        date: '2026-10-03',
        body: 'Confirmed — export → save off-install → import after rebuild is the whole workflow.',
      },
    ],
  }),
  defineThread({
    slug: 'wait-after-game-patch',
    title: 'Destiny 2 update after a game patch: do I wait?',
    excerpt:
      'Yes — wait for clear-to-load on destiny2hack.org. Loading while BattlEye shows Updating is the fastest way to waste a session.',
    metaTitle: 'Wait After Destiny 2 Patch? | Forum',
    metaDescription:
      'Destiny 2 Hack forum thread: when to wait after a Destiny 2 or BattlEye patch before loading — wait for clear-to-load on destiny2hack.org.',
    category: 'Status',
    date: '2026-09-20',
    author: 'rift',
    views: 2947,
    closed: false,
    closedNote: '',
    body: [
      'When Bungie or BattlEye ships a client patch, our status page may flip to Updating while we rebuild.',
      'Do not force-load. Wait until Destiny 2 Hack shows clear-to-load on the product page, then run one clean load with overlays closed.',
      'If status stays Updating longer than usual, check Support with your order ID — do not download random “fixed” loaders elsewhere.',
    ],
    comments: [
      {
        author: 'hex',
        date: '2026-09-21',
        body: 'Forced a load during Updating once — instant crash loop. Waiting was the fix.',
      },
      {
        author: 'nova',
        date: '2026-09-23',
        body: 'I check the product page before every session now, not only on patch day.',
      },
      {
        author: 'cipher',
        date: '2026-09-25',
        body: 'Discord “fixed loader” links are bait. Official delivery only.',
      },
      {
        author: 'wraith',
        date: '2026-09-27',
        body: 'Clear-to-load flipped back overnight after the last BattlEye bump. Patience paid off.',
      },
      {
        author: 'ember',
        date: '2026-09-28',
        body: 'Support answered faster when I included my order ID and a status screenshot.',
      },
      {
        author: 'quill',
        date: '2026-09-29',
        body: 'Overlays closed + one clean load after clear status — no issues.',
      },
      {
        author: 'ghostyy',
        date: '2026-09-30',
        body: 'Rule of thumb: if the label says Updating, close Destiny 2 and wait.',
      },
    ],
  }),
  defineThread({
    slug: 'esp-not-showing-through-walls',
    title: 'ESP not showing through walls in Crucible?',
    excerpt:
      'Usually a render distance, team filter or stream-proof mode issue — not a missing license. Check ESP toggles before reinstalling.',
    metaTitle: 'Destiny 2 ESP Not Showing Through Walls | Forum',
    metaDescription:
      'Destiny 2 Hack forum help: player ESP or wallhack not visible in Crucible — check filters, distance and stream-proof before reinstalling.',
    category: 'Features',
    date: '2026-08-28',
    author: 'veil',
    views: 2214,
    closed: false,
    closedNote: '',
    body: [
      'Confirm Player ESP and wallhack are enabled, team filter is set to enemies, and max distance is not set too low for the map.',
      'Stream-proof mode can hide overlays from some capture paths — turn it off once to verify ESP draws in-game.',
      'If boxes still never appear after a clear-to-load build, re-run antivirus exclusions and reload once with Destiny 2 already in orbit.',
    ],
    comments: [
      {
        author: 'drift',
        date: '2026-08-30',
        body: 'Mine was team filter on allies only. Switched to enemies and boxes showed up.',
      },
      {
        author: 'luna',
        date: '2026-09-02',
        body: 'Distance was at 20m — bumped it and Twilight Gap walls lit up again.',
      },
      {
        author: 'jax',
        date: '2026-09-05',
        body: 'Stream-proof off for a test draw, then back on after I confirmed ESP worked locally.',
      },
      {
        author: 'kai',
        date: '2026-09-08',
        body: 'Orbit → enable ESP → then queue worked better than enabling mid-match for me.',
      },
      {
        author: 'mira',
        date: '2026-09-11',
        body: 'Defender had quarantined a support file. Restore + exclusion fixed blank ESP.',
      },
      {
        author: 'orbit',
        date: '2026-09-14',
        body: 'Master ESP toggle was off after a config import. Easy miss.',
      },
      {
        author: 'sable',
        date: '2026-09-16',
        body: 'Still blank after all that? Support with order ID — do not reinstall five times first.',
      },
      {
        author: 'pixel',
        date: '2026-09-17',
        body: 'Same checklist fixed Bannerfall for me. Distance + filter every time.',
      },
      {
        author: 'rift',
        date: '2026-09-17',
        body: 'Wallhack and player ESP are separate toggles on my build — both need to be on.',
      },
      {
        author: 'ash',
        date: '2026-09-18',
        body: 'Clear status first, then toggles. Order matters more than people think.',
      },
      {
        author: 'nox',
        date: '2026-09-18',
        body: 'Confirmed — filters and stream-proof cover most “ESP missing” tickets.',
      },
    ],
  }),
  defineThread({
    slug: 'defender-quarantined-loader',
    title: 'Windows Defender quarantined the Destiny 2 loader',
    excerpt:
      'Add the delivery folder to exclusions, restore the file, then load again. Do not run the menu from Downloads long-term.',
    metaTitle: 'Defender Quarantined Destiny 2 Loader | Forum',
    metaDescription:
      'Destiny 2 Hack forum thread: fix Windows Defender quarantining the loader — add exclusions, restore the file, then load cleanly.',
    category: 'Setup',
    date: '2026-08-14',
    author: 'pixel',
    views: 3812,
    closed: false,
    closedNote: '',
    body: [
      'This is the most common setup failure. Move the official delivery folder out of Downloads, add it to Defender exclusions, then restore anything quarantined.',
      'Reboot once, launch Destiny 2 from the official client, then open the loader as admin when status is clear.',
      'Third-party AV (Norton, Avast, etc.) needs the same exclusion — see Support if restore keeps failing.',
    ],
    comments: [
      {
        author: 'nova',
        date: '2026-08-15',
        body: 'Moved to C:\\Games\\D2Hack, excluded that folder, restored from Protection history — worked.',
      },
      {
        author: 'hex',
        date: '2026-08-18',
        body: 'Forgot the reboot. Exclusion alone was not enough until I restarted once.',
      },
      {
        author: 'quill',
        date: '2026-08-21',
        body: 'Avast was worse than Defender for me. Same idea: exclude delivery folder permanently.',
      },
      {
        author: 'ember',
        date: '2026-08-25',
        body: 'Do not leave the loader in Downloads. Windows loves scanning that path.',
      },
      {
        author: 'cipher',
        date: '2026-08-28',
        body: 'Admin load after Destiny 2 is in orbit fixed the last “file missing” error.',
      },
      {
        author: 'wraith',
        date: '2026-09-02',
        body: 'Norton quarantine loop until I disabled “auto protect” for that folder.',
      },
      {
        author: 'drift',
        date: '2026-09-06',
        body: 'Restoration tip: search Protection history for the exact delivery filename.',
      },
      {
        author: 'luna',
        date: '2026-09-10',
        body: 'Clear-to-load + exclusions + one clean load. That order stopped my spam-clicking.',
      },
      {
        author: 'jax',
        date: '2026-09-14',
        body: 'Support asked for Windows version — helpful when restore still failed.',
      },
      {
        author: 'kai',
        date: '2026-09-17',
        body: 'Same steps on Win11 24H2. Folder exclusion is non-negotiable.',
      },
      {
        author: 'veil',
        date: '2026-09-19',
        body: 'After exclude, I also turned off Controlled Folder Access for that path.',
      },
      {
        author: 'ghostyy',
        date: '2026-09-20',
        body: 'Third-party AV users: treat this as required reading before Support.',
      },
      {
        author: 'sable',
        date: '2026-09-21',
        body: 'Loader finally stayed on disk after I stopped unpacking into Temp.',
      },
      {
        author: 'mira',
        date: '2026-09-22',
        body: 'Pinned this — still the #1 setup fix on destiny2hack.org.',
      },
    ],
  }),
  defineThread({
    slug: 'aimbot-too-obvious-trials',
    title: 'Aimbot feels too obvious in Trials — what settings?',
    excerpt:
      'Tighten FOV, add smoothing, use chest/nearest bone first. Blatant snaps get spectate reports faster than ESP.',
    metaTitle: 'Destiny 2 Aimbot Settings for Trials | Forum',
    metaDescription:
      'Destiny 2 Hack forum advice: quieter silent-aim settings for Trials — tighten FOV, add smoothing and prefer chest hitboxes.',
    category: 'Features',
    date: '2026-09-01',
    author: 'jax',
    views: 1988,
    closed: false,
    closedNote: '',
    body: [
      'Start conservative: small FOV, high smoothing, visible-check on, chest or nearest bone before head-only.',
      'Save a “Trials” config separate from your casual Crucible preset so you do not mix aggressive settings.',
      'Full dial-in steps live on the Aimbot settings blog — this thread only covers the common over-tune mistakes.',
    ],
    comments: [
      {
        author: 'luna',
        date: '2026-09-03',
        body: 'Dropped FOV hard and added smoothing — reports cooled off in my card.',
      },
      {
        author: 'veil',
        date: '2026-09-06',
        body: 'Chest bone only for Trials. Head lock was lighting me up on spectate.',
      },
      {
        author: 'nox',
        date: '2026-09-10',
        body: 'Separate Trials config is mandatory. Casual preset is way too loud.',
      },
      {
        author: 'drift',
        date: '2026-09-14',
        body: 'Visible-check on stopped wall locks that looked insane on replays.',
      },
      {
        author: 'orbit',
        date: '2026-09-18',
        body: 'I run ESP + radar in Trials and keep aimbot almost off. Feels safer.',
      },
      {
        author: 'rift',
        date: '2026-09-20',
        body: 'Aimbot blog has the step list — this thread nailed the mistakes though.',
      },
      {
        author: 'ash',
        date: '2026-09-22',
        body: 'High smoothing feels sluggish at first but reads human in 3s.',
      },
      {
        author: 'pixel',
        date: '2026-09-24',
        body: 'If you can see the snap in a local clip, Admins will too. Tone it down.',
      },
      {
        author: 'veil',
        date: '2026-09-25',
        body: 'Re-saved Trials config after the last rebuild — FOV had reset wide.',
      },
    ],
  }),
  defineThread({
    slug: 'stream-proof-obs-capture',
    title: 'Will stream-proof hide ESP from OBS?',
    excerpt:
      'Supported overlays stay out of common capture tools when stream-proof is on — verify with a local recording before going live.',
    metaTitle: 'Destiny 2 Stream-Proof vs OBS | Forum',
    metaDescription:
      'Destiny 2 Hack forum thread: using stream-proof with OBS — what overlays stay hidden and how to verify with a local recording.',
    category: 'Setup',
    date: '2026-07-30',
    author: 'orbit',
    views: 1420,
    closed: false,
    closedNote: '',
    body: [
      'Enable stream-proof in the menu, then record a short local clip in OBS. You should see clean gameplay without ESP boxes if the build supports it.',
      'Some GPU capture modes differ — if ESP still appears, switch capture method once before blaming the toggle.',
      'Never show the cheat menu on stream even with stream-proof enabled.',
    ],
    comments: [
      {
        author: 'quill',
        date: '2026-08-02',
        body: 'Game capture hid ESP; display capture still leaked it. Switched and retested.',
      },
      {
        author: 'sage',
        date: '2026-08-06',
        body: 'Local 30-second test recording saved me from going live with boxes on.',
      },
      {
        author: 'kai',
        date: '2026-08-10',
        body: 'Menu was visible for one second on stream — stream-proof does not cover that. Lesson learned.',
      },
      {
        author: 'mira',
        date: '2026-08-14',
        body: 'Toggle on before starting OBS, not after. Order mattered on my setup.',
      },
      {
        author: 'hex',
        date: '2026-08-17',
        body: 'NVENC + game capture worked. Monitor capture did not.',
      },
      {
        author: 'orbit',
        date: '2026-08-19',
        body: 'Always verify offline first — do not trust the toggle blind on a live card.',
      },
    ],
  }),
  defineThread({
    slug: 'license-expired-renew',
    title: 'License expired — how do I renew on destiny2hack.org?',
    excerpt:
      'Renew from the same product checkout with the email used on the original order. Keep the order ID for Support.',
    metaTitle: 'Renew Destiny 2 Hack License | Forum',
    metaDescription:
      'Destiny 2 Hack forum thread: renew an expired license on destiny2hack.org, reuse your order email, and what to send Support.',
    category: 'Support',
    date: '2026-08-05',
    author: 'sable',
    views: 1104,
    closed: false,
    closedNote: '',
    body: [
      'Open the Destiny 2 Hack product page, complete checkout again with the same email, and wait for the new delivery message.',
      'If payment succeeded but nothing arrived, contact Support with the order ID — do not buy a second time until they check.',
      'Refund timing follows the refund policy for digital licenses.',
    ],
    comments: [
      {
        author: 'ember',
        date: '2026-08-08',
        body: 'Same email as the first order made renewal delivery land in minutes.',
      },
      {
        author: 'cipher',
        date: '2026-08-14',
        body: 'Payment went through, mail delayed — Support resent with my order ID.',
      },
      {
        author: 'nova',
        date: '2026-08-22',
        body: 'Do not double-buy while waiting. Check spam and Support first.',
      },
      {
        author: 'wraith',
        date: '2026-09-01',
        body: 'Refunds page clarified what counts if delivery never arrives.',
      },
      {
        author: 'sable',
        date: '2026-09-10',
        body: 'Keep both order IDs in a note — helps if keys overlap during renew.',
      },
    ],
  }),
  defineThread({
    slug: 'clear-to-load-vs-updating',
    title: 'What does clear-to-load vs Updating mean?',
    excerpt:
      'Clear-to-load means the current build is ready. Updating means wait — a BattlEye or client change is being rebuilt.',
    metaTitle: 'Clear-to-Load vs Updating | Destiny 2 Forum',
    metaDescription:
      'Destiny 2 Hack forum thread explaining anti-cheat status labels: clear-to-load versus Updating on destiny2hack.org.',
    category: 'Status',
    date: '2026-09-08',
    author: 'rift',
    views: 2560,
    closed: false,
    closedNote: '',
    body: [
      'Clear-to-load: safe to follow setup and open the loader for Destiny 2 on Windows.',
      'Updating: do not load. Watch the product / status page until it flips back.',
      'Status can change after Destiny 2 patches — always check before a session, not only on purchase day.',
    ],
    comments: [
      {
        author: 'ghostyy',
        date: '2026-09-09',
        body: 'Wish I had read this before injecting into Updating. Crash city.',
      },
      {
        author: 'cipher',
        date: '2026-09-12',
        body: 'I bookmark the product page and glance at the label every login.',
      },
      {
        author: 'luna',
        date: '2026-09-15',
        body: 'Clear-to-load ≠ banned-proof. Still play conservative in Trials.',
      },
      {
        author: 'hex',
        date: '2026-09-18',
        body: 'Updating after Tuesday patches is normal. Wait it out.',
      },
      {
        author: 'quill',
        date: '2026-09-21',
        body: 'Definitions guide + checklist guide together answered all my status questions.',
      },
      {
        author: 'kai',
        date: '2026-09-24',
        body: 'Purchase-day clear does not mean forever clear. Re-check.',
      },
      {
        author: 'mira',
        date: '2026-09-26',
        body: 'Simple labels, big difference. This should be pinned.',
      },
      {
        author: 'ash',
        date: '2026-09-27',
        body: 'If it says Updating, my PC stays off Destiny 2 Hack. Period.',
      },
      {
        author: 'pixel',
        date: '2026-09-27',
        body: 'New buyers: learn these two words before you touch the loader.',
      },
      {
        author: 'rift',
        date: '2026-09-28',
        body: 'Still the shortest honest status explainer we have on the forum.',
      },
    ],
  }),
  defineThread({
    slug: 'fresh-install-order',
    title: 'Fresh install: what order do I load Destiny 2 Hack?',
    excerpt:
      'Exclusions first, Destiny 2 running from the official client, then loader — never the other way around on a new PC.',
    metaTitle: 'Fresh Install Load Order | Destiny 2 Forum',
    metaDescription:
      'Destiny 2 Hack setup thread: correct fresh-install load order on Windows 10/11 — exclusions first, then game, then loader.',
    category: 'Setup',
    date: '2026-07-18',
    author: 'pixel',
    views: 3201,
    closed: false,
    closedNote: '',
    body: [
      '1) Add Defender exclusions. 2) Close Discord/NVIDIA overlays. 3) Launch Destiny 2. 4) Confirm clear-to-load. 5) Run the official loader.',
      'Skipping exclusions is why most “loader missing” tickets happen on day one.',
      'Full checklist is on the complete-setup blog; this thread is the short community version.',
    ],
    comments: [
      {
        author: 'nova',
        date: '2026-07-20',
        body: 'Skipped exclusions on a new laptop — classic. Fixed after following this order.',
      },
      {
        author: 'quill',
        date: '2026-07-25',
        body: 'Closing overlays before Destiny 2 launch mattered more than I expected.',
      },
      {
        author: 'ember',
        date: '2026-08-02',
        body: 'Loader before game = fail. Game first, then loader.',
      },
      {
        author: 'hex',
        date: '2026-08-10',
        body: 'Printed the five steps for my second PC setup. Zero issues.',
      },
      {
        author: 'drift',
        date: '2026-08-18',
        body: 'Clear-to-load check before step 5 saved a wasted inject.',
      },
      {
        author: 'sable',
        date: '2026-08-26',
        body: 'Complete-setup blog has screenshots; this is the TL;DR that stuck.',
      },
      {
        author: 'kai',
        date: '2026-09-01',
        body: 'Win11 fresh install — same order. Still the gold path.',
      },
      {
        author: 'mira',
        date: '2026-09-05',
        body: 'Discord overlay was the silent killer on my first attempt.',
      },
      {
        author: 'ghostyy',
        date: '2026-09-09',
        body: 'If day-one load fails, re-read steps 1–2 before blaming the build.',
      },
      {
        author: 'cipher',
        date: '2026-09-12',
        body: 'Official client only — Epic/weird launchers are unsupported noise.',
      },
      {
        author: 'wraith',
        date: '2026-09-14',
        body: 'Admin loader after orbit. That was my missing piece.',
      },
      {
        author: 'pixel',
        date: '2026-09-15',
        body: 'Still the shortest fresh-install answer we give in Support.',
      },
    ],
  }),
  defineThread({
    slug: 'spoofer-required-or-not',
    title: 'Do I need the spoofer every session?',
    excerpt:
      'Only when the current build includes it and Support/status says hardware protection is required — not every casual load.',
    metaTitle: 'Destiny 2 Spoofer Required? | Forum',
    metaDescription:
      'Destiny 2 Hack forum answer: when the spoofer is required for the current build versus optional on destiny2hack.org.',
    category: 'Support',
    date: '2026-08-22',
    author: 'ash',
    views: 987,
    closed: false,
    closedNote: '',
    body: [
      'Follow the product page notes for the current build. If spoofer is listed and status asks for it, run it before the main load.',
      'If the build does not ship a spoofer, do not download third-party tools claiming to “help”.',
      'Hardware bans and account risk still exist — status clear does not remove ToS risk.',
    ],
    comments: [
      {
        author: 'cipher',
        date: '2026-08-24',
        body: 'My build listed spoofer — ran it first, then loader. Clean.',
      },
      {
        author: 'ember',
        date: '2026-08-28',
        body: 'No spoofer in delivery notes this month. Skipped it and stayed on official files only.',
      },
      {
        author: 'hex',
        date: '2026-09-01',
        body: 'Third-party “HWIDs” from Discord are a ban magnet. Avoid.',
      },
      {
        author: 'ash',
        date: '2026-09-05',
        body: 'Read the product notes each rebuild — requirement can change.',
      },
    ],
  }),
  defineThread({
    slug: 'radar-not-showing-flanks',
    title: 'Radar not showing flanks on Crucible maps?',
    excerpt:
      'Check radar size, range and enemy filter first — most “blank radar” reports are a toggle or stream-proof setting, not a dead license.',
    metaTitle: 'Destiny 2 Radar Not Showing Flanks | Forum',
    metaDescription:
      'Destiny 2 Hack forum help: radar overlay missing flanks in Crucible — check range, filters, stream-proof and clear-to-load status on destiny2hack.org.',
    category: 'Features',
    date: '2026-09-24',
    author: 'drift',
    views: 1732,
    closed: false,
    closedNote: '',
    body: [
      'Confirm the radar master toggle is on, range is not set to zero, and the filter includes enemy guardians.',
      'Stream-proof can hide the overlay from some capture paths — disable it once to verify radar draws in-game.',
      'If radar stays blank on a clear-to-load build after one clean reload, open Support with your order ID.',
    ],
    comments: [
      {
        author: 'luna',
        date: '2026-09-25',
        body: 'Range was zero after a bad config import. Instant blank radar.',
      },
      {
        author: 'nox',
        date: '2026-09-28',
        body: 'Enemy filter off by mistake. Flanks popped back in immediately.',
      },
      {
        author: 'jax',
        date: '2026-10-01',
        body: 'Stream-proof test draw confirmed it was capture, not a dead license.',
      },
      {
        author: 'veil',
        date: '2026-10-03',
        body: 'Small radar size made me think it was off — scaled it up slightly.',
      },
      {
        author: 'orbit',
        date: '2026-10-05',
        body: 'Reload in orbit after toggle changes. Mid-match toggles were flaky for me.',
      },
      {
        author: 'kai',
        date: '2026-10-07',
        body: 'Still blank after checklist → Support. They asked for status screenshot.',
      },
      {
        author: 'drift',
        date: '2026-10-08',
        body: 'Most blank-radar tickets end at range/filter. Start there.',
      },
    ],
  }),
  defineThread({
    slug: 'menu-hotkeys-not-working',
    title: 'Menu hotkeys do nothing after a clean load',
    excerpt:
      'Usually a conflicting overlay keybind or the wrong delivery notes key — re-check hotkeys before reinstalling the loader.',
    metaTitle: 'Destiny 2 Hack Menu Hotkeys Not Working | Forum',
    metaDescription:
      'Destiny 2 Hack forum: menu hotkeys not opening after load — close overlays, confirm delivery binds, then retry one clean session on destiny2hack.org.',
    category: 'Setup',
    date: '2026-09-15',
    author: 'nova',
    views: 2104,
    closed: false,
    closedNote: '',
    body: [
      'Close Discord, NVIDIA and AMD overlays — they often steal the same key as the Destiny 2 Hack menu.',
      'Use only the hotkey listed in your current delivery email; binds can change after a rebuild.',
      'One clean load with Destiny 2 already in orbit beats spam-pressing keys mid-match.',
    ],
    comments: [
      {
        author: 'quill',
        date: '2026-09-16',
        body: 'Discord overlay had the same Insert bind. Disabling it fixed the menu.',
      },
      {
        author: 'pixel',
        date: '2026-09-18',
        body: 'I was using last month’s hotkey from memory. Delivery notes had changed.',
      },
      {
        author: 'hex',
        date: '2026-09-20',
        body: 'GeForce Experience overlay was the culprit on my rig.',
      },
      {
        author: 'ember',
        date: '2026-09-22',
        body: 'Spam-pressing mid-Trials never helped. Orbit reload did.',
      },
      {
        author: 'drift',
        date: '2026-09-24',
        body: 'Steam overlay was also bound — see the Steam overlay thread too.',
      },
      {
        author: 'mira',
        date: '2026-09-26',
        body: 'After rebuild, re-read the email. New default key for me.',
      },
      {
        author: 'sable',
        date: '2026-09-28',
        body: 'Admin load + overlays off = menu opened first try.',
      },
      {
        author: 'kai',
        date: '2026-09-30',
        body: 'Do not reinstall five times over a key conflict. Close overlays first.',
      },
      {
        author: 'nova',
        date: '2026-10-02',
        body: 'Still the top cause: overlay keybind wars.',
      },
    ],
  }),
  defineThread({
    slug: 'crash-after-inject',
    title: 'Destiny 2 crashes right after the loader injects',
    excerpt:
      'Force-closing overlays and confirming clear-to-load fixes most instant crashes — do not keep injecting into a failing state.',
    metaTitle: 'Destiny 2 Crash After Loader Inject | Forum',
    metaDescription:
      'Destiny 2 Hack forum: crash after inject — confirm clear-to-load, close overlays, restore Defender exclusions, then one clean retry on destiny2hack.org.',
    category: 'Support',
    date: '2026-09-28',
    author: 'hex',
    views: 2876,
    closed: false,
    closedNote: '',
    body: [
      'If status is Updating, stop. Injecting into a rebuilding anti-cheat window is the fastest crash loop.',
      'Close overlays, restore any quarantined files, launch Destiny 2 first, then run the official loader once.',
      'Still crashing on clear-to-load? Contact Support with order ID, Windows version and a short crash note.',
    ],
    comments: [
      {
        author: 'wraith',
        date: '2026-09-28',
        body: 'I was on Updating. Hard stop fixed the crash loop next day.',
      },
      {
        author: 'cipher',
        date: '2026-09-29',
        body: 'Restored a quarantined DLL, excluded folder, one clean load — stable.',
      },
      {
        author: 'nova',
        date: '2026-09-30',
        body: 'Injected three times into a crash. Made it worse. One retry rule is real.',
      },
      {
        author: 'quill',
        date: '2026-10-01',
        body: 'NVIDIA overlay closed = crash gone on my 4070 box.',
      },
      {
        author: 'ember',
        date: '2026-10-02',
        body: 'Support wanted Win version + order ID. Had both ready — faster reply.',
      },
      {
        author: 'drift',
        date: '2026-10-03',
        body: 'Game first, loader second. Reverse order crashed every time.',
      },
      {
        author: 'luna',
        date: '2026-10-04',
        body: 'Clear status screenshot in the ticket helped them rule out Updating.',
      },
      {
        author: 'kai',
        date: '2026-10-05',
        body: 'RGB software hooks were fighting the inject. Closed iCUE and it stuck.',
      },
      {
        author: 'mira',
        date: '2026-10-06',
        body: 'Do not download “crash fix” loaders elsewhere. Official only.',
      },
      {
        author: 'sable',
        date: '2026-10-07',
        body: 'Reboot after Defender restore was the missing step for me.',
      },
      {
        author: 'ghostyy',
        date: '2026-10-08',
        body: 'Crash note with exact timing (orbit vs character select) helped Support.',
      },
      {
        author: 'pixel',
        date: '2026-10-09',
        body: 'Same checklist as fresh install — exclusions, overlays, order.',
      },
      {
        author: 'hex',
        date: '2026-10-11',
        body: 'If clear-to-load still crashes once cleanly retried, escalate — do not loop injects.',
      },
    ],
  }),
  defineThread({
    slug: 'trials-esp-distance',
    title: 'What ESP distance should I use for Trials?',
    excerpt:
      'Keep ESP short for Trials — long neon ranges look obvious on spectate. Pair mild range with radar for rotates.',
    metaTitle: 'Destiny 2 Trials ESP Distance Settings | Forum',
    metaDescription:
      'Destiny 2 Hack forum advice: safer ESP distance for Trials of Osiris — short range, clean colors, radar for rotates on destiny2hack.org.',
    category: 'Features',
    date: '2026-10-01',
    author: 'luna',
    views: 1540,
    closed: false,
    closedNote: '',
    body: [
      'Trials reports spike when ESP paints the whole map. Use a short max distance and muted colors.',
      'Rely on radar for off-screen rotates and ESP only for the lane you are about to take.',
      'Save a dedicated Trials config so casual Crucible presets stay separate.',
    ],
    comments: [
      {
        author: 'jax',
        date: '2026-10-02',
        body: 'Cut distance in half for Trials. Spectate clips look way cleaner.',
      },
      {
        author: 'veil',
        date: '2026-10-04',
        body: 'Muted green > neon pink. Less “wallhack broadcast”.',
      },
      {
        author: 'drift',
        date: '2026-10-06',
        body: 'Radar for rotates, short ESP for the push. That split works.',
      },
      {
        author: 'nox',
        date: '2026-10-08',
        body: 'Casual preset at long range is fine — just do not load it in Trials.',
      },
      {
        author: 'orbit',
        date: '2026-10-10',
        body: 'Dedicated Trials config saved me from mixing loud settings again.',
      },
      {
        author: 'luna',
        date: '2026-10-12',
        body: 'Short + muted + radar. Still the Trials default I recommend.',
      },
    ],
  }),
  defineThread({
    slug: 'status-green-loader-fails',
    title: 'Status is clear-to-load but the loader still fails',
    excerpt:
      'Clear status is required but not enough alone — exclusions, overlays and load order still matter before you open a ticket.',
    metaTitle: 'Clear-to-Load but Destiny 2 Loader Fails | Forum',
    metaDescription:
      'Destiny 2 Hack forum thread: clear-to-load status but loader fails — Defender exclusions, overlays and one clean load order before Support.',
    category: 'Status',
    date: '2026-09-22',
    author: 'cipher',
    views: 2411,
    closed: false,
    closedNote: '',
    body: [
      'Screenshot the product status first so Support can confirm you were truly clear-to-load.',
      'Re-add Defender exclusions, close overlays, launch Destiny 2, then run the official loader once.',
      'If it still fails after one clean retry, include order ID and Windows version in Support.',
    ],
    comments: [
      {
        author: 'hex',
        date: '2026-09-23',
        body: 'Status was clear; Defender still ate the file. Exclusion fixed it.',
      },
      {
        author: 'nova',
        date: '2026-09-25',
        body: 'Screenshot in the ticket stopped the “are you on Updating?” back-and-forth.',
      },
      {
        author: 'quill',
        date: '2026-09-27',
        body: 'Overlay closed + game first + loader once. Passed on retry.',
      },
      {
        author: 'ember',
        date: '2026-09-29',
        body: 'Clear status does not skip setup. Same as fresh install order.',
      },
      {
        author: 'wraith',
        date: '2026-10-01',
        body: 'One clean retry rule — spam clicking made Support’s job harder.',
      },
      {
        author: 'mira',
        date: '2026-10-03',
        body: 'Win11 version in the ticket was what they asked for next.',
      },
      {
        author: 'sable',
        date: '2026-10-05',
        body: 'Restored quarantine, then load. Status alone never was enough.',
      },
      {
        author: 'kai',
        date: '2026-10-06',
        body: 'Official loader path only. Random “fix” EXE made things worse.',
      },
      {
        author: 'pixel',
        date: '2026-10-07',
        body: 'Linked this thread under crash-after-inject too — same checklist.',
      },
      {
        author: 'ghostyy',
        date: '2026-10-08',
        body: 'Clear label + broken AV exclusions = false “undetected but broken” reports.',
      },
      {
        author: 'cipher',
        date: '2026-10-09',
        body: 'Status first, setup second, Support third. That order.',
      },
    ],
  }),
  defineThread({
    slug: 'two-pc-same-license',
    title: 'Can I use one Destiny 2 Hack license on two PCs?',
    excerpt:
      'Licenses follow the product terms at checkout — do not share loaders across machines unless your plan explicitly allows it.',
    metaTitle: 'Destiny 2 Hack License on Two PCs | Forum',
    metaDescription:
      'Destiny 2 Hack forum answer: using one license on two PCs — follow checkout terms, do not share loaders, contact Support with your order ID.',
    category: 'Support',
    date: '2026-08-30',
    author: 'ember',
    views: 1320,
    closed: false,
    closedNote: '',
    body: [
      'Check the license term shown at checkout on destiny2hack.org — multi-PC use is not assumed by default.',
      'Never share your delivery folder or order email with other players.',
      'Need a second seat? Ask Support with your order ID before buying again.',
    ],
    comments: [
      {
        author: 'sable',
        date: '2026-09-02',
        body: 'My plan was single seat. Support confirmed before I bought a second key.',
      },
      {
        author: 'ash',
        date: '2026-09-08',
        body: 'Do not zip the loader to a friend. That is how keys get burned.',
      },
      {
        author: 'cipher',
        date: '2026-09-12',
        body: 'Checkout page terms spell it out — read before assuming dual PC.',
      },
      {
        author: 'kai',
        date: '2026-09-16',
        body: 'Asked Support first; they outlined the clean way to add a seat.',
      },
      {
        author: 'ember',
        date: '2026-09-20',
        body: 'Sharing loaders ≠ multi-PC license. Keep folders private.',
      },
    ],
  }),
  defineThread({
    slug: 'steam-overlay-blocks-menu',
    title: 'Steam overlay blocks the Destiny 2 Hack menu',
    excerpt:
      'Disable Steam overlay for Destiny 2, then reload once — the overlay frequently captures the menu key.',
    metaTitle: 'Steam Overlay Blocks Destiny 2 Hack Menu | Forum',
    metaDescription:
      'Destiny 2 Hack setup thread: Steam overlay blocking the menu — disable overlay for Destiny 2, confirm clear-to-load, then one clean reload.',
    category: 'Setup',
    date: '2026-09-05',
    author: 'quill',
    views: 1899,
    closed: false,
    closedNote: '',
    body: [
      'In Steam → Destiny 2 → Properties, turn off the Steam overlay for that game.',
      'Also disable Discord overlay if it is still on — both fight the menu hotkey.',
      'Reload Destiny 2, confirm clear-to-load, then open the loader once more.',
    ],
    comments: [
      {
        author: 'nova',
        date: '2026-09-06',
        body: 'Steam overlay off for Destiny 2 only — menu key worked immediately.',
      },
      {
        author: 'pixel',
        date: '2026-09-09',
        body: 'Had to fully restart Steam after changing the property.',
      },
      {
        author: 'hex',
        date: '2026-09-12',
        body: 'Discord was still stealing the key even with Steam off. Both needed.',
      },
      {
        author: 'drift',
        date: '2026-09-15',
        body: 'Shift+Tab conflict was the giveaway. Overlay was the thief.',
      },
      {
        author: 'mira',
        date: '2026-09-18',
        body: 'Clear-to-load check after reload — then loader. Clean.',
      },
      {
        author: 'sable',
        date: '2026-09-22',
        body: 'Per-game Steam overlay disable > global. Keeps other games intact.',
      },
      {
        author: 'kai',
        date: '2026-09-26',
        body: 'Same fix as the hotkeys thread — overlays first, reinstall never.',
      },
      {
        author: 'quill',
        date: '2026-09-29',
        body: 'Steam Properties → turn overlay off. Still the shortest fix.',
      },
    ],
  }),
  defineThread({
    slug: 'silent-aim-vs-assist',
    title: 'Silent aim vs aim assist — which should I enable?',
    excerpt:
      'Most buyers keep silent aim mild or off and lead with ESP; loud assist is what gets spectate reports in Trials.',
    metaTitle: 'Destiny 2 Silent Aim vs Aim Assist | Forum',
    metaDescription:
      'Destiny 2 Hack forum advice: silent aim versus aim assist — start ESP-first, keep assist mild, save separate Trials and casual configs.',
    category: 'Features',
    date: '2026-10-04',
    author: 'jax',
    views: 2205,
    closed: false,
    closedNote: '',
    body: [
      'For safer play, enable player ESP and radar first. Add silent aim only with tight FOV and heavy smoothing.',
      'Visible-check on and chest/nearest bone beat permanent head lock for report risk.',
      'Full dial-in steps are on the Aimbot settings blog — this thread is the community short version.',
    ],
    comments: [
      {
        author: 'luna',
        date: '2026-10-04',
        body: 'ESP-first for a week before I touched silent aim. Better habits.',
      },
      {
        author: 'veil',
        date: '2026-10-05',
        body: 'Loud assist in Trials = spectate magnet. Mild silent only.',
      },
      {
        author: 'nox',
        date: '2026-10-06',
        body: 'Chest bone + visible-check. Head lock stayed off.',
      },
      {
        author: 'drift',
        date: '2026-10-07',
        body: 'Two configs: ESP-only Trials, mild silent for casual.',
      },
      {
        author: 'orbit',
        date: '2026-10-08',
        body: 'Aimbot blog has the FOV numbers — start conservative here.',
      },
      {
        author: 'rift',
        date: '2026-10-09',
        body: 'If you can hear the snap in your headset, it is too loud.',
      },
      {
        author: 'ash',
        date: '2026-10-10',
        body: 'Radar + ESP carried more games than aimbot for me.',
      },
      {
        author: 'kai',
        date: '2026-10-11',
        body: 'Heavy smoothing made silent aim feel less robotic on clips.',
      },
      {
        author: 'mira',
        date: '2026-10-12',
        body: 'Assist maxed is how people get clipped. Do not.',
      },
      {
        author: 'jax',
        date: '2026-10-13',
        body: 'ESP-first remains the community default for a reason.',
      },
    ],
  }),
  defineThread({
    slug: 'updating-longer-than-usual',
    title: 'Status stuck on Updating longer than usual',
    excerpt:
      'Wait it out — do not grab random “fixed” loaders. Check Support only if the window stretches past what Refunds covers.',
    metaTitle: 'Destiny 2 Hack Stuck on Updating | Forum',
    metaDescription:
      'Destiny 2 Hack forum thread: status stuck on Updating after a BattlEye patch — wait for clear-to-load, skip mirrors, contact Support with order ID.',
    category: 'Status',
    date: '2026-10-06',
    author: 'wraith',
    views: 3102,
    closed: false,
    closedNote: '',
    body: [
      'After big Destiny 2 or BattlEye patches, Updating can last longer while the build is rebuilt.',
      'Do not download third-party “fixed” loaders — they are unsupported and unsafe.',
      'If the window is extended, read Refunds and message Support with your order ID.',
    ],
    comments: [
      {
        author: 'ghostyy',
        date: '2026-10-06',
        body: 'Last big BattlEye patch took overnight. Waiting beat any Discord mirror.',
      },
      {
        author: 'cipher',
        date: '2026-10-07',
        body: 'Refunds page spelled out when extended Updating qualifies.',
      },
      {
        author: 'nova',
        date: '2026-10-07',
        body: 'Almost grabbed a “fixed” loader. Glad I refreshed this thread.',
      },
      {
        author: 'hex',
        date: '2026-10-08',
        body: 'Support replied after I sent order ID — no need for a second purchase.',
      },
      {
        author: 'quill',
        date: '2026-10-08',
        body: 'Product page flipped to clear-to-load mid-afternoon. Patience.',
      },
      {
        author: 'ember',
        date: '2026-10-09',
        body: 'Mirrors = malware risk. Official destiny2hack.org only.',
      },
      {
        author: 'luna',
        date: '2026-10-10',
        body: 'Longer Updating after seasons is expected. Plan sessions around it.',
      },
      {
        author: 'sable',
        date: '2026-10-11',
        body: 'I idle on the status page instead of force-loading. Zero crashes.',
      },
      {
        author: 'kai',
        date: '2026-10-12',
        body: 'If it stretches, Refunds + Support — not random EXE sites.',
      },
      {
        author: 'mira',
        date: '2026-10-12',
        body: 'Same advice as wait-after-patch. Consistency helps new buyers.',
      },
      {
        author: 'pixel',
        date: '2026-10-13',
        body: 'Big patch weeks: assume Updating until the label flips.',
      },
      {
        author: 'wraith',
        date: '2026-10-14',
        body: 'Wait, verify clear-to-load, then one clean load. Still the playbook.',
      },
    ],
  }),
  defineThread({
    slug: 'delivery-email-missing',
    title: 'No delivery email after Destiny 2 Hack checkout',
    excerpt:
      'Check spam first, then Support with the order ID — do not repurchase until delivery is confirmed missing.',
    metaTitle: 'Missing Destiny 2 Hack Delivery Email | Forum',
    metaDescription:
      'Destiny 2 Hack forum help: missing delivery email after checkout — check spam, confirm order ID with Support, do not buy twice on destiny2hack.org.',
    category: 'Support',
    date: '2026-09-18',
    author: 'sage',
    views: 1688,
    closed: false,
    closedNote: '',
    body: [
      'Search spam/junk for the destiny2hack.org delivery message and whitelist the sender.',
      'Confirm the email used at checkout matches the inbox you are checking.',
      'Still nothing after a reasonable wait? Contact Support with the order ID before starting a second purchase.',
    ],
    comments: [
      {
        author: 'ember',
        date: '2026-09-19',
        body: 'It was in spam. Whitelisted and resend was not even needed.',
      },
      {
        author: 'cipher',
        date: '2026-09-22',
        body: 'Typo’d email at checkout. Support fixed with order ID proof.',
      },
      {
        author: 'nova',
        date: '2026-09-25',
        body: 'Almost bought twice. Glad Support confirmed the first payment first.',
      },
      {
        author: 'sable',
        date: '2026-09-28',
        body: 'Gmail promotions tab hid mine. Search the domain.',
      },
      {
        author: 'kai',
        date: '2026-10-01',
        body: 'Waited ~30 minutes, checked spam, then messaged Support. Fast reply.',
      },
      {
        author: 'mira',
        date: '2026-10-03',
        body: 'Order ID in the subject line of the Support mail speeds everything up.',
      },
      {
        author: 'sage',
        date: '2026-10-05',
        body: 'Spam → correct inbox → Support. Never double-buy first.',
      },
    ],
  }),
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
  { label: 'Product', href: PRODUCT_PATH },
  { label: 'Features', href: '/blogs/features-list' },
  { label: 'Status', href: '/blogs/anti-cheat-status' },
  { label: 'Setup', href: '/blogs/complete-setup' },
  { label: 'Support', href: '/support' },
] as const
