# Images

Everything here is optional at runtime. Drop a file at the path below and it
appears on the site; leave it missing and the component falls back to a
placeholder. No code changes needed either way.

Paths are declared in `src/lib/site.ts` — `images` for brand assets, and the
`image` field on each entry in `categories` and `bestsellers`.

## brand/

| File | What it is | Notes |
| --- | --- | --- |
| `brand/logo.png` | The round sticker logo | PNG or SVG, **transparent background**, at least 512×512. Square crop — the site masks it to a circle. |

Until this exists the header draws an SVG approximation, which is deliberately
not a substitute for the real artwork.

## photos/

Shot on a phone is fine — good daylight matters far more than the camera.

| File | Used on |
| --- | --- |
| `photos/ragini.jpg` | About section portrait (**4:5 portrait**) |
| `photos/cakes.jpg` | Menu — Celebration Cakes |
| `photos/cupcakes.jpg` | Menu — Cupcakes |
| `photos/korean-buns.jpg` | Menu — Korean Cream Buns |
| `photos/cookies.jpg` | Menu — Cookies |
| `photos/healthy-bakes.jpg` | Menu — Healthy Bakes |
| `photos/hampers.jpg` | Menu — Festive Hampers |
| `photos/biscoff-cheesecake.jpg` | Bestsellers |
| `photos/red-velvet-bento.jpg` | Bestsellers |
| `photos/garlic-cream-bun.jpg` | Bestsellers |
| `photos/fudge-brownies.jpg` | Bestsellers |
| `photos/millet-cookies.jpg` | Bestsellers |
| `photos/pinata-heart-cake.jpg` | Bestsellers |

### Sizes

- Menu and bestseller photos are cropped to landscape (**4:3**), so leave a
  little room around the bake — don't frame it tight to the edges.
- The portrait is **4:5**.
- Around **1600px** on the long edge is plenty. Anything larger just slows the
  page down.
- JPG for photos, PNG only where transparency is needed.

### How these photos are rendered

Menu and bestseller photos are not `<img>` tags. Each one is loaded as a WebGL
texture and rendered as a physical print inside the 3D scene — thick cream
border, slightly bowed, lit and shadowed like the cakes around it, tilting with
the cursor. On menu cards the 3D bake then steps out in front of its own photo.

Two things follow from that:

- **Leave breathing room around the bake.** The print is bowed and tilts, so a
  subject cropped tight to the edge gets distorted at the corners.
- A card with no photo simply shows its large centred 3D prop instead.
