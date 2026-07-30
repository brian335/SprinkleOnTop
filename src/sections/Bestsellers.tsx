import { motion, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { Button, Eyebrow, Reveal, WhatsAppIcon } from '../components/ui'
import { Photo } from '../components/Photo'
import { useIsDesktop } from '../lib/hooks'
import { bestsellers, whatsappLink, type Bestseller } from '../lib/site'

function PhotoSlot({ item }: { item: Bestseller }) {
  return (
    <Photo
      src={item.image}
      alt={item.alt}
      accent={item.accent}
      fallbackLabel={item.name.charAt(0)}
      className="aspect-[4/3] border-b-2 border-ink"
      imgClassName="transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.06]"
    >
      {item.badge && (
        <span className="absolute top-3 left-3 rounded-full border-2 border-ink bg-paper px-3 py-1 text-[0.7rem] font-extrabold tracking-wide uppercase">
          {item.badge}
        </span>
      )}
    </Photo>
  )
}

function Card({ item }: { item: Bestseller }) {
  return (
    <a
      href={whatsappLink(`Hi Ragini! I'd like to order the ${item.name}.`)}
      target="_blank"
      rel="noreferrer"
      className="group flex w-[19rem] shrink-0 flex-col overflow-hidden rounded-[1.75rem] border-2 border-ink bg-paper shadow-[6px_6px_0_var(--color-ink)] transition-all duration-300 ease-[var(--ease-sprung)] hover:-translate-y-1.5 hover:shadow-[10px_12px_0_var(--color-ink)] sm:w-[22rem]"
    >
      <PhotoSlot item={item} />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <span className="font-display text-lg font-extrabold whitespace-nowrap">{item.price}</span>
        </div>
        <p className="text-sm text-ink-soft">{item.note}</p>
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-ink bg-ink px-4 py-1.5 text-xs font-bold text-cream transition-transform duration-300 group-hover:-translate-y-0.5">
          <WhatsAppIcon className="h-3.5 w-3.5" />
          Order this
        </span>
      </div>
    </a>
  )
}

export function Bestsellers() {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const [distance, setDistance] = useState(0)

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
        <Eyebrow accent="tangerine">Bestsellers</Eyebrow>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          className={
            compact
              ? 'max-w-2xl text-4xl leading-[1.05] font-semibold lg:text-5xl'
              : 'max-w-lg text-4xl leading-[1.05] font-semibold sm:text-5xl lg:text-6xl'
          }
        >
          The ones people come back for
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="max-w-md text-base text-ink-soft">
          Reordered more than anything else on the menu. Tap any of them to send Ragini
          a message with the item already filled in.
        </p>
      </Reveal>
      {!compact && (
        <Reveal delay={0.18}>
          <Button href={whatsappLink()} target="_blank" rel="noreferrer" variant="secondary">
            Ask what&rsquo;s baking today
          </Button>
        </Reveal>
      )}
    </div>
  )

  if (!isDesktop) {
    return (
      <section id="bestsellers" className="px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          {header()}
          <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:-mx-8 sm:px-8">
            {bestsellers.map((item) => (
              <div key={item.id} className="snap-center">
                <Card item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="bestsellers" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden pt-20">
        <div className="mx-auto w-full max-w-6xl px-8">{header(true)}</div>
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 pl-8 will-change-transform">
          {bestsellers.map((item) => (
            <Card key={item.id} item={item} />
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="flex w-[22rem] shrink-0 flex-col items-center justify-center gap-4 rounded-[1.75rem] border-2 border-dashed border-ink/40 p-8 text-center transition-colors hover:border-ink hover:bg-paper"
          >
            <span className="font-display text-3xl font-semibold">Something else?</span>
            <p className="text-sm text-ink-soft">
              Half of what she bakes never makes it onto a menu. Tell her what you have in mind.
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
