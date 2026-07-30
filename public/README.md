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

### When a menu photo exists

The 3D prop on that card shrinks and moves to the top-left corner as a small
floating accent, letting the real bake carry the card. Cards without a photo
keep the large centred 3D prop.
