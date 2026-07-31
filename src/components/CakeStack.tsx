import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { accentHex, cakes, thumbOf, type Cake } from '../lib/site'
import { useHasHover, usePrefersReducedMotion } from '../lib/hooks'
import { cx } from './ui'

/** How many cards are stacked behind the top one. */
const DEPTH = 4
const HOLD_MS = 3800

/* -------------------------------------------------------------------------- */

/** A burst of sprinkles thrown outward whenever a card is dealt away. */
function Confetti({ seed, accent }: { seed: number; accent: string }) {
  const bits = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2 + seed
        const dist = 90 + ((i * 37 + seed * 13) % 70)
        return {
          x: Math.cos(a) * dist,
          y: Math.sin(a) * dist - 30,
          rotate: ((i * 53 + seed * 17) % 360) - 180,
          delay: (i % 5) * 0.02,
          color: [accent, '#ffc93c', '#37d9b4', '#ff4e9b', '#8b5cf6', '#4cc3ff'][i % 6],
        }
      }),
    [seed, accent],
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: b.y, scale: 1, opacity: 0, rotate: b.rotate }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: b.delay }}
          className="absolute h-2.5 w-1.5 rounded-full"
          style={{ background: b.color }}
        />
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Card({
  cake,
  depth,
  isTop,
  idle,
  onDragEnd,
  onDragStart,
}: {
  cake: Cake
  depth: number
  isTop: boolean
  idle: boolean
  onDragEnd: (e: unknown, info: PanInfo) => void
  onDragStart: () => void
}) {
  // cards fan out behind the top one, each a little smaller and turned further
  const lean = [-3.5, 4.5, -6.5, 8][depth % 4]

  // Only the front two cards breathe. The ones behind are barely visible, and
  // every looping animation is main thread work that the deck does not need.
  const breathes = idle && depth < 2
  const sway = breathes
    ? {
        y: [depth * -16, depth * -16 - (7 + depth * 2), depth * -16],
        rotate: [lean, lean + (depth % 2 === 0 ? 1.4 : -1.4), lean],
      }
    : { y: depth * -16, rotate: lean }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 40, rotate: lean }}
      animate={{
        opacity: 1,
        scale: 1 - depth * 0.055,
        x: depth * 10,
        zIndex: DEPTH - depth,
        ...sway,
      }}
      exit={{
        x: 420,
        y: 40,
        rotate: 26,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.55, ease: [0.32, 0, 0.67, 0] },
      }}
      transition={{
        default: { type: 'spring', stiffness: 210, damping: 26, mass: 0.9 },
        y: breathes
          ? { duration: 4.5 + depth * 0.6, repeat: Infinity, ease: 'easeInOut' }
          : { type: 'spring', stiffness: 210, damping: 26 },
        rotate: breathes
          ? { duration: 6 + depth * 0.8, repeat: Infinity, ease: 'easeInOut' }
          : { type: 'spring', stiffness: 210, damping: 26 },
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.55}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
      className={cx(
        'absolute inset-0 origin-bottom rounded-[1.75rem] border-2 border-ink bg-paper p-3 pb-14 shadow-[10px_12px_0_var(--color-ink)]',
        isTop ? 'cursor-grab touch-pan-y' : 'pointer-events-none',
      )}
      style={{ willChange: 'transform' }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.1rem] border-2 border-ink/80 bg-cream-deep">
        <img
          src={thumbOf(cake.image)}
          alt={cake.alt}
          draggable={false}
          loading={depth === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
        />

        {/* light travelling across the print, so the top card is never a
            completely still photograph */}
        {isTop && idle && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent"
            animate={{ x: ['0%', '420%'] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.6 }}
          />
        )}
      </div>

      <span className="absolute inset-x-0 bottom-3.5 text-center font-hand text-2xl leading-none text-ink">
        {cake.name}
      </span>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * The cakes as a deck of photographs.
 *
 * The top card holds the eye, the rest fan out behind it, and every few
 * seconds the top one is dealt away with a burst of sprinkles. The deck also
 * breathes continuously between changes so the section is never still.
 *
 * You can throw the top card yourself, which is the bit that makes people play
 * rather than scroll straight past.
 *
 * `onAccent` reports the colour of whatever is on top so the section around it
 * can shift to match.
 */
export function CakeStack({ onAccent }: { onAccent?: (hex: string) => void }) {
  const [index, setIndex] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [dragging, setDragging] = useState(false)
  const hasHover = useHasHover()
  const reduceMotion = usePrefersReducedMotion()

  // Only a real mouse may pause the deck. A touch fires pointerenter and often
  // never fires pointerleave, which would leave it frozen on a phone.
  const paused = (hasHover && hovering) || dragging

  const next = useCallback(() => setIndex((i) => (i + 1) % cakes.length), [])

  useEffect(() => {
    onAccent?.(accentHex[cakes[index].accent])
  }, [index, onAccent])

  useEffect(() => {
    if (paused || reduceMotion) return
    const id = window.setTimeout(next, HOLD_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, reduceMotion, next])

  const visible = Array.from({ length: DEPTH }, (_, d) => cakes[(index + d) % cakes.length])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false)
    if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 380) next()
  }

  return (
    <div
      className="relative h-full w-full"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      <div className="relative mx-auto h-full w-full max-w-[22rem] [perspective:1200px]">
        <AnimatePresence initial={false} mode="popLayout">
          {visible
            .map((cake, depth) => ({ cake, depth }))
            .reverse()
            .map(({ cake, depth }) => (
              <Card
                key={cake.id}
                cake={cake}
                depth={depth}
                isTop={depth === 0}
                idle={!reduceMotion && !dragging}
                onDragStart={() => setDragging(true)}
                onDragEnd={onDragEnd}
              />
            ))}
        </AnimatePresence>

        <Confetti seed={index} accent={accentHex[cakes[index].accent]} />
      </div>

      {/* how long until the next cake, so the automatic turn is visible
          rather than something that just happens */}
      <div className="absolute -bottom-7 left-1/2 h-[3px] w-40 -translate-x-1/2 overflow-hidden rounded-full bg-ink/12">
        {!reduceMotion && (
          <motion.div
            key={`${index}-${paused}`}
            className="h-full rounded-full"
            style={{ background: accentHex[cakes[index].accent] }}
            initial={{ width: paused ? '100%' : '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: paused ? 0 : HOLD_MS / 1000, ease: 'linear' }}
          />
        )}
      </div>

      <div className="absolute -bottom-[3.1rem] left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {cakes.map((cake, i) => (
          <button
            key={cake.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${cake.name}`}
            aria-current={i === index}
            className={cx(
              'h-2 rounded-full border border-ink transition-all duration-300 ease-[var(--ease-sprung)]',
              i === index ? 'w-6 bg-ink' : 'w-2 bg-paper hover:bg-ink/25',
            )}
          />
        ))}
      </div>

      <span className="absolute -bottom-[4.9rem] left-1/2 -translate-x-1/2 font-hand text-lg whitespace-nowrap text-ink-faint">
        {hasHover ? 'drag a cake away to see the next one' : 'swipe a cake away'}
      </span>
    </div>
  )
}
