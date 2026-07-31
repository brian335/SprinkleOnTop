import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { CakeWall } from '../components/CakeWall'
import { Button, Highlight, WhatsAppIcon, ArrowIcon } from '../components/ui'
import { soft } from '../lib/motion'
import { useIsDesktop, useMediaQuery } from '../lib/hooks'
import { site, whatsappLink } from '../lib/site'

const headline = ['A', 'cake', 'they', 'talk', 'about']

const promises = ['always 100% eggless', 'any theme you like', 'baked fresh on the day']

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const isWide = useMediaQuery('(min-width: 1280px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // the wall sinks away as you scroll while the words hold on a moment longer
  const wallY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const wallFade = useTransform(scrollYProgress, [0, 0.9], [1, 0.15])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* every cake she has made, drifting behind the words */}
      <motion.div style={{ y: wallY, opacity: wallFade }} className="absolute inset-0">
        <CakeWall columns={isWide ? 6 : isDesktop ? 5 : 3} />
      </motion.div>

      {/* Cream pooled in the centre so the headline stays readable while the
          cakes keep their colour out at the edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(78%_62%_at_50%_50%,var(--color-cream)_38%,color-mix(in_srgb,var(--color-cream)_82%,transparent)_58%,transparent_78%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cream via-cream/75 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream via-cream/70 to-transparent"
      />

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-20 mx-auto w-full max-w-3xl px-5 pt-28 pb-24 text-center sm:px-8 sm:pt-32"
      >
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: soft, delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-4 py-1.5 font-hand text-lg leading-none font-bold sticker-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
          </span>
          custom cakes in {site.city}
        </motion.span>

        <h1 className="mt-7 text-[3rem] leading-[0.95] font-semibold sm:text-7xl lg:text-[5.5rem]">
          {headline.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, ease: soft, delay: 0.3 + i * 0.07 }}
              className="mr-[0.22em] inline-block"
            >
              {word === 'talk' ? <Highlight accent="butter">talk</Highlight> : word}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: soft, delay: 0.3 + headline.length * 0.07 }}
            className="inline-block font-hand text-[1.05em] text-berry"
          >
            for years
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: soft, delay: 0.8 }}
          className="mx-auto mt-7 max-w-xl text-base text-ink-soft sm:text-lg"
        >
          Designed around your theme and baked to order in {site.owner.split(' ')[0]}
          &rsquo;s home kitchen, one cake at a time.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: soft, delay: 0.92 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
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

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.05 } } }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-hand text-lg text-ink-soft"
        >
          {promises.map((promise, i) => (
            <motion.li
              key={promise}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="flex items-center gap-3"
            >
              {i > 0 && <span className="h-1.5 w-1.5 rounded-full bg-berry" />}
              {promise}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center"
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
    </section>
  )
}
