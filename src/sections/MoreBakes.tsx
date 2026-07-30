import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { TiltCard } from '../components/TiltCard'
import { useImageExists } from '../components/Photo'
import {
  ArrowIcon,
  Button,
  Section,
  SectionHeading,
  StaggerGroup,
  StaggerItem,
  WhatsAppIcon,
  accentBg,
  cx,
} from '../components/ui'
import { Brownie, Bun, Cookie } from '../three/Props'
import { PhotoSlab, usePhotoTexture } from '../three/PhotoSlab'
import { Stage3D } from '../three/Stage'
import { useIsDesktop } from '../lib/hooks'
import { otherBakes, whatsappLink, type OtherBake } from '../lib/site'

const propMap = { bun: Bun, cookie: Cookie, brownie: Brownie } as const

/** Flat things need a lifted camera or you only see their edge. */
const framing = {
  bun: { distance: 4.6, elevation: 20 },
  cookie: { distance: 4.0, elevation: 30 },
  brownie: { distance: 4.6, elevation: 24 },
} as const

function BakeCard({ item }: { item: OtherBake }) {
  const Prop = propMap[item.prop]
  const frame = framing[item.prop]
  const isDesktop = useIsDesktop()
  const ref = useRef<HTMLDivElement>(null)
  const revealed = useInView(ref, { once: true, amount: 0.25 })

  // A real photo takes over the moment the file exists; until then the
  // procedural bake stands in.
  const texture = usePhotoTexture(item.image)
  const hasPhoto = useImageExists(item.image) === true

  return (
    <StaggerItem className="[perspective:1200px]">
      <div ref={ref} className="relative h-full">
        {revealed && (
          <Stage3D
            className="pointer-events-none absolute inset-x-0 top-1 z-10 h-52"
            distance={texture ? 5.4 : frame.distance}
            elevation={texture ? 6 : frame.elevation}
            spin={texture ? 0 : isDesktop ? 0.3 : 0}
            tilt={texture ? 0.85 : 0.45}
            floatIntensity={0.3}
            shadow={texture ? 'contact' : 'fake'}
          >
            {texture ? (
              <PhotoSlab texture={texture} maxWidth={3} maxHeight={2.6} accent={item.accent} />
            ) : (
              <Prop accent={item.accent} />
            )}
          </Stage3D>
        )}

        <TiltCard max={7} lift={20} className="h-full">
          <a
            href={whatsappLink(`Hi Ragini! I'd like to order ${item.name.toLowerCase()}.`)}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-2 border-ink bg-paper shadow-[6px_6px_0_var(--color-ink)] transition-shadow duration-300 hover:shadow-[10px_10px_0_var(--color-ink)]"
          >
            <div className={cx('relative h-52 overflow-hidden border-b-2 border-ink', accentBg[item.accent])}>
              <div className="absolute inset-0 opacity-45 [background:radial-gradient(circle_at_50%_120%,#fff_0%,transparent_60%)]" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(var(--color-ink)_1.5px,transparent_1.5px)] [background-size:14px_14px]"
              />
              {!hasPhoto && (
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-ink/15 bg-paper/80 px-3 py-1 text-[0.65rem] font-bold tracking-wide text-ink-soft uppercase">
                  Photo coming soon
                </span>
              )}
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

/** Everything that isn't a cake, kept off the cake-focused home page. */
export function MoreBakes() {
  return (
    <main className="pt-28 sm:pt-32">
      <Section id="more">
        <SectionHeading
          eyebrow="Beyond cakes"
          accent="mint"
          title="The rest of what comes out of her oven"
          intro="Cakes are the main event, but these three go out most weeks — usually alongside an order, sometimes on their own."
        />

        <StaggerGroup className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
          {otherBakes.map((item) => (
            <BakeCard key={item.id} item={item} />
          ))}
        </StaggerGroup>

        <div className="mt-20 flex flex-col items-center gap-6 rounded-[2rem] border-2 border-dashed border-ink/30 px-6 py-12 text-center">
          <h3 className="max-w-lg text-3xl font-semibold sm:text-4xl">
            Looking for a cake instead?
          </h3>
          <p className="max-w-md text-ink-soft">
            The cakes have a page of their own, with a gallery of everything she has made.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={whatsappLink()} target="_blank" rel="noreferrer">
              <WhatsAppIcon />
              Order on WhatsApp
            </Button>
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-paper px-6 py-3 text-[0.95rem] font-semibold text-ink shadow-[5px_5px_0_var(--color-ink)] transition-[transform,box-shadow] duration-200 ease-[var(--ease-sprung)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[8px_8px_0_var(--color-ink)]"
            >
              See the cakes
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </Section>
    </main>
  )
}
