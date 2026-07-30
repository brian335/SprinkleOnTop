import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button, Highlight, WhatsAppIcon, ArrowIcon, cx } from '../components/ui'
import { Cake } from '../three/Props'
import { Sprinkles } from '../three/Sprinkles'
import { Stage3D } from '../three/Stage'
import { soft } from '../lib/motion'
import { site, whatsappLink } from '../lib/site'
import { useIsDesktop } from '../lib/hooks'

const headline = ['Every', 'celebration', 'deserves', 'a']

/** Small die-cut badges that hover around the cake. */
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
  const textY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36">
      {/* soft blobs behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-[26rem] w-[26rem] rounded-full bg-berry/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-mint/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-butter/20 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* ---------------------------------------------------------------- */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: soft, delay: 0.25 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-1.5 text-xs font-bold tracking-[0.16em] uppercase sticker-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Home bakery · {site.city}
          </motion.span>

          <h1 className="mt-6 text-[2.75rem] leading-[0.98] font-semibold sm:text-6xl lg:text-[4.4rem]">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.75, ease: soft, delay: 0.35 + i * 0.07 }}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: soft, delay: 0.35 + headline.length * 0.07 }}
              className="inline-block"
            >
              <Highlight accent="butter">sprinkle</Highlight>{' '}
              <span className="font-hand text-[1.15em] text-berry">on top</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: soft, delay: 0.75 }}
            className="mt-6 max-w-lg text-base text-ink-soft sm:text-lg"
          >
            Cakes, cupcakes, Korean cream buns and cookies — baked to order in{' '}
            {site.owner.split(' ')[0]}&rsquo;s home kitchen. Small batches, real butter,
            no preservatives, and eggless whenever you ask.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: soft, delay: 0.88 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href={whatsappLink()} target="_blank" rel="noreferrer" size="lg">
              <WhatsAppIcon className="h-5 w-5" />
              Order on WhatsApp
            </Button>
            <Button href="#menu" variant="secondary" size="lg">
              See the menu
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
              <span className="text-butter">★★★★★</span> Loved by 2,400+ orders
            </span>
            <span className="hidden h-4 w-px bg-ink/15 sm:block" />
            <span>Order 48 hours ahead</span>
          </motion.div>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        <div className="relative h-[22rem] sm:h-[26rem] lg:h-[34rem]">
          {isDesktop ? (
            <Stage3D
              className="absolute inset-0"
              distance={6.6}
              elevation={12}
              spin={0.22}
              tilt={1.15}
              shadow="contact"
              floatIntensity={0.45}
            >
              <Cake accent="berry" />
              <Sprinkles count={110} spread={[4.2, 2.8, 2.2]} />
            </Stage3D>
          ) : (
            <Stage3D
              className="absolute inset-0"
              distance={7.2}
              elevation={12}
              spin={0.2}
              tilt={0.5}
              floatIntensity={0.4}
              shadow="fake"
            >
              <Cake accent="berry" />
              <Sprinkles count={45} spread={[3.4, 2.4, 1.8]} />
            </Stage3D>
          )}

          <FloatingBadge className="top-2 left-0 sm:top-6" delay={1.2}>
            🎂 Custom themes
          </FloatingBadge>
          <FloatingBadge className="top-1/3 right-0" delay={1.4} drift={16}>
            🥚 Eggless on request
          </FloatingBadge>
          <FloatingBadge className="bottom-6 left-4 sm:bottom-10" delay={1.6} drift={10}>
            🧈 Baked fresh today
          </FloatingBadge>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-xs font-semibold tracking-[0.2em] text-ink-faint uppercase"
        >
          Scroll
          <span className="h-8 w-[2px] rounded-full bg-gradient-to-b from-ink/40 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  )
}
