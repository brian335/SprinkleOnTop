# Sprinkle On Top

Website for **Sprinkle On Top**, the home bakery run by Ragini Saraf in Bengaluru —
cakes, cupcakes, Korean cream buns, cookies, healthy bakes and festive hampers.

Built as a single-page site with real 3D: every baked good in the hero and on the
menu cards is procedural Three.js geometry, not a photo.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the built site
```

`SINGLE_FILE=1 npm run build` emits one self-contained `dist/index.html` with
every asset inlined — handy for sending someone a preview.

## Where things live

```
src/
  lib/site.ts         all copy, prices, links, FAQs — edit content here, not in JSX
  lib/motion.ts       shared easing curves and reveal variants
  lib/hooks.ts        smooth scroll, media queries, scroll state
  index.css           design tokens (colour, type, the sticker motif)

  three/Props.tsx     the baked goods: cake, cupcake, cream bun, cookies, donut
  three/Sprinkles.tsx instanced sprinkle cloud
  three/Stage.tsx     the shared canvas, lighting rig and per-section camera

  components/         Button, Logo, Marquee, TiltCard and other primitives
  sections/           one file per section of the page
```

### The 3D setup

Every 3D moment on the page draws into **one** WebGL canvas (`SharedCanvas` in
`App.tsx`) using drei's `<View>`, which scissors a region per placement. Six menu
cards plus the hero, the About cupcake and the Contact donut all cost a single
context rather than nine.

`<Stage3D>` frames each subject with `distance` and `elevation` (degrees above
the subject) instead of a raw camera position. Flat things — cookies, the donut —
need a steep elevation or you end up looking at their edge; tall things like the
cake want a near-level eye line.

The design language comes off the logo sticker: cream paper, near-black doodle
ink, and the six candy accents from the drawn icons. Buttons, cards and chips all
share one die-cut treatment (2px ink border, hard offset shadow) so the page
reads as a sheet of stickers.

## Images

Every image on the site is optional at runtime. Drop a file at the expected path
in `public/` and it appears; leave it missing and the component falls back to a
placeholder. **No code changes are needed to add photography** — see
[`public/README.md`](public/README.md) for the full list of filenames and sizes.

### Photos are 3D objects, not `<img>` tags

On the menu and bestseller cards the photograph is loaded as a **WebGL texture**
and rendered inside the shared canvas as a physical print: a thick cream-edged
board, the image bowed very slightly the way paper is, lit by the same lights as
the cakes around it, floating over its own contact shadow and pitching toward
the cursor. On menu cards the procedural bake then steps out *in front of* its
own photograph.

`three/PhotoSlab.tsx` holds that treatment, and `usePhotoTexture` loads the file
without suspending — a missing photo simply leaves the card in its 3D-prop-only
state rather than crashing it.

One consequence worth knowing: **the canvas paints above the whole page**, so no
DOM element can sit on top of a photo. That is why prices and badges live in the
card body rather than over the image. Anything that must overlay a photo has to
be built into the 3D scene instead.

Elsewhere — the About portrait — photos use the plain `Photo` component, which
holds a placeholder underneath until the real file has decoded so a missing or
slow image never leaves a blank hole.

## What still needs Ragini

The structure and design are done. These are the remaining gaps:

- **Logo** — drop the real sticker artwork at `public/brand/logo.png`. Until
  then the header draws an SVG approximation, which is not a substitute.
- **Photos** — see `public/README.md` for the thirteen filenames.
- **Prices** — everything in `lib/site.ts` marked `priceFrom` / `price` is a
  placeholder pending her actual rate card.
- **Testimonials and stats** — written as realistic examples in `lib/site.ts`;
  swap in real reviews before this goes public.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Three.js via react-three-fiber and
drei · Framer Motion · Lenis. Fonts (Fraunces, Plus Jakarta Sans, Caveat) are
self-hosted through Fontsource, so there is no external font request.
