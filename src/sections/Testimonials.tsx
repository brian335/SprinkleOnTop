import { Marquee } from '../components/Marquee'
import { Eyebrow, Reveal, accentBg, cx } from '../components/ui'
import { testimonials } from '../lib/site'

function Quote({ t, i }: { t: (typeof testimonials)[number]; i: number }) {
  return (
    <figure
      className={cx(
        'flex w-[19rem] shrink-0 flex-col gap-4 rounded-[1.75rem] border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-ink)] sm:w-[23rem]',
        i % 2 ? 'rotate-[0.9deg]' : '-rotate-[0.9deg]',
      )}
    >
      <span className="text-butter" aria-label="5 out of 5 stars">
        ★★★★★
      </span>
      <blockquote className="text-[0.98rem] leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-2">
        <span
          className={cx(
            'flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink font-display font-extrabold',
            accentBg[t.accent],
          )}
        >
          {t.name.charAt(0)}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold">{t.name}</span>
          <span className="block text-xs text-ink-soft">{t.detail}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto mb-12 flex max-w-6xl flex-col items-center gap-5 px-5 text-center sm:px-8">
        <Reveal>
          <Eyebrow accent="butter">Kind words</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="max-w-2xl text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl">
            People keep sending photos back
          </h2>
        </Reveal>
      </div>

      {/* two rows drifting opposite ways reads livelier than one long strip */}
      <div className="flex flex-col gap-6">
        <Marquee speed={52} gap="gap-6">
          {testimonials.map((t, i) => (
            <Quote key={t.name} t={t} i={i} />
          ))}
        </Marquee>
        <Marquee speed={62} reverse gap="gap-6">
          {[...testimonials].reverse().map((t, i) => (
            <Quote key={t.name} t={t} i={i + 1} />
          ))}
        </Marquee>
      </div>

      {/* fade the strip into the page edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent sm:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent sm:w-32"
      />
    </section>
  )
}
