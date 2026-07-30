import { motion } from 'framer-motion'
import {
  Section,
  SectionHeading,
  StaggerGroup,
  StaggerItem,
  accentBg,
  cx,
} from '../components/ui'
import { soft } from '../lib/motion'
import { steps } from '../lib/site'

export function Process() {
  return (
    <Section id="how" className="overflow-hidden">
      <SectionHeading
        eyebrow="How it works"
        accent="mint"
        title="Three messages and it's in the oven"
        intro="No carts, no checkout, no waiting for a confirmation email. You talk to the person who does the baking."
      />

      <div className="relative mt-16">
        {/* dashed thread linking the three steps, drawn on scroll */}
        <motion.svg
          aria-hidden
          viewBox="0 0 1000 20"
          preserveAspectRatio="none"
          className="pointer-events-none absolute top-8 right-8 left-8 hidden h-5 md:block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.path
            d="M40 10 C 250 -8, 420 26, 500 10 S 780 -6, 960 10"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="3"
            strokeDasharray="10 12"
            strokeLinecap="round"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: soft }}
          />
        </motion.svg>

        <StaggerGroup className="grid gap-8 md:grid-cols-3" gap={0.14}>
          {steps.map((step) => (
            <StaggerItem key={step.n}>
              <div className="group relative flex h-full flex-col gap-4 rounded-[2rem] border-2 border-ink bg-paper p-7 shadow-[6px_6px_0_var(--color-ink)] transition-transform duration-300 ease-[var(--ease-sprung)] hover:-translate-y-1.5">
                <span
                  className={cx(
                    'flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink font-display text-xl font-extrabold transition-transform duration-500 ease-[var(--ease-sprung)] group-hover:rotate-[-10deg] group-hover:scale-105',
                    accentBg[step.accent],
                  )}
                >
                  {step.n}
                </span>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-[0.95rem] text-ink-soft">{step.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  )
}
