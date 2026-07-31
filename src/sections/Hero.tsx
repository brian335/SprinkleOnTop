import { motion, useScroll, useTransform } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { CakeStack } from '../components/CakeStack'
import { SprinkleField } from '../components/SprinkleField'
import { Button, Highlight, WhatsAppIcon, ArrowIcon } from '../components/ui'
import { soft } from '../lib/motion'
import { accentHex, site, whatsappLink } from '../lib/site'

const headline = ['A', 'cake', 'they', 'talk', 'about']

const promises = ['always 100% eggless', 'any theme you like', 'baked fresh on the day']

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // the whole section takes its colour from whichever cake is on top
  const [accent, setAccent] = useState(accentHex.berry)
  const onAccent = useCallback((hex: string) => setAccent(hex), [])

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-24"
    >
      {/* Ambient light that changes with the cake. A pink cake warms the whole
          hero, a mint one cools it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute top-[-18%] right-[-6%] h-[42rem] w-[42rem] rounded-full blur-[110px]"
          animate={{ backgroundColor: accent }}
          transition={{ duration: 1.4, ease: soft }}
          style={{ opacity: 0.4 }}
        />
        <motion.div
          className="absolute bottom-[-22%] left-[-10%] h-[34rem] w-[34rem] rounded-full blur-[110px]"
          animate={{ backgroundColor: accent }}
          transition={{ duration: 1.8, ease: soft }}
          style={{ opacity: 0.22 }}
        />
        <div className="absolute top-1/4 left-1/3 h-[26rem] w-[26rem] rounded-full bg-butter/30 blur-[90px]" />
      </div>

      {/* sprinkles falling through the section, which is the least the name
          deserves. Fine ones behind the content, a few larger and slower in
          front, so the field reads as depth rather than a flat overlay. */}
      <SprinkleField count={30} seed={11} layer="back" className="z-0" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-9 px-5 sm:gap-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-20 max-w-xl">
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

          <h1 className="mt-6 text-[2.7rem] leading-[0.95] font-semibold sm:text-[4.2rem] lg:text-[4.8rem]">
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
            className="mt-5 max-w-lg text-base text-ink-soft sm:text-lg"
          >
            Designed around your theme and baked to order in {site.owner.split(' ')[0]}
            &rsquo;s home kitchen, one cake at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: soft, delay: 0.92 }}
            className="mt-7 flex flex-wrap items-center gap-4"
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
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-hand text-lg text-ink-soft"
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

        {/* the deck */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, ease: soft, delay: 0.5 }}
          style={{ opacity: fade }}
          className="relative z-10 mx-auto mb-20 h-[23rem] w-full max-w-[18rem] sm:h-[28rem] sm:max-w-[22rem] lg:h-[32rem]"
        >
          <CakeStack onAccent={onAccent} />
        </motion.div>
      </div>

      <SprinkleField count={8} seed={29} layer="front" className="z-30" />

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-x-0 bottom-5 z-20 hidden justify-center lg:flex"
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
