/**
 * Every word, price and link on the site lives here.
 * Components read from this file only — swapping copy never means touching JSX.
 * Prices marked `from` are placeholders until Ragini confirms her rate card.
 */

export const site = {
  name: 'Sprinkle On Top',
  owner: 'Ragini Saraf',
  tagline: 'Home-baked, sprinkled with love',
  phone: '+917899292228',
  phoneDisplay: '+91 78992 92228',
  instagram: 'https://www.instagram.com/sprinkleontop_rs/',
  instagramHandle: '@sprinkleontop_rs',
  city: 'Bengaluru',
  whatsappMessage:
    "Hi Ragini! I found Sprinkle On Top online and I'd love to place an order.",
} as const

export const whatsappLink = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

/* -------------------------------------------------------------------------- */

export type AccentName = 'berry' | 'butter' | 'mint' | 'grape' | 'tangerine' | 'sky'

/** Hex values mirror the `--color-*` tokens; the 3D scene needs raw hex. */
export const accentHex: Record<AccentName, string> = {
  berry: '#ff4e9b',
  butter: '#ffc93c',
  mint: '#37d9b4',
  grape: '#8b5cf6',
  tangerine: '#ff7a3d',
  sky: '#4cc3ff',
}

/* -------------------------------------------------------------------------- */

export type Category = {
  id: string
  name: string
  blurb: string
  detail: string
  priceFrom: string
  accent: AccentName
  /** which procedural 3D prop to render on the card */
  prop: 'cake' | 'cupcake' | 'bun' | 'cookie' | 'healthy' | 'donut'
  tags: string[]
}

export const categories: Category[] = [
  {
    id: 'cakes',
    name: 'Celebration Cakes',
    blurb: 'Birthdays, anniversaries, and the just-because days.',
    detail:
      'Layered, hand-frosted and finished to your theme. Eggless on request, always baked fresh the morning of pickup.',
    priceFrom: '₹850',
    accent: 'berry',
    prop: 'cake',
    tags: ['Eggless option', 'Custom themes', '500g – 3kg'],
  },
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    blurb: 'Little swirls of buttercream that vanish first at every party.',
    detail:
      'Boxes of six or twelve, piped to match your palette. Great for return gifts and office celebrations.',
    priceFrom: '₹360 / 6',
    accent: 'grape',
    prop: 'cupcake',
    tags: ['Box of 6 or 12', 'Party favours', 'Mix & match'],
  },
  {
    id: 'korean-buns',
    name: 'Korean Cream Buns',
    blurb: 'Pillowy milk buns, split and filled to bursting.',
    detail:
      'Soft tangzhong dough with whipped cream centres — the garlic-butter and strawberry ones sell out first.',
    priceFrom: '₹240 / 4',
    accent: 'mint',
    prop: 'bun',
    tags: ['Baked fresh daily', 'Cream filled', 'Limited batches'],
  },
  {
    id: 'cookies',
    name: 'Cookies',
    blurb: 'Thick, chewy, gooey in the middle. The good kind.',
    detail:
      'Brown-butter chocolate chip, red velvet, double chocolate. Packed in jars that make easy gifts.',
    priceFrom: '₹280 / 6',
    accent: 'tangerine',
    prop: 'cookie',
    tags: ['Gift jars', 'Chewy centre', 'Bakes to order'],
  },
  {
    id: 'healthy-cookies',
    name: 'Healthy Bakes',
    blurb: 'Jaggery, oats and millets — treats you can hand a toddler.',
    detail:
      'No refined sugar, no maida, no preservatives. Ragini bakes these for her own family first.',
    priceFrom: '₹320 / 6',
    accent: 'sky',
    prop: 'healthy',
    tags: ['No refined sugar', 'Whole grain', 'Kid approved'],
  },
  {
    id: 'hampers',
    name: 'Festive Hampers',
    blurb: 'Diwali, Rakhi, housewarming — boxed and ribboned.',
    detail:
      'Curated mixes of cookies, brownies and buns, wrapped and ready to gift. Bulk orders welcome.',
    priceFrom: '₹950',
    accent: 'butter',
    prop: 'donut',
    tags: ['Corporate bulk', 'Gift wrapped', 'Custom notes'],
  },
]

/* -------------------------------------------------------------------------- */

export type Bestseller = {
  id: string
  name: string
  note: string
  price: string
  accent: AccentName
  badge?: string
}

export const bestsellers: Bestseller[] = [
  {
    id: 'biscoff',
    name: 'Biscoff Cheesecake',
    note: 'No-bake, heavy on the cookie butter.',
    price: '₹1,150',
    accent: 'tangerine',
    badge: 'Most ordered',
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet Bento',
    note: 'The tiny cake for the small celebration.',
    price: '₹550',
    accent: 'berry',
    badge: 'Same-day',
  },
  {
    id: 'garlic-bun',
    name: 'Garlic Cream Bun',
    note: 'Savoury, buttery, gone in a minute.',
    price: '₹90',
    accent: 'mint',
  },
  {
    id: 'brownie',
    name: 'Fudge Brownie Box',
    note: 'Nine squares of dense chocolate.',
    price: '₹480',
    accent: 'grape',
  },
  {
    id: 'millet',
    name: 'Millet Jaggery Cookies',
    note: 'The lunchbox regular.',
    price: '₹320',
    accent: 'sky',
    badge: 'No refined sugar',
  },
  {
    id: 'pinata',
    name: 'Piñata Heart Cake',
    note: 'Smash it open, chocolates fall out.',
    price: '₹1,400',
    accent: 'butter',
  },
]

/* -------------------------------------------------------------------------- */

export const steps = [
  {
    n: '01',
    title: 'Tell Ragini the plan',
    body: 'Message on WhatsApp with the occasion, date and how many people you are feeding. Photos of what you like help.',
    accent: 'berry' as AccentName,
  },
  {
    n: '02',
    title: 'Lock the design',
    body: 'You get flavours, sizes and a final price. Half the amount confirms your slot — orders close 48 hours ahead.',
    accent: 'butter' as AccentName,
  },
  {
    n: '03',
    title: 'Fresh out of the oven',
    body: 'Baked the morning of your date. Pick up from home in Bengaluru, or we arrange delivery nearby.',
    accent: 'mint' as AccentName,
  },
]

export const stats = [
  { value: '6+', label: 'years baking' },
  { value: '2,400+', label: 'orders sent out' },
  { value: '100%', label: 'baked at home' },
  { value: '0', label: 'preservatives' },
]

export const testimonials = [
  {
    quote:
      'Ordered a bento cake at 9pm for a next-morning birthday. It arrived looking better than the photo I sent.',
    name: 'Shreya M.',
    detail: 'Indiranagar',
    accent: 'berry' as AccentName,
  },
  {
    quote:
      'The millet cookies are the only thing my six-year-old eats without a fight. We order every fortnight now.',
    name: 'Anita R.',
    detail: 'HSR Layout',
    accent: 'sky' as AccentName,
  },
  {
    quote:
      'We took 40 hampers for our Diwali office gifting. Packed beautifully and every single person asked where they were from.',
    name: 'Karthik V.',
    detail: 'Whitefield',
    accent: 'butter' as AccentName,
  },
  {
    quote:
      'Those Korean cream buns are dangerous. I finished four standing at the kitchen counter.',
    name: 'Priya D.',
    detail: 'Koramangala',
    accent: 'mint' as AccentName,
  },
  {
    quote:
      'Genuinely tastes home-made, not bakery-made. You can tell someone actually cared about it.',
    name: 'Rohan S.',
    detail: 'Jayanagar',
    accent: 'grape' as AccentName,
  },
]

export const faqs = [
  {
    q: 'How far in advance should I order?',
    a: 'Two days is comfortable for most cakes, and a week for anything with custom toppers or large quantities. Bento cakes and cookie boxes can sometimes happen same-day — just ask.',
  },
  {
    q: 'Do you make eggless bakes?',
    a: 'Yes. Almost everything on the menu has an eggless version, and it costs the same. Mention it when you message and Ragini will confirm.',
  },
  {
    q: 'Can you do sugar-free or whole wheat?',
    a: 'The Healthy Bakes range uses jaggery, oats and millets with no refined sugar or maida. Other items can often be adapted — flavour changes a little, so she will tell you honestly what works.',
  },
  {
    q: 'Do you deliver?',
    a: 'Pickup is from her home kitchen in Bengaluru. For nearby areas she arranges a delivery partner at actual cost; cakes travel best when someone collects them in person.',
  },
  {
    q: 'How do I pay?',
    a: 'Fifty percent UPI advance to confirm the slot, the rest on pickup or delivery.',
  },
  {
    q: 'Can you match a photo I found online?',
    a: 'Usually, yes — send it across. She will tell you what is possible in a home kitchen and suggest tweaks where a design needs equipment she does not use.',
  },
]

export const trustPoints = [
  'Baked at home, never bulk',
  'Eggless on request',
  'No preservatives',
  'Custom themes',
  'Fresh on the day',
  'Same-day bento cakes',
]

export const nav = [
  { label: 'Menu', href: '#menu' },
  { label: 'Bestsellers', href: '#bestsellers' },
  { label: 'How it works', href: '#how' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]
