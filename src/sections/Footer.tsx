import { Link } from 'react-router-dom'
import { LogoMark, Wordmark } from '../components/Logo'
import { InstagramIcon, Squiggle, WhatsAppIcon } from '../components/ui'
import { cakeStyles, otherBakes, nav, site, whatsappLink } from '../lib/site'

export function Footer() {
  return (
    <footer className="relative px-5 pb-10 sm:px-8">
      <Squiggle className="mb-10 opacity-30" color="var(--color-mint)" />

      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <LogoMark className="h-14 w-14" animated={false} />
            <Wordmark />
          </div>
          <p className="max-w-xs text-sm text-ink-soft">
            Custom cakes baked at home in {site.city}. {site.tagline}.
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
          <h3 className="text-xs font-bold tracking-[0.16em] text-ink-faint uppercase">Explore</h3>
          {nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-semibold text-ink-soft hover:text-berry"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-[0.16em] text-ink-faint uppercase">Cakes</h3>
          {cakeStyles.map((c) => (
            <Link key={c.id} to="/#cakes" className="text-sm font-semibold text-ink-soft hover:text-berry">
              {c.name}
            </Link>
          ))}
          <h3 className="mt-3 text-xs font-bold tracking-[0.16em] text-ink-faint uppercase">
            Also baking
          </h3>
          {otherBakes.map((b) => (
            <Link key={b.id} to="/more" className="text-sm font-semibold text-ink-soft hover:text-berry">
              {b.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold tracking-[0.16em] text-ink-faint uppercase">Get in touch</h3>
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
            Cakes close 48 hours ahead — tiered ones a week.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t-2 border-ink/10 pt-6 text-xs text-ink-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} by {site.owner}. All rights reserved.
        </p>
        <p className="font-hand text-base text-ink-soft">Made with butter, sugar and a lot of sprinkles</p>
      </div>
    </footer>
  )
}
