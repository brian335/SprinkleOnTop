import { useMemo } from 'react'
import { accentHex } from '../lib/site'
import { cx } from './ui'

const palette = Object.values(accentHex)

/** Deterministic pseudo random, so the field never reshuffles between renders. */
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

type Bit = {
  left: number
  width: number
  height: number
  color: string
  duration: number
  delay: number
  opacity: number
  /** which of the four drift paths this one takes */
  path: number
}

function build(count: number, seed: number, big: boolean): Bit[] {
  const rand = rng(seed)
  return Array.from({ length: count }, () => {
    const round = rand() > 0.72
    const scale = big ? 1.5 : 1
    const w = (round ? 5 + rand() * 3 : 3.5 + rand() * 2) * scale
    return {
      left: rand() * 100,
      width: w,
      height: round ? w : w * (2.4 + rand() * 1.4),
      color: palette[Math.floor(rand() * palette.length)],
      duration: (big ? 15 : 11) + rand() * 9,
      delay: -rand() * 26,
      opacity: big ? 0.8 : 0.5 + rand() * 0.35,
      path: Math.floor(rand() * 4),
    }
  })
}

/**
 * Sprinkles falling through the section, which the name rather demands.
 *
 * One element per sprinkle, one animation each. Fall, drift and tumble are all
 * baked into a single keyframe track rather than nested on three elements,
 * because every animated element is a compositor layer and layers are the thing
 * that actually costs on a phone.
 */
export function SprinkleField({
  count = 22,
  seed = 7,
  layer = 'back',
  className,
}: {
  count?: number
  seed?: number
  layer?: 'back' | 'front'
  className?: string
}) {
  const big = layer === 'front'
  const bits = useMemo(() => build(count, seed, big), [count, seed, big])

  return (
    <div
      aria-hidden
      className={cx('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {bits.map((b, i) => (
        <span
          key={i}
          className="sot-sprinkle absolute top-0 block"
          style={{
            left: `${b.left}%`,
            width: `${b.width}px`,
            height: `${b.height}px`,
            borderRadius: '99px',
            background: b.color,
            opacity: b.opacity,
            animationName: `sot-sprinkle-${b.path}`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      <style>{`
        .sot-sprinkle {
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        /* Four hand written paths. Fall, sway and tumble live in one track so a
           sprinkle is a single element and a single layer. */
        @keyframes sot-sprinkle-0 {
          0%   { transform: translate3d(-12px, -15vh, 0) rotate(0deg); }
          25%  { transform: translate3d(10px, 17vh, 0) rotate(140deg); }
          50%  { transform: translate3d(-8px, 48vh, 0) rotate(280deg); }
          75%  { transform: translate3d(12px, 80vh, 0) rotate(430deg); }
          100% { transform: translate3d(-6px, 115vh, 0) rotate(560deg); }
        }
        @keyframes sot-sprinkle-1 {
          0%   { transform: translate3d(9px, -15vh, 0) rotate(40deg); }
          30%  { transform: translate3d(-11px, 24vh, 0) rotate(-90deg); }
          60%  { transform: translate3d(7px, 60vh, 0) rotate(-230deg); }
          100% { transform: translate3d(-9px, 115vh, 0) rotate(-420deg); }
        }
        @keyframes sot-sprinkle-2 {
          0%   { transform: translate3d(0, -15vh, 0) rotate(0deg); }
          40%  { transform: translate3d(14px, 33vh, 0) rotate(200deg); }
          80%  { transform: translate3d(-13px, 86vh, 0) rotate(390deg); }
          100% { transform: translate3d(-4px, 115vh, 0) rotate(480deg); }
        }
        @keyframes sot-sprinkle-3 {
          0%   { transform: translate3d(6px, -15vh, 0) rotate(-20deg); }
          50%  { transform: translate3d(-10px, 45vh, 0) rotate(-180deg); }
          100% { transform: translate3d(8px, 115vh, 0) rotate(-380deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sot-sprinkle { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </div>
  )
}
