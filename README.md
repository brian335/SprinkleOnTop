# Sprinkle On Top

Website for **Sprinkle On Top**, the home bakery run by Ragini Saraf in Bengaluru.

The home page is entirely about **cakes** — her real ones, photographed and then
rendered as lit 3D prints rather than flat images. Everything else she bakes
(Korean cream buns, cookies, brownies) lives on its own page at `/more`.

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

  three/PhotoSlab.tsx a photo rendered as a lit, bowed physical print
  three/Props.tsx     procedural stand-ins: cream bun, cookies, brownies
  three/Sprinkles.tsx instanced sprinkle cloud
  three/Stage.tsx     the shared canvas, lighting rig and per-section camera

  components/         Button, Logo, Marquee, TiltCard and other primitives
  sections/           one file per section of the page
```

### Pages

| Route | What's on it |
| --- | --- |
| `/` | Hero · cake styles · gallery · signature rail · process · about · reviews · FAQ · contact |
| `/more` | Korean cream buns, cookies and brownies |

Routing is `react-router-dom` with a `BrowserRouter`, so **the host needs an SPA
rewrite** (serve `index.html` for unknown paths) or `/more` will 404 on a hard
refresh. Netlify: a `_redirects` file with `/* /index.html 200`. Vercel and
Cloudflare Pages do this by default.

### The 3D setup

Every 3D moment on the page draws into **one** WebGL canvas (`SharedCanvas` in
`App.tsx`) using drei's `<View>`, which scissors a region per placement — so the
hero, four style cards, six signature cards and the rest cost a single WebGL
context rather than a dozen.

`<Stage3D>` frames each subject with `distance` and `elevation` (degrees above
the subject) rather than a raw camera position. Flat things — cookies, brownies —
need a steep elevation or you end up looking at their edge; prints and cakes want
a near-level eye line.

The design language comes off the logo sticker: cream paper, near-black doodle
ink, and the six candy accents from the drawn icons. Buttons, cards and chips all
share one die-cut treatment (2px ink border, hard offset shadow) so the page
reads as a sheet of stickers.

## Images

Every image on the site is optional at runtime. Drop a file at the expected path
in `public/` and it appears; leave it missing and the component falls back to a
placeholder. **No code changes are needed to add photography** — see
[`public/README.md`](public/README.md) for the full list of filenames and sizes.

### Cake photos are 3D objects, not `<img>` tags

Everywhere a cake is *sold* — the hero, the style cards, the signature rail, the
About corner, the contact panel — the photograph is loaded as a **WebGL texture**
and rendered inside the shared canvas as a physical print: a thick cream-edged
board, the image bowed slightly the way paper is, lit by the same lights as
everything around it, floating over a contact shadow and pitching toward the
cursor. `PhotoSlab` reads each image's real aspect ratio, so portrait and square
cakes both sit correctly in their frame.

The **gallery** deliberately uses plain `<img>` instead: twelve WebGL views would
be wasteful, and there the job is seeing the cake clearly. Tiles get a CSS lift
and a shared-element transition into the lightbox.

`usePhotoTexture` loads without suspending, so a missing photo leaves the card in
its fallback state rather than crashing it.

One consequence worth knowing: **the canvas paints above the whole page**, so no
DOM element can sit on top of a 3D print. That is why prices and badges live in
the card body rather than over the image. Anything that must overlay a print has
to be built into the 3D scene instead.

## What still needs Ragini

- **A photo of her** for the About section (`public/photos/ragini.jpg`, 4:5).
- **Photos of the buns, cookies and brownies** — those three cards on `/more`
  currently show procedural 3D stand-ins and say "photo coming soon".
- **Prices** — everything in `lib/site.ts` is a placeholder pending her rate card.
- **Testimonials and stats** — written as realistic examples; swap in real
  reviews before this goes public.

## Stack

Vite · React · TypeScript · Tailwind CSS v4 · Three.js via react-three-fiber and
drei · Framer Motion · Lenis. Fonts (Fraunces, Plus Jakarta Sans, Caveat) are
self-hosted through Fontsource, so there is no external font request.
