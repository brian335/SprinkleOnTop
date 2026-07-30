import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Section,
  SectionHeading,
  WhatsAppIcon,
  accentBg,
  cx,
} from '../components/ui'
import { soft } from '../lib/motion'
import { cakeTagLabels, cakes, whatsappLink, type Cake, type CakeTag } from '../lib/site'

type Filter = 'all' | CakeTag

const filters: Filter[] = ['all', 'character', 'tiered', 'floral', 'kids', 'surprise']

const filterLabel = (f: Filter) => (f === 'all' ? 'Everything' : cakeTagLabels[f])

/* -------------------------------------------------------------------------- */

function Tile({ cake, onOpen }: { cake: Cake; onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      layout
      layoutId={`cake-tile-${cake.id}`}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: soft }}
      whileHover={{ y: -6 }}
      className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[1.5rem] border-2 border-ink text-left shadow-[5px_5px_0_var(--color-ink)] transition-shadow duration-300 hover:shadow-[9px_9px_0_var(--color-ink)]"
      aria-label={`View ${cake.name}`}
    >
      <motion.img
        layoutId={`cake-img-${cake.id}`}
        src={cake.image}
        alt={cake.alt}
        loading="lazy"
        decoding="async"
        className="block w-full transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.05]"
      />

      {/* caption slides up on hover; always present for touch */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-0.5 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent p-4 pt-10 opacity-0 transition-all duration-400 ease-[var(--ease-soft)] group-hover:translate-y-0 group-hover:opacity-100">
        <span className="font-display text-lg font-bold text-cream">{cake.name}</span>
        <span className="text-xs text-cream/70">{cake.occasion}</span>
      </span>

      <span
        className={cx(
          'absolute top-3 left-3 rounded-full border-2 border-ink px-2.5 py-1 text-[0.65rem] font-extrabold tracking-wide uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          accentBg[cake.accent],
        )}
      >
        {cakeTagLabels[cake.tags[0]]}
      </span>
    </motion.button>
  )
}

/* -------------------------------------------------------------------------- */

function Lightbox({
  cake,
  onClose,
  onPrev,
  onNext,
}: {
  cake: Cake
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={cake.name}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-zoom-out bg-ink/85 backdrop-blur-md"
        onClick={onClose}
        aria-label="Close"
      />

      <motion.div
        layoutId={`cake-tile-${cake.id}`}
        className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] border-2 border-cream bg-paper sm:flex-row"
        transition={{ duration: 0.45, ease: soft }}
      >
        <motion.img
          layoutId={`cake-img-${cake.id}`}
          src={cake.image}
          alt={cake.alt}
          className="max-h-[55vh] w-full object-contain sm:max-h-[80vh] sm:w-[62%]"
        />

        <div className="flex flex-1 flex-col gap-3 p-6 sm:justify-center">
          <span
            className={cx(
              'w-fit rounded-full border-2 border-ink px-3 py-1 text-[0.65rem] font-extrabold tracking-wide uppercase',
              accentBg[cake.accent],
            )}
          >
            {cakeTagLabels[cake.tags[0]]}
          </span>

          <h3 className="text-3xl font-semibold">{cake.name}</h3>
          <p className="text-sm text-ink-soft">{cake.occasion}</p>

          {cake.price && (
            <p className="font-display text-xl font-extrabold">
              from {cake.price}
              <span className="ml-2 text-xs font-semibold text-ink-faint">as pictured</span>
            </p>
          )}

          <Button
            href={whatsappLink(`Hi Ragini! I love the ${cake.name} cake — could we do something like it?`)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 w-fit"
          >
            <WhatsAppIcon />
            Ask for this cake
          </Button>
        </div>
      </motion.div>

      {/* prev / next */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous cake"
        className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream bg-ink/70 text-cream transition-transform hover:scale-110 sm:left-4"
      >
        ←
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next cake"
        className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream bg-ink/70 text-cream transition-transform hover:scale-110 sm:right-4"
      >
        →
      </button>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream bg-ink/70 text-xl text-cream transition-transform hover:scale-110 sm:top-6 sm:right-6"
      >
        ×
      </button>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? cakes : cakes.filter((c) => c.tags.includes(filter))),
    [filter],
  )

  const openIndex = visible.findIndex((c) => c.id === openId)
  const open = openIndex >= 0 ? visible[openIndex] : null

  const step = useCallback(
    (delta: number) => {
      if (openIndex < 0) return
      const next = (openIndex + delta + visible.length) % visible.length
      setOpenId(visible[next].id)
    },
    [openIndex, visible],
  )

  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow="The gallery"
        accent="grape"
        title="Every one of these came out of her kitchen"
        intro="Real cakes for real birthdays — not stock photos. Tap any of them to see it properly, or to ask for something like it."
      />

      {/* filters */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {filters.map((f) => {
          const active = filter === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={cx(
                'rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition-all duration-200 ease-[var(--ease-sprung)]',
                active
                  ? 'bg-ink text-cream shadow-[4px_4px_0_var(--color-berry)]'
                  : 'bg-paper text-ink-soft hover:-translate-y-0.5 hover:text-ink hover:shadow-[4px_4px_0_var(--color-ink)]',
              )}
            >
              {filterLabel(f)}
            </button>
          )
        })}
      </div>

      {/* masonry — CSS columns keeps every cake at its natural proportions */}
      <motion.div layout className="mt-10 columns-2 gap-5 lg:columns-3 [&>*]:break-inside-avoid">
        <AnimatePresence mode="popLayout">
          {visible.map((cake) => (
            <Tile key={cake.id} cake={cake} onOpen={() => setOpenId(cake.id)} />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && (
          <Lightbox
            cake={open}
            onClose={() => setOpenId(null)}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}
