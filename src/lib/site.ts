/**
 * Every word, link and image path on the site lives here.
 * Components read from this file only, so changing copy or photography never
 * means touching JSX.
 *
 * House style for all visible copy: no em dashes, no en dashes, and hyphens
 * only where a word genuinely needs one. Short sentences instead.
 */

export const site = {
  name: 'Sprinkle On Top',
  owner: 'Ragini Saraf',
  tagline: 'Baked at home, sprinkled with love',
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

export type CakeTag = 'character' | 'tiered' | 'floral' | 'kids' | 'surprise'

export const cakeTagLabels: Record<CakeTag, string> = {
  character: 'Character',
  tiered: 'Tiered',
  floral: 'Floral',
  kids: 'Kids birthday',
  surprise: 'Surprise',
}

export type Cake = {
  id: string
  name: string
  /** what the cake actually was, shown as the gallery caption */
  occasion: string
  image: string
  alt: string
  accent: AccentName
  tags: CakeTag[]
}

/** A small helper so the 3D carousel loads light textures, not full ones. */
export const thumbOf = (image: string) => image.replace('/photos/', '/photos/thumb/')

/** Every real cake. The gallery and the hero carousel both read this list. */
export const cakes: Cake[] = [
  {
    id: 'safari-tiered',
    name: 'Safari First Birthday',
    occasion: 'Two tiers of jungle friends for a first birthday',
    image: '/photos/cake-safari-tiered.jpg',
    alt: 'Two tier safari cake in white and mint green with lion, giraffe, zebra and elephant toppers',
    accent: 'mint',
    tags: ['tiered', 'kids', 'character'],
  },
  {
    id: 'rainbow-stars',
    name: 'Rainbow and Stars',
    occasion: 'Ombre tiers with fondant stars and smiling clouds',
    image: '/photos/cake-rainbow-stars.jpg',
    alt: 'Two tier rainbow cake with pastel ombre icing, fondant stars on sticks and cloud faces',
    accent: 'berry',
    tags: ['tiered', 'kids'],
  },
  {
    id: 'minion',
    name: 'Minion Face',
    occasion: 'Piped star by star with a blue rosette wall',
    image: '/photos/cake-minion.jpg',
    alt: 'Round minion character cake piped in yellow buttercream stars with blue rosettes around the side',
    accent: 'butter',
    tags: ['character', 'kids'],
  },
  {
    id: 'mermaid',
    name: 'Under The Sea',
    occasion: 'Pink to blue ombre with shells, pearls and a mermaid tail',
    image: '/photos/cake-mermaid.jpg',
    alt: 'Mermaid themed cake with pink and blue ombre icing, sugar pearls, shells and a mermaid topper',
    accent: 'grape',
    tags: ['character', 'kids'],
  },
  {
    id: 'jungle-friends',
    name: 'Jungle and Aquarium',
    occasion: 'Chocolate bark sides with a blue lagoon on top',
    image: '/photos/cake-jungle-friends.jpg',
    alt: 'Cake with chocolate bark sides, blue lagoon top and monkey, elephant, gorilla and fish toppers',
    accent: 'tangerine',
    tags: ['character', 'kids'],
  },
  {
    id: 'anniversary-roses',
    name: 'Anniversary Roses',
    occasion: 'Textured buttercream with fresh roses and gypsophila',
    image: '/photos/cake-anniversary-roses.jpg',
    alt: 'White textured buttercream anniversary cake topped with fresh red roses and baby breath',
    accent: 'berry',
    tags: ['floral'],
  },
  {
    id: 'butterfly-pullup',
    name: 'Butterfly Pull Me Up',
    occasion: 'Pull the box and the sweets come tumbling down',
    image: '/photos/cake-butterfly-pullup.jpg',
    alt: 'Two tier butterfly cake in yellow and blue with a suspended pull me up box topper',
    accent: 'grape',
    tags: ['surprise', 'tiered', 'kids'],
  },
  {
    id: 'space-tiered',
    name: 'Space Explorer',
    occasion: 'Three tiers with a lit galaxy band in the middle',
    image: '/photos/cake-space-tiered.jpg',
    alt: 'Three tier blue space cake with gold stars, planets and fairy lights glowing in the middle tier',
    accent: 'sky',
    tags: ['tiered', 'kids'],
  },
  {
    id: 'coral-floating',
    name: 'Coral Floating Tier',
    occasion: 'A suspended tier with a sugar doll and butterflies',
    image: '/photos/cake-coral-floating.jpg',
    alt: 'Two tier coral cake with a floating upper tier, sugar doll, aeroplane and butterflies',
    accent: 'tangerine',
    tags: ['tiered', 'surprise', 'kids'],
  },
  {
    id: 'white-yellow-ruffle',
    name: 'Ruffles and Daisies',
    occasion: 'Buttercream ruffles with fresh chrysanthemums',
    image: '/photos/cake-white-yellow-ruffle.jpg',
    alt: 'Two tier white ruffled buttercream cake with yellow chrysanthemums and baby breath',
    accent: 'butter',
    tags: ['floral', 'tiered'],
  },
  {
    id: 'carnation-cream',
    name: 'Carnation Cream',
    occasion: 'Tall piped cream with fresh carnations and gold candles',
    image: '/photos/cake-carnation-cream.jpg',
    alt: 'White piped cream cake ringed with pink carnations, gypsophila and tall gold candles',
    accent: 'berry',
    tags: ['floral'],
  },
  {
    id: 'space-astronaut',
    name: 'Little Astronaut',
    occasion: 'Sky blue buttercream with planets and a rocket',
    image: '/photos/cake-space-astronaut.jpg',
    alt: 'Light blue space cake with an astronaut topper, fondant planets, stars and a rocket',
    accent: 'sky',
    tags: ['character', 'kids'],
  },
]

export const cakeById = (id: string) => cakes.find((c) => c.id === id)!

/* -------------------------------------------------------------------------- */

export const steps = [
  {
    n: '01',
    title: 'Send the brief',
    body: 'Message on WhatsApp with the date, the theme and how many people you are feeding. Pictures of cakes you like help more than anything.',
    accent: 'berry' as AccentName,
  },
  {
    n: '02',
    title: 'Lock the design',
    body: 'You get flavours, size and a price back the same day. Half the amount confirms your slot. Cakes close 48 hours ahead and tiered ones a week.',
    accent: 'butter' as AccentName,
  },
  {
    n: '03',
    title: 'Fresh on the day',
    body: 'Baked and decorated the morning of your date. Pick up from home in Bengaluru, or ask and delivery nearby can be arranged.',
    accent: 'mint' as AccentName,
  },
]

export const stats = [
  { value: '6+', label: 'years baking' },
  { value: '2,400+', label: 'cakes sent out' },
  { value: '100%', label: 'eggless' },
  { value: '0', label: 'preservatives' },
]

export const testimonials = [
  {
    quote:
      'The safari cake was the first thing every guest photographed. It looked better in person than the picture I sent her.',
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
      'We ordered the pull me up cake for a fifth birthday. Twenty children screamed at the same time. Worth every rupee.',
    name: 'Karthik V.',
    detail: 'Whitefield',
    accent: 'butter' as AccentName,
  },
  {
    quote:
      'Beautiful anniversary cake, and it actually tasted like something. Not the dry sponge you get from a shop.',
    name: 'Priya D.',
    detail: 'Koramangala',
    accent: 'berry' as AccentName,
  },
  {
    quote:
      'Genuinely home made, not bakery made. You can tell someone cared about how it turned out.',
    name: 'Rohan S.',
    detail: 'Jayanagar',
    accent: 'sky' as AccentName,
  },
]

export const trustPoints = [
  'Always 100% eggless',
  'Baked at home, never bulk',
  'No preservatives',
  'Any theme you like',
  'Fresh on the day',
  'Tiered and pull me up cakes',
]

export const nav = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'How it works', href: '#how' },
  { label: 'About', href: '#about' },
]
