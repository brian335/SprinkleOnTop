import { motion } from 'framer-motion'
import { Button, InstagramIcon, Reveal, WhatsAppIcon } from '../components/ui'
import { Donut } from '../three/Props'
import { Sprinkles } from '../three/Sprinkles'
import { Stage3D } from '../three/Stage'
import { useIsDesktop } from '../lib/hooks'
import { site, whatsappLink } from '../lib/site'

const details = [
  { label: 'WhatsApp & calls', value: site.phoneDisplay, href: `tel:${site.phone}` },
  { label: 'Instagram', value: site.instagramHandle, href: site.instagram },
  { label: 'Pickup', value: `Home kitchen, ${site.city}`, href: undefined },
  { label: 'Notice', value: '48 hours for most orders', href: undefined },
]

export function Contact() {
  const isDesktop = useIsDesktop()

  return (
    <section id="contact" className="px-4 pb-20 sm:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border-2 border-ink bg-ink px-6 py-16 text-cream shadow-[10px_10px_0_var(--color-berry)] sm:px-12 md:py-24">
        {/* glow blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-berry/40 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-mint/25 blur-3xl" />
        </div>

        {isDesktop && (
          <Stage3D
            className="pointer-events-none absolute top-4 right-2 h-80 w-80 lg:h-[26rem] lg:w-[26rem]"
            distance={5.2}
            elevation={26}
            spin={0.4}
            tilt={0.8}
            shadow="none"
            lightIntensity={1.15}
          >
            <Donut accent="butter" />
            <Sprinkles count={40} spread={[2.6, 2, 1.4]} size={0.9} />
          </Stage3D>
        )}

        <div className="relative z-10 max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-4 py-1.5 text-xs font-bold tracking-[0.18em] uppercase">
              <span className="h-2 w-2 rounded-full bg-mint" />
              Taking orders now
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="mt-6 text-4xl leading-[1.02] font-semibold sm:text-5xl lg:text-6xl">
              Tell her what you&rsquo;re
              <br />
              celebrating
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-lg text-base text-cream/70 sm:text-lg">
              Send the date, the occasion and roughly how many people. You&rsquo;ll get flavours,
              sizes and a price back the same day — usually within a couple of hours.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                size="lg"
                variant="onDark"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Message on WhatsApp
              </Button>
              <Button
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                size="lg"
                variant="onDarkGhost"
              >
                <InstagramIcon className="h-5 w-5" />
                See the latest bakes
              </Button>
            </div>
          </Reveal>

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } } }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:max-w-lg"
          >
            {details.map((d) => (
              <motion.div
                key={d.label}
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="border-t-2 border-cream/15 pt-3"
              >
                <dt className="text-[0.7rem] font-bold tracking-[0.16em] text-cream/50 uppercase">
                  {d.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold">
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {d.value}
                    </a>
                  ) : (
                    d.value
                  )}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
