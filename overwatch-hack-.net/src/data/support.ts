export type SupportTopic = {
  heading: string
  body: string[]
}

export type SupportFaq = {
  q: string
  a: string
}

export const SUPPORT_INTRO =
  'Support for Destiny 2 Hack buyers on destiny2hack.org — loader setup, anti-cheat status, menu config and delivery help after you purchase Destiny 2 hack.'

export const SUPPORT_TOPICS: SupportTopic[] = [
  {
    heading: 'Status before you load',
    body: [
      'Check live status on the product page. If it says Updating, do not load. Wait until it is clear to load again.',
      'Destiny 2 patches can invalidate yesterday’s build. Status honesty matters more than rushing a session.',
    ],
  },
  {
    heading: 'Loader and menu issues',
    body: [
      'Follow Complete Setup for antivirus exclusions and load order before you open a ticket.',
      'If the product is Updating, wait. If a clear-to-load build still fails after one clean retry, open a support request with your order ID.',
    ],
  },
  {
    heading: 'Delivery and refunds',
    body: [
      'Delivery failures and extended Updating windows are covered on the Refunds page. Include your order ID when you write in.',
    ],
  },
]

export const SUPPORT_FAQS: SupportFaq[] = [
  {
    q: 'How do I contact Destiny 2 Hack support?',
    a: 'Open your order on destiny2hack.org and use the checkout support channel tied to your purchase. Include a status screenshot (clear to load / Updating) and whether you need load, menu or delivery help.',
  },
  {
    q: 'The loader will not open — what first?',
    a: 'Follow the Complete Setup forum thread for the current load order. If status is Updating, wait; if a clear-to-load build fails, include your order ID in a support request.',
  },
  {
    q: 'Menu opened once then never again?',
    a: 'Do not spam launch. Restart Destiny 2, confirm antivirus exclusions, re-check status, then try one clean load. If it still fails, contact support with your order ID.',
  },
  {
    q: 'Do you support private Destiny 2 servers?',
    a: 'Control, Survival and Trials of Osiris work. Private matches with strict host tools can differ — ask support with the mode name before you buy if that is your only queue.',
  },
  {
    q: 'Where is my delivery?',
    a: 'Delivery is digital after checkout on destiny2hack.org. Use only that loader link. Third-party mirrors are unsupported and unsafe.',
  },
]
