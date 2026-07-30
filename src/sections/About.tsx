import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button, Eyebrow, Reveal, Squiggle, WhatsAppIcon, cx } from '../components/ui'
import { Cupcake } from '../three/Props'
import { Stage3D } from '../three/Stage'
import { useIsDesktop } from '../lib/hooks'
import { site, stats, whatsappLink } from '../lib/site'

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="about" ref={ref} className="relative px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        {/* portrait slot ------------------------------------------------- */}
        <motion.div style={{ y: isDesktop ? y : 0 }} className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] rotate-[-3deg] overflow-hidden rounded-[2.5rem] border-2 border-ink bg-cream-deep shadow-[10px_10px_0_var(--color-ink)]">
            <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_60%_20%,#fff_0%,transparent_60%)]" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(var(--color-ink)_1.5px,transparent_1.5px)] [background-size:16px_16px]"
            />
            <span className="absolute inset-x-0 bottom-8 text-center font-hand text-3xl text-ink-soft">
              a photo of Ragini
              <br />
              goes here
            </span>
          </div>

          {/* 3D cupcake perched on the corner of the frame */}
          <Stage3D
            className="pointer-events-none absolute -right-4 -bottom-14 z-10 h-44 w-44 sm:-right-14 sm:-bottom-16 sm:h-56 sm:w-56"
            distance={4.2}
            elevation={12}
            spin={0.34}
            tilt={0.6}
          >
            <Cupcake accent="grape" />
          </Stage3D>

          <motion.span
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 240, damping: 14, delay: 0.2 }}
            className="absolute -top-5 -left-4 rounded-full border-2 border-ink bg-butter px-4 py-2 text-sm font-extrabold sticker-sm"
          >
            Baking since 2019
          </motion.span>
        </motion.div>

        {/* story --------------------------------------------------------- */}
        <div className="flex flex-col gap-6">
          <Reveal>
            <Eyebrow accent="grape">The baker</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="text-4xl leading-[1.05] font-semibold sm:text-5xl">
              Hi, I&rsquo;m {site.owner}
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex max-w-xl flex-col gap-4 text-base text-ink-soft sm:text-lg">
              <p>
                What started as birthday cakes for my own family turned into a kitchen that
                runs most mornings of the week. I still bake everything myself, in batches
                small enough that I can taste as I go.
              </p>
              <p>
                No premixes, no preservatives, and nothing sitting in a display case for
                three days. If you order for Saturday, it comes out of the oven on Saturday
                — and I&rsquo;ll tell you honestly if a design won&rsquo;t work before you pay for it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="font-hand text-3xl text-berry">— Ragini</p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cx(
                    'rounded-2xl border-2 border-ink bg-paper p-4 text-center',
                    i % 2 === 0 ? 'sticker-sm' : 'shadow-[3px_3px_0_var(--color-berry)]',
                  )}
                >
                  <div className="font-display text-2xl font-extrabold sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-[0.7rem] font-bold tracking-wide text-ink-soft uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <Button href={whatsappLink()} target="_blank" rel="noreferrer" className="mt-2 w-fit">
              <WhatsAppIcon />
              Say hi on WhatsApp
            </Button>
          </Reveal>
        </div>
      </div>

      <Squiggle className="mt-20 opacity-40" color="var(--color-grape)" />
    </section>
  )
}
