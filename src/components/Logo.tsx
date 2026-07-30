import { cx } from './ui'

/**
 * Stand-in for the printed sticker logo, drawn as SVG so it stays crisp and
 * can animate. Swap in the real artwork by dropping `logo.png` into /public
 * and pointing <LogoMark> at it — the layout does not change.
 */
export function LogoMark({ className, animated = true }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={cx('shrink-0', className)} role="img" aria-label="Sprinkle On Top">
      <circle cx="50" cy="50" r="47" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="var(--color-ink)" strokeWidth="1" strokeDasharray="3 5" opacity="0.35" />

      {/* candle */}
      <rect x="48.4" y="24" width="3.2" height="9" rx="1.2" fill="var(--color-sky)" />
      <path d="M50 18c2.6 2.2 3.4 3.9 3.4 5.4a3.4 3.4 0 0 1-6.8 0c0-1.5.8-3.2 3.4-5.4Z" fill="var(--color-butter)">
        {animated && (
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1 1;1 1.14;1 1"
            additive="sum"
            dur="1.4s"
            repeatCount="indefinite"
          />
        )}
      </path>

      {/* cake — two tiers on a plate, scaled to fill the sticker */}
      <path d="M32 38h36v12H32z" fill="var(--color-berry)" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M26 50h48v18H26z" fill="var(--color-butter)" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M26 50c3.5 3.5 7 3.5 10.5 0s7-3.5 10.5 0 7 3.5 10.5 0 7-3.5 10.5 0" fill="none" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 68h60" stroke="var(--color-ink)" strokeWidth="3" strokeLinecap="round" />

      {/* sprinkles */}
      <g strokeWidth="2.6" strokeLinecap="round">
        <path d="M17 36l4-4" stroke="var(--color-mint)" />
        <path d="M79 34l4 4" stroke="var(--color-grape)" />
        <path d="M15 58l5 1.5" stroke="var(--color-tangerine)" />
        <path d="M85 56l-5 2" stroke="var(--color-sky)" />
        <path d="M23 78l3.5-3" stroke="var(--color-berry)" />
        <path d="M77 78l-3.5-3" stroke="var(--color-butter)" />
      </g>
    </svg>
  )
}

export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cx('flex flex-col leading-none whitespace-nowrap', className)}>
      <span className="font-display text-[1.05rem] font-extrabold tracking-tight sm:text-[1.2rem]">
        Sprinkle <span className="text-berry">On Top</span>
      </span>
      {!compact && (
        <span className="font-hand text-sm text-ink-soft">by Ragini Saraf</span>
      )}
    </span>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#top" className={cx('group flex items-center gap-2.5', className)} aria-label="Sprinkle On Top — home">
      <LogoMark className="h-11 w-11 transition-transform duration-500 ease-[var(--ease-sprung)] group-hover:rotate-[-8deg] group-hover:scale-105" />
      <Wordmark />
    </a>
  )
}
