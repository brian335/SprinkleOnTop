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
  lib/hooks.ts           smooth scroll, media queries, scroll state
  index.css              design tokens: colour, type, the sticker motif

  three/CakeCarousel.tsx the hero row of cakes, sliding and steered by the cursor
  three/PhotoSlab.tsx    a photo rendered as a lit, gently bowed physical print
  three/Sprinkles.tsx    instanced sprinkle cloud
  three/Stage.tsx        the shared canvas, lighting rig and per section camera
  three/stages/          the lazily loaded 3D blocks each section mounts

  components/            Button, Logo, Marquee, Photo and other primitives
  sections/              one file per section of the page
```

Sections in order: hero, trust ribbon, gallery, how it works, about, reviews,
contact.

## Loading speed

Three.js is by far the heaviest dependency, so the whole 3D layer sits behind a
dynamic import. The first paint ships about **124 kB gzipped**; the 3D chunk
(~238 kB gzipped) arrives afterwards and swaps itself in. Until it does, the
hero shows a real cake photo rather than an empty box, so nothing pops.

Photos are served at two sizes. The gallery and lightbox use `/photos` at 1000px
wide; the 3D carousel uses `/photos/thumb` at 520px, which keeps GPU memory
sane on phones. `thumbOf()` in `lib/site.ts` maps between them.

## The 3D setup

Every 3D moment draws into **one** WebGL canvas (`SharedCanvas`) using drei's
`<View>`, which scissors a region per placement. The hero carousel is a single
view holding all twelve cakes rather than one view per cake.

`<Stage3D>` frames each subject with `distance` and `elevation` (degrees above
the subject) rather than a raw camera position.

One consequence worth knowing: **the canvas paints above the whole page**, so no
DOM element can sit on top of a 3D print. Anything that must overlay one has to
be built into the 3D scene instead.

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

To add a cake: drop the JPG into `public/photos`, a 520px copy into
`public/photos/thumb`, and add an entry to `cakes`. It joins the gallery and the
hero carousel automatically.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Three.js via react-three-fiber and
drei · Framer Motion · Lenis. Fonts (Fraunces, Plus Jakarta Sans, Caveat) are
self hosted through Fontsource, so there is no external font request.
