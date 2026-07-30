import { LogoMark, Wordmark } from '../components/Logo'
import { InstagramIcon, Squiggle, WhatsAppIcon } from '../components/ui'
import { nav, site, whatsappLink } from '../lib/site'

export function Footer() {
  return (
    <footer className="relative px-5 pb-10 sm:px-8">
      <Squiggle className="mb-10 opacity-30" color="var(--color-mint)" />

      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <LogoMark className="h-14 w-14" animated={false} />
            <Wordmark />
          </div>
          <p className="max-w-xs font-hand text-xl text-ink-soft">
            custom cakes baked at home in {site.city}
          </p>
          <div className="flex gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper transition-transform duration-300 hover:-translate-y-1 sticker-sm"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-paper transition-transform duration-300 hover:-translate-y-1 sticker-sm"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          <h3 className="font-hand text-xl font-bold text-ink-faint">have a look</h3>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink-soft hover:text-berry"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="font-hand text-xl font-bold text-ink-faint">get in touch</h3>
          <a href={`tel:${site.phone}`} className="font-display text-lg font-bold hover:text-berry">
            {site.phoneDisplay}
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-ink-soft hover:text-berry"
          >
            {site.instagramHandle}
          </a>
          <p className="text-sm text-ink-soft">
            Cakes close 48 hours ahead. Tiered ones need a week.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t-2 border-ink/10 pt-6 text-xs text-ink-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} by {site.owner}. All rights reserved.
        </p>
        <p className="font-hand text-base text-ink-soft">made with butter, sugar and a lot of sprinkles</p>
      </div>
    </footer>
  )
}
