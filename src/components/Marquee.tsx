import type { ReactNode } from 'react'
import { cx } from './ui'

/**
 * Infinite ticker. The track holds two identical copies and translates by
 * exactly -50%, so the seam never shows.
 */
export function Marquee({
  children,
  speed = 30,
  reverse = false,
  className,
  gap = 'gap-10',
}: {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  gap?: string
}) {
  return (
    <div className={cx('group relative flex overflow-hidden', className)}>
      <div
        className={cx('flex w-max shrink-0 items-center will-change-transform', gap, 'pr-10')}
        style={{
          animation: `sot-marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div className={cx('flex shrink-0 items-center', gap, 'pr-10')}>{children}</div>
        <div className={cx('flex shrink-0 items-center', gap, 'pr-10')} aria-hidden>
          {children}
        </div>
      </div>
      <style>{`
        @keyframes sot-marquee {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="sot-marquee"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
