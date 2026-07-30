import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Button, Section, SectionHeading, WhatsAppIcon, cx } from '../components/ui'
import { soft } from '../lib/motion'
import { faqs, whatsappLink } from '../lib/site'

function Row({
  item,
  open,
  onToggle,
  index,
}: {
  item: { q: string; a: string }
  open: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: soft, delay: index * 0.05 }}
      className={cx(
        'overflow-hidden rounded-2xl border-2 border-ink bg-paper transition-shadow duration-300',
        open ? 'shadow-[6px_6px_0_var(--color-berry)]' : 'shadow-[4px_4px_0_var(--color-ink)]',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 p-5 text-left sm:p-6"
      >
        <span className="font-display text-lg font-semibold sm:text-xl">{item.q}</span>
        <span
          className={cx(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors duration-300',
            open ? 'bg-berry' : 'bg-cream',
          )}
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: soft }}
            className="relative block h-3.5 w-3.5"
          >
            <span className="absolute top-1/2 left-0 h-[2.5px] w-full -translate-y-1/2 rounded-full bg-ink" />
            <span className="absolute top-0 left-1/2 h-full w-[2.5px] -translate-x-1/2 rounded-full bg-ink" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: soft }}
          >
            <p className="px-5 pb-6 text-[0.95rem] text-ink-soft sm:px-6">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Good to know"
            accent="sky"
            title="Questions, answered honestly"
            intro="Anything not covered here — just ask. She replies to messages herself, usually within a few hours."
          />
          <div className="mt-8">
            <Button href={whatsappLink()} target="_blank" rel="noreferrer" variant="secondary">
              <WhatsAppIcon />
              Ask a question
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <Row
              key={item.q}
              item={item}
              index={i}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
