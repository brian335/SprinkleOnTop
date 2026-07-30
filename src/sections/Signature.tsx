import { motion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { Button, Eyebrow, Reveal, WhatsAppIcon, accentBg, cx } from '../components/ui'
import { PhotoSlab, usePhotoTexture } from '../three/PhotoSlab'
import { Stage3D } from '../three/Stage'
import { useIsDesktop } from '../lib/hooks'
import { cakeById, signatureCakeIds, whatsappLink, type Cake } from '../lib/site'

/**
 * The photo renders as a lit 3D print inside the shared canvas. The DOM layer
 * beneath is only the coloured stage it floats on.
 */
function PhotoStage({ cake, live }: { cake: Cake; live: boolean }) {
  const texture = usePhotoTexture(cake.image)

  return (
    <div className={cx('relative aspect-[4/5] overflow-hidden border-b-2 border-ink', accentBg[cake.accent])}>
      <div className="absolute inset-0 opacity-45 [background:radial-gradient(circle_at_50%_120%,#fff_0%,transparent_60%)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(var(--color-ink)_1.5px,transparent_1.5px)] [background-size:14px_14px]"
      />

      {live && texture && (
        <Stage3D
          className="pointer-events-none absolute inset-0 z-10"
          distance={6.2}
          elevation={5}
          tilt={0.8}
          spin={0}
          floatIntensity={0.3}
          shadow="contact"
        >
          <PhotoSlab texture={texture} maxWidth={3} maxHeight={3.3} accent={cake.accent} />
        </Stage3D>
      )}
    </div>
  )
}

function Card({ cake, live = true }: { cake: Cake; live?: boolean }) {
  return (
    <a
      href={whatsappLink(`Hi Ragini! I'd like to order the ${cake.name} cake.`)}
      target="_blank"
      rel="noreferrer"
      className="group flex w-[17rem] shrink-0 flex-col overflow-hidden rounded-[1.75rem] border-2 border-ink bg-paper shadow-[6px_6px_0_var(--color-ink)] transition-all duration-300 ease-[var(--ease-sprung)] hover:-translate-y-1.5 hover:shadow-[10px_12px_0_var(--color-ink)] sm:w-[19rem]"
    >
      <PhotoStage cake={cake} live={live} />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold">{cake.name}</h3>
          <span className="font-display text-base font-extrabold whitespace-nowrap">{cake.price}</span>
        </div>
        <p className="text-sm text-ink-soft">{cake.occasion}</p>
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-ink bg-ink px-4 py-1.5 text-xs font-bold text-cream transition-transform duration-300 group-hover:-translate-y-0.5">
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Order this
        </span>
      </div>
    </a>
  )
}

export function Signature() {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const [distance, setDistance] = useState(0)

  const items = signatureCakeIds.map(cakeById)

  // Measure the real overflow rather than guessing a percentage — card widths
  // and viewport both change, and a wrong guess leaves dead scroll at the end.
  useLayoutEffect(() => {
    if (!isDesktop) return
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 64))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isDesktop])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  const header = (compact = false) => (
    <div className="flex flex-col gap-4">
      <Reveal>
        <Eyebrow accent="tangerine">Most asked for</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={
            compact
              ? 'max-w-2xl text-4xl leading-[1.05] font-semibold lg:text-5xl'
              : 'max-w-lg text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl'
          }
        >
          The cakes people keep asking her to repeat
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="max-w-md text-base text-ink-soft">
          Every one can be rebuilt in your colours, your theme and your child&rsquo;s name.
          Tap any of them to start the message.
        </p>
      </Reveal>
      {!compact && (
        <Reveal delay={0.18}>
          <Button href={whatsappLink()} target="_blank" rel="noreferrer" variant="secondary">
            Ask what&rsquo;s possible
          </Button>
        </Reveal>
      )}
    </div>
  )

  if (!isDesktop) {
    return (
      <section id="signature" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {header()}
          <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:-mx-8 sm:px-8">
            {items.map((cake) => (
              <div key={cake.id} className="snap-center">
                <Card cake={cake} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="signature" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-8 overflow-hidden pt-20">
        <div className="mx-auto w-full max-w-6xl px-8">{header(true)}</div>
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pl-8 will-change-transform">
          {items.map((cake) => (
            <Card key={cake.id} cake={cake} />
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="flex w-[19rem] shrink-0 flex-col items-center justify-center gap-4 rounded-[1.75rem] border-2 border-dashed border-ink/40 p-8 text-center transition-colors hover:border-ink hover:bg-paper"
          >
            <span className="font-display text-3xl font-semibold">Something else?</span>
            <p className="text-sm text-ink-soft">
              Most of her cakes are one-offs designed around a theme. Tell her what
              you have in mind.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-5 py-2 text-sm font-bold text-cream">
              <WhatsAppIcon className="h-4 w-4" />
              Start a chat
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
