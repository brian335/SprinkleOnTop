import { motion, useScroll, useTransform } from 'framer-motion'
import { Suspense, lazy, useRef } from 'react'
import { Button, Highlight, WhatsAppIcon, ArrowIcon, cx } from '../components/ui'
import { soft } from '../lib/motion'
import { cakeById, site, whatsappLink } from '../lib/site'

const CarouselStage = lazy(() => import('../three/stages/CarouselStage'))
import { useIsDesktop } from '../lib/hooks'

const headline = ['A', 'cake', 'they', 'talk', 'about']

function FloatingBadge({
  children,
  className,
  delay = 0,
  drift = 12,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  drift?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.7, ease: soft, delay }}
      className={cx('pointer-events-none absolute z-40', className)}
    >
      <motion.div
        animate={{ y: [0, -drift, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }}
        className="rounded-full border-2 border-ink bg-paper px-4 py-2 text-xs font-bold whitespace-nowrap sticker-sm sm:text-sm"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // shown until the 3D chunk arrives, so the hero is never an empty box
  const poster = cakeById('safari-tiered')
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-[26rem] w-[26rem] rounded-full bg-berry/25 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-mint/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-butter/25 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: soft, delay: 0.25 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-1.5 font-hand text-lg leading-none font-bold sticker-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            custom cakes in {site.city}
          </motion.span>

          <h1 className="mt-6 text-[2.75rem] leading-[0.98] font-semibold sm:text-6xl lg:text-[4.2rem]">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.75, ease: soft, delay: 0.35 + i * 0.07 }}
                className="mr-[0.25em] inline-block"
              >
                {word === 'talk' ? <Highlight accent="butter">talk</Highlight> : word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: soft, delay: 0.35 + headline.length * 0.07 }}
              className="inline-block font-hand text-[1.1em] text-berry"
            >
              for years
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: soft, delay: 0.75 }}
            className="mt-6 max-w-lg text-base text-ink-soft sm:text-lg"
          >
            Every cake is designed around your theme and baked to order in{' '}
            {site.owner.split(' ')[0]}&rsquo;s home kitchen. Always eggless, real butter,
            no preservatives.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: soft, delay: 0.88 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href={whatsappLink()} target="_blank" rel="noreferrer" size="lg">
              <WhatsAppIcon className="h-5 w-5" />
              Order a cake
            </Button>
            <Button href="#gallery" variant="secondary" size="lg">
              See her cakes
              <ArrowIcon />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-ink-soft"
          >
            <span className="flex items-center gap-2">
              <span className="text-butter">★★★★★</span> loved by 2,400+ orders
            </span>
            <span className="hidden h-4 w-px bg-ink/15 sm:block" />
            <span>order 48 hours ahead</span>
          </motion.div>
        </motion.div>

        {/* the whole collection, drifting past and steered by the cursor */}
        <div className="relative h-[24rem] sm:h-[28rem] lg:h-[36rem]">
          <Suspense
            fallback={
              <img
                src={poster.image}
                alt={poster.alt}
                className="absolute inset-0 m-auto max-h-full w-auto rounded-[1.25rem] border-2 border-ink object-contain shadow-[6px_6px_0_var(--color-ink)]"
              />
            }
          >
            <CarouselStage compact={!isDesktop} />
          </Suspense>

          <FloatingBadge className="top-0 left-0 sm:top-4" delay={1.2}>
            🎂 any theme you like
          </FloatingBadge>
          <FloatingBadge className="top-1/3 right-0" delay={1.4} drift={16}>
            🥚 always 100% eggless
          </FloatingBadge>
          <FloatingBadge className="bottom-4 left-2 sm:bottom-10" delay={1.6} drift={10}>
            🧈 baked fresh today
          </FloatingBadge>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="pointer-events-none absolute inset-x-0 -bottom-2 text-center font-hand text-lg text-ink-faint"
          >
            move your mouse to slide through them
          </motion.span>
        </div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 font-hand text-lg text-ink-faint"
        >
          scroll
          <span className="h-8 w-[2px] rounded-full bg-gradient-to-b from-ink/40 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  )
}
