import { Marquee } from '../components/Marquee'
import { trustPoints } from '../lib/site'

const dots = ['#ff4e9b', '#ffc93c', '#37d9b4', '#8b5cf6', '#ff7a3d', '#4cc3ff']

/** Tilted ink band that cuts the page between hero and menu. */
export function TrustRibbon() {
  return (
    // The tilt widens the band's bounding box past the viewport, so it is
    // clipped here rather than by a page-level overflow rule — anything on
    // <html> would break the sticky sections further down.
    <div className="relative z-20 my-4 overflow-x-clip py-1 sm:my-8">
      <div className="-rotate-[1.6deg] border-y-2 border-ink bg-ink py-4">
        <Marquee speed={34} gap="gap-8">
          {trustPoints.map((point, i) => (
            <span key={point} className="flex shrink-0 items-center gap-8">
              <span className="font-display text-lg font-semibold tracking-tight text-cream sm:text-2xl">
                {point}
              </span>
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: dots[i % dots.length] }}
              />
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  )
}
