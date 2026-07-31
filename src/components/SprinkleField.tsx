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
  size: number
  length: number
  round: boolean
  color: string
  fall: number
  delay: number
  sway: number
  spin: number
  opacity: number
  blur: number
}

function build(count: number, seed: number, big: boolean): Bit[] {
  const rand = rng(seed)
  return Array.from({ length: count }, () => {
    const round = rand() > 0.72
    const scale = big ? 1.5 : 1
    const size = (round ? 5 + rand() * 3 : 3.5 + rand() * 2) * scale
    return {
      left: rand() * 100,
      size,
      length: round ? size : size * (2.4 + rand() * 1.4),
      round,
      color: palette[Math.floor(rand() * palette.length)],
      // slower for the big ones in front, so the field reads as depth
      fall: (big ? 15 : 11) + rand() * 9,
      delay: -rand() * 26,
      sway: 4 + rand() * 5,
      spin: 3 + rand() * 6,
      opacity: big ? 0.75 + rand() * 0.25 : 0.45 + rand() * 0.4,
      blur: big && rand() > 0.6 ? 1.2 : 0,
    }
  })
}

/**
 * Sprinkles falling through the section, which is only fair given the name.
 *
 * Pure CSS keyframes on transform and opacity, so the browser can run the whole
 * field on the compositor and it costs nothing on the main thread. Two layers
 * are used in the hero: a fine one behind the content and a few larger, slower
 * ones in front, which is what gives the section depth.
 */
export function SprinkleField({
  count = 26,
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
          className="absolute top-0 will-change-transform"
          style={{
            left: `${b.left}%`,
            animation: `sot-sprinkle-fall ${b.fall}s linear ${b.delay}s infinite`,
          }}
        >
          <span
            className="block will-change-transform"
            style={{ animation: `sot-sprinkle-sway ${b.sway}s ease-in-out ${b.delay}s infinite` }}
          >
            <span
              className="block"
              style={{
                width: `${b.size}px`,
                height: `${b.length}px`,
                borderRadius: '99px',
                background: b.color,
                opacity: b.opacity,
                filter: b.blur ? `blur(${b.blur}px)` : undefined,
                animation: `sot-sprinkle-spin ${b.spin}s linear ${b.delay}s infinite`,
              }}
            />
          </span>
        </span>
      ))}

      <style>{`
        @keyframes sot-sprinkle-fall {
          0%   { transform: translate3d(0, -15vh, 0); }
          100% { transform: translate3d(0, 115vh, 0); }
        }
        @keyframes sot-sprinkle-sway {
          0%, 100% { transform: translate3d(-13px, 0, 0); }
          50%      { transform: translate3d(13px, 0, 0); }
        }
        @keyframes sot-sprinkle-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="sot-sprinkle"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
