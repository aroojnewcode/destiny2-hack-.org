export type FaqItem = {
  q: string
  a: string
}

/** Master FAQ — visible on /faq and reused in sections. */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'How much does the Destiny 2 hack cost?',
    a: 'The Destiny 2 hack starts from $35 for short access. Longer licenses cost more. Always confirm live anti-cheat status and the price on destiny2hack.org before checkout.',
  },
  {
    q: 'Do you sell hacks for other games?',
    a: 'No. destiny2hack.org sells a Destiny 2 hack only — one product, no multi-game catalog.',
  },
  {
    q: 'Is Aimbot the main feature?',
    a: 'Aimbot is optional. Most buyers lead with Destiny 2 ESP and radar, then enable silent aim only if they want it.',
  },
  {
    q: 'How do you handle anti-cheat updates?',
    a: 'We publish live clear-to-load or Updating labels after Destiny 2 and BattlEye patches. Always check status on destiny2hack.org before you open the menu.',
  },
  {
    q: 'What is Destiny 2 ESP / wallhack?',
    a: 'Destiny 2 ESP and wallhack show players through walls and cover with distance and health when supported, so you can read a point before you peek.',
  },
  {
    q: 'What is the Destiny 2 radar?',
    a: "The radar is a 2D overlay for off-screen players — useful for flanks on Twilight Gap, Bannerfall, Burnout and the rest of the Crucible maps.",
  },
  {
    q: 'What features are included?',
    a: 'Destiny 2 Aimbot with silent aim, player ESP, wallhack, radar, triggerbot, Super and ability awareness, and stream-proof options — Destiny 2 on Windows PC only. See the Features Checklist guide for the full list.',
  },
  {
    q: 'Does the Destiny 2 hack work in Survival and Control?',
    a: 'Yes. It is built for official Bungie modes, including Control, Survival and Trials of Osiris. Private matches with extra host tools can behave differently — ask support before you buy if that is your only queue.',
  },
  {
    q: 'How do I buy the Destiny 2 hack?',
    a: 'Start on the homepage, confirm live anti-cheat status and review the price from $35. Open Product details for compatibility and features, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I open the Destiny 2 hack menu?',
    a: 'After checkout, follow the Complete Setup forum thread and the steps in your delivery email. If status is Updating, wait rather than forcing an outdated build.',
  },
  {
    q: 'Where do I get Destiny 2 Hack support?',
    a: 'Use the Support page and your checkout order channel. Include current anti-cheat status and whether you need menu, setup or delivery help.',
  },
  {
    q: 'Where can I read Destiny 2 Hack reviews?',
    a: 'Player reviews with ratings are on the Reviews page. They cover ESP usefulness, status honesty and patch survival before you buy.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Digital licenses follow the Refunds page — delivery failures and extended Updating windows can qualify; change of mind after a working key does not.',
  },
]

/** Commercial questions shown on the homepage; FAQ schema lives on /faq only. */
export const HOME_FAQS: FaqItem[] = [
  SITE_FAQS[0],
  SITE_FAQS[3],
  SITE_FAQS[4],
  SITE_FAQS[8],
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  SITE_FAQS[0],
  SITE_FAQS[3],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[8],
  SITE_FAQS[10],
]
