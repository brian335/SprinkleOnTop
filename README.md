# Sprinkle On Top

Website for **Sprinkle On Top**, the home bakery run by Ragini Saraf in Bengaluru.

One page, entirely about cakes. Her real ones, photographed, and shown both as a
sliding 3D carousel in the hero and as a filterable gallery further down.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built site
```

`SINGLE_FILE=1 npm run build` emits one self-contained `dist/index.html` with
every asset inlined, which is handy for sending someone a preview.

## Where things live

```
src/
  lib/site.ts            all copy, links and image paths. Edit content here, not in JSX
  lib/motion.ts          shared easing curves and reveal variants
  lib/hooks.ts           media queries, hover capability, scroll state
  index.css              design tokens: colour, type, the sticker motif

  components/CakeStack.tsx    the hero deck: auto turning, draggable, breathing
  components/SprinkleField.tsx falling sprinkles, one element and one animation each
  components/            Button, Logo, Marquee, Photo and other primitives
  sections/              one file per section of the page
```

Sections in order: hero, trust ribbon, gallery, how it works, about, reviews,
contact.

## Performance

The page ships **119 kB of JavaScript gzipped** and **about 580 kB in total** on
first load. Some rules that keep it there, worth respecting when adding things:

**No WebGL.** Three.js used to render a few decorative cake prints and cost
238 kB gzipped plus a canvas on top of the whole page. Those accents are plain
`<img>` tags now and look the same. Do not reach for a 3D library again without
a reason that earns 238 kB.

**Images are WebP at two sizes.** See `public/README.md`. Most of the page reads
the 560px thumb; only the lightbox loads the 1000px version.

**Animate transform and opacity, nothing else.** Animating a colour on a blurred
element repaints the blur every single frame, which was the single most
expensive thing on this page. The hero's ambient light is now one static
gradient per accent colour with only opacity crossfading, which the compositor
handles on its own.

**Watch the layer count.** Every animated element becomes a compositor layer.
The sprinkle field is one element per sprinkle with fall, drift and tumble baked
into a single keyframe track, rather than three nested animated elements. That
change alone took the page from 83 composited layers to 7.

**Scrolling is native.** A JS smoothing library was running a rAF loop every
frame and adding input lag. `scroll-behavior: smooth` does the anchors.

## House style for copy

No em dashes and no en dashes anywhere in visible text, and hyphens only where a
word genuinely needs one. Short sentences instead. The handwritten face
(Caveat) carries eyebrows, filter chips and small asides; the serif carries
headings; everything else is the sans.

Prices are deliberately absent. Every enquiry goes to WhatsApp or a phone call.

## What still needs Ragini

- **A photo of her** for the About section at `public/photos/ragini.jpg`, 4:5.
- **Real reviews.** The five in `lib/site.ts` are realistic placeholders.
- **The stats** (6+ years, 2,400+ cakes) are guesses. Correct them.
- **Cake names** were written from the photographs. Rename freely in
  `lib/site.ts`; the gallery and hero both read from that one list.

To add a cake: drop a 1000px WebP into `public/photos`, a 560px copy into
`public/photos/thumb`, and add an entry to `cakes`. It joins the gallery and the
hero deck automatically.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Framer Motion. Fonts (Fraunces, Plus Jakarta Sans, Caveat) are
self hosted through Fontsource, so there is no external font request.
