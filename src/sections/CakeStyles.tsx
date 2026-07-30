import { useInView } from 'framer-motion'
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
import { PhotoSlab, usePhotoTexture } from '../three/PhotoSlab'
import { Stage3D } from '../three/Stage'
import { cakeById, cakeStyles, whatsappLink, type CakeStyle } from '../lib/site'

function StyleCard({ item }: { item: CakeStyle }) {
  const cake = cakeById(item.cakeId)
  const ref = useRef<HTMLDivElement>(null)
  // The 3D draws into a fixed canvas and so ignores the card's fade-in — hold
  // it back until the card has actually been revealed.
  const revealed = useInView(ref, { once: true, amount: 0.25 })
  const texture = usePhotoTexture(cake.image)

  return (
    <StaggerItem className="[perspective:1400px]">
      <div ref={ref} className="relative h-full">
        {revealed && texture && (
          <Stage3D
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[19rem]"
            distance={6.1}
            elevation={5}
            tilt={0.9}
            spin={0}
            floatIntensity={0.3}
            shadow="contact"
          >
            <PhotoSlab
              texture={texture}
              maxWidth={3.9}
              maxHeight={3.25}
              accent={item.accent}
            />
          </Stage3D>
        )}

        <TiltCard max={6} lift={20} className="h-full">
          <a
            href={whatsappLink(`Hi Ragini! I'd like to ask about your ${item.name.toLowerCase()}.`)}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-[6px_6px_0_var(--color-ink)] transition-shadow duration-300 hover:shadow-[12px_12px_0_var(--color-ink)]"
          >
            {/* Tinted stage the print floats inside. The photograph itself is
                lit geometry in the canvas above, not an <img> here. */}
            <div className={cx('relative h-[19rem] overflow-hidden border-b-2 border-ink', accentBg[item.accent])}>
              <div className="absolute inset-0 opacity-45 [background:radial-gradient(circle_at_50%_120%,#fff_0%,transparent_60%)]" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(var(--color-ink)_1.5px,transparent_1.5px)] [background-size:14px_14px]"
              />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-2xl font-semibold">{item.name}</h3>
                <span className="font-display text-sm font-extrabold whitespace-nowrap text-ink-soft">
                  from {item.priceFrom}
                </span>
              </div>

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
      </div>
    </StaggerItem>
  )
}

export function CakeStyles() {
  return (
    <Section id="cakes">
      <SectionHeading
        eyebrow="What she makes"
        title={
          <>
            Four kinds of cake,
            <br />
            all of them to order
          </>
        }
        intro="Every cake on this page came out of the same home oven. Pick the closest thing to what you want and she will take it from there."
      />

      <StaggerGroup className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2" gap={0.1}>
        {cakeStyles.map((item) => (
          <StyleCard key={item.id} item={item} />
        ))}
      </StaggerGroup>
    </Section>
  )
}
