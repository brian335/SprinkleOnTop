import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cx } from './ui'

/**
 * Card that pitches toward the cursor in real perspective. Children can opt
 * into depth with `style={{ transform: 'translateZ(40px)' }}` since the card
 * preserves 3D.
 */
export function TiltCard({
  children,
  className,
  max = 10,
  lift = 26,
}: {
  children: ReactNode
  className?: string
  /** maximum tilt in degrees */
  max?: number
  /** how far the card rises off the page on hover, in px */
  lift?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 220, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  const reset = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      whileHover={{ z: lift }}
      transition={{ type: 'spring', ...spring }}
      className={cx('relative', className)}
    >
      {children}
    </motion.div>
  )
}
