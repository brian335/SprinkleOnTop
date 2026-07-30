import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TiltCard } from '../components/TiltCard'
import {
  ArrowIcon,
  Section,
  SectionHeading,
  StaggerGroup,
  StaggerItem,
  accentBg,
  cx,
} from '../components/ui'
import { propMap } from '../three/Props'
import { Stage3D } from '../three/Stage'
import { useIsDesktop } from '../lib/hooks'
import { categories, whatsappLink, type Category } from '../lib/site'

/**
 * Tall props read best near eye level; flat ones need the camera lifted or you
 * see nothing but their edge.
 */
const framing: Record<Category['prop'], { distance: number; elevation: number }> = {
  cake: { distance: 6.2, elevation: 12 },
  cupcake: { distance: 4.0, elevation: 12 },
  bun: { distance: 4.6, elevation: 20 },
  cookie: { distance: 4.0, elevation: 30 },
  healthy: { distance: 4.0, elevation: 30 },
  donut: { distance: 4.0, elevation: 30 },
}

function CategoryCard({ item, index }: { item: Category; index: number }) {
  const Prop = propMap[item.prop]
  const isDesktop = useIsDesktop()
  const frame = framing[item.prop]
  const ref = useRef<HTMLDivElement>(null)
  // The 3D draws into a fixed canvas, so it ignores the card's fade-in. Hold
  // it back until the card has actually been revealed or it floats over blank
  // page while the card is still invisible.
  const revealed = useInView(ref, { once: true, amount: 0.25 })

  return (
    <StaggerItem className="[perspective:1200px]">
      <div ref={ref} className="relative h-full">
        {/* The prop sits in its own untilted layer so the tracked viewport
            stays rock steady while the card underneath pitches. */}
        {revealed && (
        <Stage3D
          className="pointer-events-none absolute inset-x-0 top-1 z-10 h-48"
          distance={frame.distance}
          elevation={frame.elevation}
          spin={isDesktop ? 0.3 : 0}
          tilt={0.45}
          floatIntensity={0.35}
        >
          <Prop accent={item.accent} />
        </Stage3D>
        )}

        <TiltCard max={7} lift={20} className="h-full">
          <a
            href={whatsappLink(`Hi Ragini! I'd like to know more about your ${item.name.toLowerCase()}.`)}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-[6px_6px_0_var(--color-ink)] transition-shadow duration-300 hover:shadow-[10px_10px_0_var(--color-ink)]"
          >
            {/* tinted window the prop floats inside */}
            <div className={cx('relative h-48 overflow-hidden border-b-2 border-ink', accentBg[item.accent])}>
              <div className="absolute inset-0 opacity-45 [background:radial-gradient(circle_at_50%_120%,#fff_0%,transparent_60%)]" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(var(--color-ink)_1.5px,transparent_1.5px)] [background-size:14px_14px]"
              />
              <span className="absolute top-3 right-3 rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-extrabold">
                from {item.priceFrom}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-2xl font-semibold">{item.name}</h3>
              <p className="text-[0.95rem] text-ink-soft">{item.blurb}</p>

              <div className="mt-1 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/15 bg-cream px-2.5 py-1 text-[0.7rem] font-bold tracking-wide text-ink-soft uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* detail unfurls on hover, keeping the resting card calm */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-soft)] group-hover:grid-rows-[1fr]">
                <p className="overflow-hidden text-sm text-ink-soft">
                  <span className="block pt-1">{item.detail}</span>
                </p>
              </div>

              <span className="mt-auto flex items-center gap-2 pt-3 text-sm font-extrabold">
                Ask about this
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </div>
          </a>
        </TiltCard>

        {/* numbered sticker tab */}
        <motion.span
          aria-hidden
          className={cx(
            'absolute -top-3 -left-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink font-display text-sm font-extrabold',
            accentBg[item.accent],
          )}
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 + index * 0.05 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </div>
    </StaggerItem>
  )
}

export function Categories() {
  return (
    <Section id="menu">
      <SectionHeading
        eyebrow="The menu"
        title={
          <>
            Six things she makes,
            <br />
            all of them properly
          </>
        }
        intro="No frozen shortcuts and no giant production line — just a home oven running most days of the week."
      />

      <StaggerGroup className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
        {categories.map((item, i) => (
          <CategoryCard key={item.id} item={item} index={i} />
        ))}
      </StaggerGroup>
    </Section>
  )
}
