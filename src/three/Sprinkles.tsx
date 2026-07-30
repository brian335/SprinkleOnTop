import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, InstancedMesh, MathUtils, Object3D } from 'three'
import { accentHex } from '../lib/site'

const palette = Object.values(accentHex).map((hex) => new Color(hex))

type Props = {
  count?: number
  /** half-extent of the box the sprinkles drift inside */
  spread?: [number, number, number]
  size?: number
  speed?: number
}

/**
 * A slow-tumbling cloud of sprinkles. One InstancedMesh so a few hundred
 * pieces cost a single draw call.
 */
export function Sprinkles({
  count = 90,
  spread = [5, 3.4, 3],
  size = 1,
  speed = 1,
}: Props) {
  const mesh = useRef<InstancedMesh>(null)
  const dummy = useMemo(() => new Object3D(), [])

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        pos: [
          MathUtils.randFloatSpread(spread[0] * 2),
          MathUtils.randFloatSpread(spread[1] * 2),
          MathUtils.randFloatSpread(spread[2] * 2),
        ] as [number, number, number],
        rot: [Math.random() * 7, Math.random() * 7, Math.random() * 7] as [number, number, number],
        spin: MathUtils.randFloat(0.2, 0.9) * (Math.random() > 0.5 ? 1 : -1),
        bob: MathUtils.randFloat(0.25, 0.7),
        phase: Math.random() * Math.PI * 2,
        scale: MathUtils.randFloat(0.7, 1.35) * size,
      })),
    [count, spread, size],
  )

  useLayoutEffect(() => {
    if (!mesh.current) return
    seeds.forEach((_, i) => mesh.current!.setColorAt(i, palette[i % palette.length]))
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true
  }, [seeds])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t = clock.elapsedTime * speed
    seeds.forEach((s, i) => {
      dummy.position.set(
        s.pos[0] + Math.sin(t * 0.3 + s.phase) * 0.18,
        s.pos[1] + Math.sin(t * s.bob + s.phase) * 0.28,
        s.pos[2],
      )
      dummy.rotation.set(s.rot[0] + t * s.spin, s.rot[1] + t * s.spin * 0.7, s.rot[2])
      dummy.scale.setScalar(s.scale)
      dummy.updateMatrix()
      mesh.current!.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <capsuleGeometry args={[0.032, 0.1, 4, 8]} />
      <meshStandardMaterial roughness={0.35} metalness={0.05} />
    </instancedMesh>
  )
}
