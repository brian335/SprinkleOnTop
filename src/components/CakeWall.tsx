import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { cakes, thumbOf, type Cake } from '../lib/site'
import { cx } from './ui'

/**
 * Deal the cakes into vertical columns, round robin, so neighbouring columns
 * never show the same cake side by side.
 */
function deal(count: number): Cake[][] {
  const columns: Cake[][] = Array.from({ length: count }, () => [])
  cakes.forEach((cake, i) => columns[i % count].push(cake))
  // a short column would loop visibly faster than a tall one, so top them up
  const longest = Math.max(...columns.map((c) => c.length))
  return columns.map((col) => {
    const filled = [...col]
    let i = 0
    while (filled.length < longest) filled.push(col[i++ % col.length])
    return filled
  })
}

function Card({ cake }: { cake: Cake }) {
  return (
    <a
      href="#gallery"
      className="group/card relative mb-4 block overflow-hidden rounded-[1.25rem] border-2 border-ink shadow-[4px_4px_0_var(--color-ink)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-sprung)] hover:-translate-y-1 hover:shadow-[7px_7px_0_var(--color-ink)]"
      tabIndex={-1}
      aria-hidden
    >
      <img
        src={thumbOf(cake.image)}
        alt=""
        loading="eager"
        decoding="async"
        className="block w-full transition-transform duration-700 ease-[var(--ease-soft)] group-hover/card:scale-105"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-ink/85 to-transparent p-3 pt-8 font-hand text-base text-cream opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
        {cake.name}
      </span>
    </a>
  )
}

/**
 * A wall of every cake she has made, drifting quietly in alternating
 * directions. Pure DOM: no WebGL, so it costs nothing on load and stays smooth
 * on phones.
 *
 * Each column runs its own CSS loop, and the pointer adds a parallax push on
 * top so the whole wall leans and slides as you move across it.
 */
export function CakeWall({ columns = 5 }: { columns?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 60, damping: 20, mass: 0.7 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)

  const rotateY = useTransform(sx, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateX = useTransform(sy, [-0.5, 0.5], ['-3.5deg', '3.5deg'])
  const shiftX = useTransform(sx, [-0.5, 0.5], ['2.5%', '-2.5%'])

  const decks = useMemo(() => deal(columns), [columns])

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="absolute inset-0 overflow-hidden [perspective:1400px]"
      aria-hidden
    >
      <motion.div
        style={{ rotateX, rotateY, x: shiftX, transformStyle: 'preserve-3d' }}
        className="absolute -inset-x-[8%] -inset-y-[14%] flex gap-4 will-change-transform"
      >
        {decks.map((deck, col) => {
          const up = col % 2 === 0
          // neighbouring columns run at different speeds so the wall never
          // falls into a marching lockstep
          const duration = 46 + col * 7
          const depth = (col - (columns - 1) / 2) / columns

          return (
            <ColumnTrack
              key={col}
              deck={deck}
              up={up}
              duration={duration}
              depth={depth}
              parallax={sy}
            />
          )
        })}
      </motion.div>

      <style>{`
        @keyframes sot-wall-up   { from { transform: translate3d(0,0,0); }      to { transform: translate3d(0,-50%,0); } }
        @keyframes sot-wall-down { from { transform: translate3d(0,-50%,0); }   to { transform: translate3d(0,0,0); } }
        @media (prefers-reduced-motion: reduce) {
          .sot-wall-track { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

function ColumnTrack({
  deck,
  up,
  duration,
  depth,
  parallax,
}: {
  deck: Cake[]
  up: boolean
  duration: number
  depth: number
  parallax: ReturnType<typeof useSpring>
}) {
  // columns further from the centre travel further under the pointer
  const y = useTransform(parallax, [-0.5, 0.5], [`${-110 * (1 + Math.abs(depth) * 2)}px`, `${110 * (1 + Math.abs(depth) * 2)}px`])

  return (
    <motion.div style={{ y }} className="flex-1 will-change-transform">
      <div
        className={cx('sot-wall-track')}
        style={{
          animation: `${up ? 'sot-wall-up' : 'sot-wall-down'} ${duration}s linear infinite`,
        }}
      >
        {/* the deck twice over, so translating by half the track loops cleanly */}
        {deck.map((cake, i) => (
          <Card key={`a-${cake.id}-${i}`} cake={cake} />
        ))}
        {deck.map((cake, i) => (
          <Card key={`b-${cake.id}-${i}`} cake={cake} />
        ))}
      </div>
    </motion.div>
  )
}
