import { useEffect, useState, type ReactNode } from 'react'
import { accentBg, cx } from './ui'
import type { AccentName } from '../lib/site'

/**
 * A photo that degrades honestly.
 *
 * Paths in `lib/site.ts` point at files that may not exist yet, so this waits
 * for the image to actually load before revealing it and drops back to a
 * patterned swatch in the item's accent if it 404s. The site therefore looks
 * finished whether or not the photography has landed.
 */
export function Photo({
  src,
  alt,
  accent,
  /** shown in the middle of the placeholder — usually the item's initial */
  fallbackLabel,
  placeholder,
  className,
  imgClassName,
  children,
  eager = false,
}: {
  src?: string
  alt: string
  accent: AccentName
  fallbackLabel?: string
  /** replaces the default swatch treatment while no photo is present */
  placeholder?: ReactNode
  className?: string
  imgClassName?: string
  /** badges and overlays that sit above the image either way */
  children?: ReactNode
  eager?: boolean
}) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>(
    src ? 'loading' : 'failed',
  )

  return (
    <div className={cx('relative overflow-hidden', accentBg[accent], className)}>
      {/* placeholder stays mounted underneath so there is never a blank flash */}
      <div
        aria-hidden
        className={cx(
          'absolute inset-0 transition-opacity duration-500',
          status === 'ready' ? 'opacity-0' : 'opacity-100',
        )}
      >
        {placeholder ?? (
          <>
            <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_0%,#fff_0%,transparent_55%)]" />
            <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(45deg,var(--color-ink)_0_2px,transparent_2px_16px)]" />
            {fallbackLabel && (
              <span className="absolute inset-0 flex items-center justify-center font-display text-7xl font-extrabold text-paper/80 select-none">
                {fallbackLabel}
              </span>
            )}
          </>
        )}
      </div>

      {src && status !== 'failed' && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('ready')}
          onError={() => setStatus('failed')}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-500',
            status === 'ready' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      )}

      {children}
    </div>
  )
}

/**
 * Lets a parent know whether a photo actually resolved, so layout can react —
 * the menu cards use this to decide how much room to give the 3D prop.
 * Returns null while still unknown.
 */
export function useImageExists(src?: string) {
  const [ok, setOk] = useState<boolean | null>(src ? null : false)

  useEffect(() => {
    if (!src) {
      setOk(false)
      return
    }
    let live = true
    const img = new Image()
    img.onload = () => live && setOk(true)
    img.onerror = () => live && setOk(false)
    img.src = src
    return () => {
      live = false
    }
  }, [src])

  return ok
}
