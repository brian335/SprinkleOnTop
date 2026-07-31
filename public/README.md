# Images

## brand/

`logo.webp` is the real sticker artwork, scaled to what the header renders at.

## photos/

Twelve of Ragini's cakes. They drive the hero deck and the gallery.

Two sizes, both WebP:

- `photos/*.webp` at 1000px wide, used only by the gallery lightbox.
- `photos/thumb/*.webp` at 560px wide, used by the hero deck, the gallery tiles
  and the small accents in About and Contact. Same filenames.
  `thumbOf()` in `src/lib/site.ts` maps between them.

Most of the page reads the thumb. Only the lightbox, where someone is
deliberately looking closely, loads the full version.

Adding a cake means dropping both sizes in and adding an entry to `cakes` in
`src/lib/site.ts`.

## Still missing

`photos/ragini.jpg`, a 4:5 portrait for the About section. Until it exists that
frame shows a placeholder. Save it as WebP if you can and update the path in
`images.owner`.

## Sizes

- 1000px on the long edge for the full version, 560px for the thumb.
- WebP at quality 0.8. Converting the set from JPEG saved about a third of the
  total weight at no visible cost.
- Portrait or square both work.
- Leave a little room around the cake. The deck crops to a fixed portrait shape.
