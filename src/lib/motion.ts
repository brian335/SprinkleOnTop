import type { Transition, Variants } from 'framer-motion'

/** One easing curve for the whole site keeps every transition feeling related. */
export const soft: Transition['ease'] = [0.22, 1, 0.36, 1]
export const sprung: Transition['ease'] = [0.34, 1.56, 0.64, 1]

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: soft } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: sprung } },
}

/** Parent wrapper: children animate in sequence rather than all at once. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

export const viewportOnce = { once: true, amount: 0.25 } as const
