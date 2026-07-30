import { motion, useInView } from 'framer-motion'
import {
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { riseIn, soft, stagger, viewportOnce } from '../lib/motion'
import type { AccentName } from '../lib/site'

export const accentBg: Record<AccentName, string> = {
  berry: 'bg-berry',
  butter: 'bg-butter',
  mint: 'bg-mint',
  grape: 'bg-grape',
  tangerine: 'bg-tangerine',
  sky: 'bg-sky',
}

export const accentText: Record<AccentName, string> = {
  berry: 'text-berry',
  butter: 'text-butter',
  mint: 'text-mint',
  grape: 'text-grape',
  tangerine: 'text-tangerine',
  sky: 'text-sky',
}

export const accentShadow: Record<AccentName, string> = {
  berry: 'shadow-[5px_5px_0_var(--color-berry)]',
  butter: 'shadow-[5px_5px_0_var(--color-butter)]',
  mint: 'shadow-[5px_5px_0_var(--color-mint)]',
  grape: 'shadow-[5px_5px_0_var(--color-grape)]',
  tangerine: 'shadow-[5px_5px_0_var(--color-tangerine)]',
  sky: 'shadow-[5px_5px_0_var(--color-sky)]',
}

const cx = (...parts: (string | false | undefined | null)[]) => parts.filter(Boolean).join(' ')

/* -------------------------------------------------------------------------- */

type ButtonProps = {
  /** `onDark` / `onDarkGhost` are for the ink-coloured panels. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'onDark' | 'onDarkGhost'
  size?: 'md' | 'lg'
  children: ReactNode
} & ComponentPropsWithoutRef<'a'>

/**
 * Die-cut pill. On hover it lifts toward the cursor and the ink shadow
 * deepens — the same physical language as a sticker peeling off the sheet.
 */
export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold ' +
    'transition-[transform,box-shadow] duration-200 ease-[var(--ease-sprung)] ' +
    'hover:-translate-x-[3px] hover:-translate-y-[3px] active:translate-x-0 active:translate-y-0'

  const sizes = { md: 'px-6 py-3 text-[0.95rem]', lg: 'px-8 py-4 text-base md:text-lg' }

  const variants = {
    primary:
      'bg-ink text-cream border-2 border-ink shadow-[5px_5px_0_var(--color-berry)] ' +
      'hover:shadow-[8px_8px_0_var(--color-berry)] active:shadow-[3px_3px_0_var(--color-berry)]',
    secondary:
      'bg-paper text-ink border-2 border-ink shadow-[5px_5px_0_var(--color-ink)] ' +
      'hover:shadow-[8px_8px_0_var(--color-ink)] active:shadow-[3px_3px_0_var(--color-ink)]',
    ghost: 'text-ink border-2 border-transparent hover:border-ink hover:shadow-[5px_5px_0_var(--color-ink)]',
    onDark:
      'bg-cream text-ink border-2 border-cream shadow-[5px_5px_0_var(--color-berry)] ' +
      'hover:shadow-[8px_8px_0_var(--color-berry)] active:shadow-[3px_3px_0_var(--color-berry)]',
    onDarkGhost:
      'text-cream border-2 border-cream/35 hover:border-cream hover:shadow-[5px_5px_0_var(--color-cream)]',
  }

  return (
    <a className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </a>
  )
}

export function WhatsAppIcon({ className = 'h-[1.15em] w-[1.15em]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  )
}

export function InstagramIcon({ className = 'h-[1.15em] w-[1.15em]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: soft, delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerGroup({
  children,
  className,
  gap = 0.09,
}: {
  children: ReactNode
  className?: string
  gap?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      // `some`, not a fraction: these wrap tall grids that stack on mobile,
      // and a fractional threshold can exceed the viewport so the whole group
      // never reveals.
      viewport={{ once: true, amount: 'some' }}
      variants={stagger(gap)}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div className={className} variants={riseIn}>
    {children}
  </motion.div>
)

/* -------------------------------------------------------------------------- */

export function Eyebrow({ children, accent = 'berry' }: { children: ReactNode; accent?: AccentName }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-1.5 font-hand text-lg leading-none font-bold sticker-sm">
      <span className={cx('h-2 w-2 rounded-full', accentBg[accent])} />
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  accent = 'berry',
  align = 'center',
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  accent?: AccentName
  align?: 'center' | 'left'
}) {
  return (
    <div className={cx('flex flex-col gap-5', align === 'center' ? 'items-center text-center' : 'items-start')}>
      {eyebrow && (
        <Reveal>
          <Eyebrow accent={accent}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2 className="max-w-3xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className={cx('max-w-xl text-base text-ink-soft sm:text-lg', align === 'center' && 'mx-auto')}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/** Highlighter swipe behind a word — draws itself when scrolled into view. */
export function Highlight({ children, accent = 'butter' }: { children: ReactNode; accent?: AccentName }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  return (
    <span ref={ref} className="relative inline-block">
      <motion.span
        aria-hidden
        className={cx('absolute inset-x-[-0.12em] bottom-[0.08em] -z-10 h-[0.42em] origin-left rounded-full', accentBg[accent])}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, ease: soft, delay: 0.25 }}
      />
      {children}
    </span>
  )
}

/* -------------------------------------------------------------------------- */

export function Section({
  id,
  children,
  className,
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cx('relative px-5 py-20 sm:px-8 md:py-28 lg:py-32', className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

/** Hand-drawn wobble line used to break sections apart. */
export function Squiggle({ className, color = 'var(--color-berry)' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className={cx('h-8 w-full', className)} aria-hidden>
      <path
        d="M0 22 C 50 2, 100 42, 150 22 S 250 2, 300 22 S 400 42, 450 22 S 550 2, 600 22 S 700 42, 750 22 S 850 2, 900 22 S 1000 42, 1050 22 S 1150 2, 1200 22"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export { cx }
