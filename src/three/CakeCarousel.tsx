import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, type Group } from 'three'
import { PhotoSlab, usePhotoTextures } from './PhotoSlab'
import { cakes, thumbOf } from '../lib/site'

/**
 * Every cake, sliding past on a shallow arc.
 *
 * The whole row is a single <View>, so a dozen cakes cost one WebGL context.
 * Textures come from the small /photos/thumb set rather than the full gallery
 * images, which keeps GPU memory sane on phones.
 */
export function CakeCarousel({
  /** gap between cakes, in world units */
  spacing = 2.05,
  /** resting drift speed */
  speed = 0.4,
}: {
  spacing?: number
  speed?: number
}) {
  const group = useRef<Group>(null)
  const offset = useRef(0)
  const rate = useRef(speed)

  const sources = useMemo(() => cakes.map((c) => thumbOf(c.image)), [])
  const textures = usePhotoTextures(sources)

  const items = cakes
    .map((cake, i) => ({ cake, texture: textures[i] }))
    .filter((s) => s.texture)

  const total = items.length * spacing

  useFrame(({ pointer }, delta) => {
    if (!group.current || total === 0) return

    // Resting drift, then the pointer takes the wheel: move right of centre
    // and the row runs on faster, move left and it eases back the other way.
    const target = speed + pointer.x * speed * 3.4
    rate.current = MathUtils.lerp(rate.current, target, 1 - Math.pow(0.002, delta))
    offset.current -= rate.current * delta

    group.current.children.forEach((child, i) => {
      // wrap into a band centred on zero so cakes reappear from the far side
      const x = (((i * spacing + offset.current) % total) + total) % total - total / 2
      const t = x / (total / 2)
      child.position.set(x, Math.sin(x * 0.55) * 0.07, -Math.abs(t) * 2.8)
      child.rotation.y = -t * 0.6
      child.scale.setScalar(1 - Math.min(1, Math.abs(t)) * 0.22)
    })
  })

  return (
    <group ref={group}>
      {items.map(({ cake, texture }) => (
        <group key={cake.id}>
          <PhotoSlab
            texture={texture!}
            maxWidth={1.6}
            maxHeight={2.15}
            accent={cake.accent}
            drift={false}
            bow={0.08}
          />
        </group>
      ))}
    </group>
  )
}
