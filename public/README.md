# Images

Everything here is optional at runtime. Drop a file at the path below and it
appears on the site; leave it missing and the component falls back to a
placeholder. No code changes needed either way.

Paths are declared in `src/lib/site.ts` — `images` for brand assets, the
`image` field on each entry in `cakes`, and on each entry in `otherBakes`.

## brand/

| File | What it is |
| --- | --- |
| `brand/logo.png` | The round sticker logo. In place. |

## photos/ — cakes

Twelve of Ragini's real cakes, all in place. They drive the hero, the four
cake-style cards, the signature rail and the gallery.

`cake-safari-tiered` · `cake-rainbow-stars` · `cake-minion` · `cake-mermaid` ·
`cake-jungle-friends` · `cake-anniversary-roses` · `cake-butterfly-pullup` ·
`cake-space-tiered` · `cake-coral-floating` · `cake-white-yellow-ruffle` ·
`cake-carnation-cream` · `cake-space-astronaut`

To add a cake: drop the JPG in here and add an entry to `cakes` in
`src/lib/site.ts`. It joins the gallery automatically.

## photos/ — still missing

| File | Used on | Notes |
| --- | --- | --- |
| `photos/ragini.jpg` | About section portrait | **4:5 portrait**. Currently a placeholder frame. |
| `photos/korean-buns.jpg` | More bakes page | Until this lands the card shows a 3D stand-in and a "photo coming soon" tag. |
| `photos/cookies.jpg` | More bakes page | As above. |
| `photos/brownies.jpg` | More bakes page | As above. |

### Sizes

- Around **1200–1600px** on the long edge is plenty. Larger just slows the page.
- Portrait or square both work — the 3D print reads the real aspect ratio and
  fits itself to the frame.
- Leave a little room around the cake. The print is gently bowed and tilts with
  the cursor, so a subject cropped tight to the edge distorts at the corners.
- JPG for photos, PNG only where transparency is needed.
