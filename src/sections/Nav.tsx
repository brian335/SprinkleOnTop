import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'
import { Button, WhatsAppIcon, cx } from '../components/ui'
import { useScrolled } from '../lib/hooks'
import { nav, whatsappLink } from '../lib/site'
import { soft } from '../lib/motion'

export function Nav() {
  const scrolled = useScrolled(30)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: soft, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={cx(
            'mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:px-4',
            scrolled
              ? 'glass border-2 border-ink shadow-[0_10px_30px_-14px_rgba(22,18,30,0.45)]'
              : 'border-2 border-transparent',
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-x-3 bottom-1.5 h-[3px] origin-left scale-x-0 rounded-full bg-berry transition-transform duration-300 ease-[var(--ease-soft)] group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* wrapper does the hiding, since a display utility on Button
                itself loses to the inline-flex in its own base classes */}
            <span className="hidden sm:block">
              <Button href={whatsappLink()} target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                Order now
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-paper sticker-sm lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  className="absolute inset-x-0 top-0 h-[2.5px] rounded-full bg-ink"
                  animate={open ? { rotate: 45, top: 6 } : { rotate: 0, top: 0 }}
                  transition={{ duration: 0.3, ease: soft }}
                />
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-full bg-ink"
                  animate={open ? { rotate: -45, bottom: 5 } : { rotate: 0, bottom: 0 }}
                  transition={{ duration: 0.3, ease: soft }}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-xl lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              className="flex h-full flex-col items-center justify-center gap-2 px-8"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {nav.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="font-display text-4xl font-semibold tracking-tight sm:text-5xl"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                className="mt-8"
              >
                <Button href={whatsappLink()} target="_blank" rel="noreferrer" size="lg">
                  <WhatsAppIcon />
                  Order on WhatsApp
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
