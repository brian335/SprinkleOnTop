import { useEffect, useState } from 'react'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

/** Drops the 3D scenes on small screens where they cost more than they give. */
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)')

/**
 * True only for real pointing devices. Touch screens fire pointerenter on tap
 * and often never fire the matching pointerleave, so anything that pauses on
 * hover has to check this first or it stays paused forever on a phone.
 */
export const useHasHover = () => useMediaQuery('(hover: hover) and (pointer: fine)')

/** Tracks whether the page has scrolled past a threshold (for the sticky nav). */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}
