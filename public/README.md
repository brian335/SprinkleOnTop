# Images

## brand/

`logo.png` is the real sticker artwork. In place.

## photos/

Twelve of Ragini's cakes, all in place. They drive the hero carousel and the
gallery.

Two sizes are kept:

- `photos/*.jpg` at 1000px wide, used by the gallery and the lightbox.
- `photos/thumb/*.jpg` at 520px wide, used as textures by the 3D carousel.
  Same filenames. `thumbOf()` in `src/lib/site.ts` maps between them.

Adding a cake means dropping both sizes in and adding an entry to `cakes` in
`src/lib/site.ts`.

## Still missing

`photos/ragini.jpg`, a 4:5 portrait for the About section. Until it exists that
frame shows a placeholder.

## Sizes

- 1000px on the long edge for the full version, 520px for the thumb.
- Portrait or square both work. The 3D print reads the real aspect ratio and
  fits itself to the frame.
- Leave a little room around the cake. The print is gently bowed and tilts with
  the cursor, so a subject cropped tight to the edge distorts at the corners.
