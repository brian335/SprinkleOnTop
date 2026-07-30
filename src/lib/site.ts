/**
 * Every word, price, link and image path on the site lives here.
 * Components read from this file only — swapping copy or photography never
 * means touching JSX.
 *
 * Prices are placeholders until Ragini confirms her rate card.
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
    "Hi Ragini! I found Sprinkle On Top online and I'd love to order a cake.",
} as const

export const whatsappLink = (message: string = site.whatsappMessage) =>
  `https://wa.me/${site.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

/* -------------------------------------------------------------------------- */

/** Brand assets. Paths are relative to /public. */
export const images = {
  logo: '/brand/logo.png',
  owner: '/photos/ragini.jpg',
} as const

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
/* Cakes — the whole home page                                                */
/* -------------------------------------------------------------------------- */

export type Cake = {
  id: string
  name: string
  /** what the cake actually was, for the gallery caption */
  occasion: string
  image: string
  alt: string
  accent: AccentName
  tags: CakeTag[]
  price?: string
}

export type CakeTag = 'character' | 'tiered' | 'floral' | 'kids' | 'surprise'

export const cakeTagLabels: Record<CakeTag, string> = {
  character: 'Character',
  tiered: 'Tiered',
  floral: 'Floral & elegant',
  kids: 'Kids birthday',
  surprise: 'Surprise',
}

/** Every real cake, used by the gallery and drawn on by every other section. */
export const cakes: Cake[] = [
  {
    id: 'safari-tiered',
    name: 'Safari First Birthday',
    occasion: 'Two tiers, hand-painted jungle friends, for a first birthday',
    image: '/photos/cake-safari-tiered.jpg',
    alt: 'Two-tier safari cake in white and mint green with lion, giraffe, zebra and elephant toppers',
    accent: 'mint',
    tags: ['tiered', 'kids', 'character'],
    price: '₹2,400',
  },
  {
    id: 'rainbow-stars',
    name: 'Rainbow & Stars',
    occasion: 'Ombré rainbow tiers with fondant stars and smiling clouds',
    image: '/photos/cake-rainbow-stars.jpg',
    alt: 'Two-tier rainbow cake with pastel ombré icing, fondant stars on sticks and cloud faces',
    accent: 'berry',
    tags: ['tiered', 'kids'],
    price: '₹2,600',
  },
  {
    id: 'minion',
    name: 'Minion Face',
    occasion: 'Piped star by star, with a blue rosette wall',
    image: '/photos/cake-minion.jpg',
    alt: 'Round minion character cake piped in yellow buttercream stars with blue rosettes around the side',
    accent: 'butter',
    tags: ['character', 'kids'],
    price: '₹1,600',
  },
  {
    id: 'mermaid',
    name: 'Under The Sea',
    occasion: 'Pink-to-blue ombré with shells, pearls and a mermaid tail',
    image: '/photos/cake-mermaid.jpg',
    alt: 'Mermaid themed cake with pink and blue ombré icing, sugar pearls, shells and a mermaid topper',
    accent: 'grape',
    tags: ['character', 'kids'],
    price: '₹1,800',
  },
  {
    id: 'jungle-friends',
    name: 'Jungle & Aquarium',
    occasion: 'Chocolate bark sides with a blue lagoon top',
    image: '/photos/cake-jungle-friends.jpg',
    alt: 'Cake with chocolate bark sides, blue lagoon top and monkey, elephant, gorilla and fish toppers',
    accent: 'tangerine',
    tags: ['character', 'kids'],
    price: '₹1,900',
  },
  {
    id: 'anniversary-roses',
    name: 'Anniversary Roses',
    occasion: 'Textured white buttercream, fresh roses and gypsophila',
    image: '/photos/cake-anniversary-roses.jpg',
    alt: 'White textured buttercream anniversary cake topped with fresh red roses, baby’s breath and a gold plaque',
    accent: 'berry',
    tags: ['floral'],
    price: '₹1,700',
  },
  {
    id: 'butterfly-pullup',
    name: 'Butterfly Pull-Me-Up',
    occasion: 'Pull the box and the sweets come tumbling down',
    image: '/photos/cake-butterfly-pullup.jpg',
    alt: 'Two-tier butterfly cake in yellow and blue with a suspended pull-me-up box topper',
    accent: 'grape',
    tags: ['surprise', 'tiered', 'kids'],
    price: '₹2,800',
  },
  {
    id: 'space-tiered',
    name: 'Space Explorer',
    occasion: 'Three tiers with a lit galaxy band in the middle',
    image: '/photos/cake-space-tiered.jpg',
    alt: 'Three-tier blue space cake with gold stars, planets and fairy lights glowing in the middle tier',
    accent: 'sky',
    tags: ['tiered', 'kids'],
    price: '₹3,200',
  },
  {
    id: 'coral-floating',
    name: 'Coral Floating Tier',
    occasion: 'A suspended tier with a sugar doll and butterflies',
    image: '/photos/cake-coral-floating.jpg',
    alt: 'Two-tier coral cake with a floating upper tier, sugar doll, aeroplane and butterflies',
    accent: 'tangerine',
    tags: ['tiered', 'surprise', 'kids'],
    price: '₹3,400',
  },
  {
    id: 'white-yellow-ruffle',
    name: 'Ruffles & Daisies',
    occasion: 'Buttercream ruffles with fresh chrysanthemums',
    image: '/photos/cake-white-yellow-ruffle.jpg',
    alt: 'Two-tier white ruffled buttercream cake with yellow chrysanthemums and baby’s breath',
    accent: 'butter',
    tags: ['floral', 'tiered'],
    price: '₹2,500',
  },
  {
    id: 'carnation-cream',
    name: 'Carnation Cream',
    occasion: 'Tall piped cream with fresh carnations and gold candles',
    image: '/photos/cake-carnation-cream.jpg',
    alt: 'White piped cream cake ringed with pink carnations, gypsophila and tall gold candles',
    accent: 'berry',
    tags: ['floral'],
    price: '₹1,500',
  },
  {
    id: 'space-astronaut',
    name: 'Little Astronaut',
    occasion: 'Sky-blue buttercream, planets and a rocket',
    image: '/photos/cake-space-astronaut.jpg',
    alt: 'Light blue space cake with an astronaut topper, fondant planets, stars and a rocket',
    accent: 'sky',
    tags: ['character', 'kids'],
    price: '₹1,500',
  },
]

export const cakeById = (id: string) => cakes.find((c) => c.id === id)!

/** Big, well-lit cakes that carry the hero. */
export const heroCakes = [
  cakeById('safari-tiered'),
  cakeById('rainbow-stars'),
  cakeById('anniversary-roses'),
]

/* -------------------------------------------------------------------------- */

export type CakeStyle = {
  id: string
  name: string
  blurb: string
  detail: string
  priceFrom: string
  accent: AccentName
  /** a real cake of this style */
  cakeId: string
  tags: string[]
}

/** The four things she is actually asked for, each shown by a real cake. */
export const cakeStyles: CakeStyle[] = [
  {
    id: 'character',
    name: 'Character Cakes',
    blurb: 'The one your child has already picked out on a phone screen.',
    detail:
      'Minions, mermaids, dinosaurs, whatever they are obsessed with this month. Piped and hand-cut rather than printed, so it looks made rather than bought.',
    priceFrom: '₹1,500',
    accent: 'butter',
    cakeId: 'minion',
    tags: ['Eggless option', 'Any character', '1kg – 2kg'],
  },
  {
    id: 'tiered',
    name: 'Tiered Celebration Cakes',
    blurb: 'Two and three tiers for the birthdays that need a centrepiece.',
    detail:
      'Built with internal supports so they travel and stand all evening. Floating and suspended tiers are possible too — those need a week.',
    priceFrom: '₹2,400',
    accent: 'mint',
    cakeId: 'safari-tiered',
    tags: ['2 & 3 tiers', 'Custom themes', 'Serves 25+'],
  },
  {
    id: 'floral',
    name: 'Floral & Elegant',
    blurb: 'Anniversaries, engagements, and the grown-up celebrations.',
    detail:
      'Textured buttercream and fresh seasonal flowers, kept deliberately quiet. Roses, carnations and gypsophila are the usual three.',
    priceFrom: '₹1,500',
    accent: 'berry',
    cakeId: 'anniversary-roses',
    tags: ['Fresh flowers', 'Gold plaques', 'Understated'],
  },
  {
    id: 'surprise',
    name: 'Surprise Cakes',
    blurb: 'Pull-me-ups and piñatas — the ones that do something.',
    detail:
      'Pull the topper and sweets pour down the tiers, or smash the shell and chocolates spill out. Worth the extra notice for the reaction alone.',
    priceFrom: '₹2,800',
    accent: 'grape',
    cakeId: 'butterfly-pullup',
    tags: ['Pull-me-up', 'Piñata', 'Book a week ahead'],
  },
]

/** The horizontal signature rail. */
export const signatureCakeIds = [
  'rainbow-stars',
  'jungle-friends',
  'mermaid',
  'space-tiered',
  'carnation-cream',
  'coral-floating',
]

/* -------------------------------------------------------------------------- */
/* Everything that is not a cake — its own page                               */
/* -------------------------------------------------------------------------- */

export type OtherBake = {
  id: string
  name: string
  blurb: string
  detail: string
  priceFrom: string
  accent: AccentName
  /** procedural 3D prop, used until real photography lands */
  prop: 'bun' | 'cookie' | 'brownie'
  tags: string[]
  /** optional real photo — takes over the moment the file exists */
  image?: string
  alt: string
}

export const otherBakes: OtherBake[] = [
  {
    id: 'korean-buns',
    name: 'Korean Cream Buns',
    blurb: 'Pillowy milk buns, split and filled to bursting.',
    detail:
      'Soft tangzhong dough with whipped cream centres. The garlic-butter and strawberry ones sell out first, so they go in limited batches.',
    priceFrom: '₹240 / 4',
    accent: 'mint',
    prop: 'bun',
    image: '/photos/korean-buns.jpg',
    alt: 'Korean cream buns split and filled with whipped cream',
    tags: ['Baked fresh daily', 'Cream filled', 'Limited batches'],
  },
  {
    id: 'cookies',
    name: 'Cookies',
    blurb: 'Thick, chewy, gooey in the middle. The good kind.',
    detail:
      'Brown-butter chocolate chip, red velvet and double chocolate. Packed into jars that make easy gifts. Jaggery and millet versions for the lunchbox.',
    priceFrom: '₹280 / 6',
    accent: 'tangerine',
    prop: 'cookie',
    image: '/photos/cookies.jpg',
    alt: 'Thick chewy cookies stacked on a board',
    tags: ['Gift jars', 'Chewy centre', 'No-refined-sugar option'],
  },
  {
    id: 'brownies',
    name: 'Brownies',
    blurb: 'Dense, fudgy, and nothing like the cakey kind.',
    detail:
      'Nine squares to a box, with a proper crackled top. Walnut, Biscoff and plain fudge — good for gifting and for bulk orders.',
    priceFrom: '₹480 / box',
    accent: 'grape',
    prop: 'brownie',
    image: '/photos/brownies.jpg',
    alt: 'A box of nine fudge brownie squares with crackled tops',
    tags: ['Box of 9', 'Walnut & Biscoff', 'Bulk friendly'],
  },
]

/* -------------------------------------------------------------------------- */

export const steps = [
  {
    n: '01',
    title: 'Send the brief',
    body: 'Message on WhatsApp with the date, the theme and how many people you are feeding. Photos of cakes you like help more than anything.',
    accent: 'berry' as AccentName,
  },
  {
    n: '02',
    title: 'Lock the design',
    body: 'You get flavours, size and a final price. Half the amount confirms your slot — cakes close 48 hours ahead, tiered ones a week.',
    accent: 'butter' as AccentName,
  },
  {
    n: '03',
    title: 'Fresh on the day',
    body: 'Baked and decorated the morning of your date. Pick up from home in Bengaluru, or we arrange delivery nearby.',
    accent: 'mint' as AccentName,
  },
]

export const stats = [
  { value: '6+', label: 'years baking' },
  { value: '2,400+', label: 'cakes sent out' },
  { value: '100%', label: 'baked at home' },
  { value: '0', label: 'preservatives' },
]

export const testimonials = [
  {
    quote:
      'The safari cake was the first thing every guest photographed. It looked better in person than in the picture I sent her.',
    name: 'Shreya M.',
    detail: 'Indiranagar',
    accent: 'mint' as AccentName,
  },
  {
    quote:
      'My daughter asked for a mermaid and got exactly the one in her head. She refused to let us cut it for an hour.',
    name: 'Anita R.',
    detail: 'HSR Layout',
    accent: 'grape' as AccentName,
  },
  {
    quote:
      'We ordered the pull-me-up for a fifth birthday. Twenty children screamed at the same time. Worth every rupee.',
    name: 'Karthik V.',
    detail: 'Whitefield',
    accent: 'butter' as AccentName,
  },
  {
    quote:
      'Beautiful anniversary cake, and it actually tasted like something — not the dry sponge you get from a shop.',
    name: 'Priya D.',
    detail: 'Koramangala',
    accent: 'berry' as AccentName,
  },
  {
    quote:
      'Genuinely home-made, not bakery-made. You can tell someone cared about how it turned out.',
    name: 'Rohan S.',
    detail: 'Jayanagar',
    accent: 'sky' as AccentName,
  },
]

export const faqs = [
  {
    q: 'How far in advance should I order a cake?',
    a: 'Two days is comfortable for a single-tier cake. Tiered, floating and pull-me-up cakes need about a week, since the supports and toppers are built ahead.',
  },
  {
    q: 'Do you make eggless cakes?',
    a: 'Yes, and it costs the same. Almost everything on this page has an eggless version — mention it when you message and Ragini will confirm.',
  },
  {
    q: 'Can you copy a cake I found online?',
    a: 'Usually, yes — send the picture across. She will tell you honestly what is possible in a home kitchen and suggest changes where a design needs equipment she does not use.',
  },
  {
    q: 'What flavours can I choose?',
    a: 'Chocolate truffle, red velvet, butterscotch, pineapple, vanilla and fresh fruit are the regulars. Ask if you want something else — most things are possible with notice.',
  },
  {
    q: 'How big a cake do I need?',
    a: 'Roughly half a kilo for eight people. Tell her the headcount and she will size it for you rather than upselling.',
  },
  {
    q: 'Do you deliver?',
    a: 'Pickup is from her home kitchen in Bengaluru. For nearby areas she arranges a delivery partner at actual cost; tiered cakes travel best when someone collects them in person.',
  },
  {
    q: 'How do I pay?',
    a: 'Fifty percent UPI advance to confirm the slot, the rest on pickup or delivery.',
  },
]

export const trustPoints = [
  'Baked at home, never bulk',
  'Eggless on request',
  'No preservatives',
  'Any theme you like',
  'Fresh on the day',
  'Tiered & pull-me-up cakes',
]

export const nav = [
  { label: 'Cakes', href: '/#cakes' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'How it works', href: '/#how' },
  { label: 'About', href: '/#about' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'More bakes', href: '/more', route: true },
]
