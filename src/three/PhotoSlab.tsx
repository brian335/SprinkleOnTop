import { useEffect, useMemo, useRef, useState } from 'react'
import { RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {
  DoubleSide,
  LinearFilter,
  SRGBColorSpace,
  TextureLoader,
  type Group,
  type Texture,
} from 'three'
import { accentHex, type AccentName } from '../lib/site'

/**
 * Loads a photo as a texture, or reports null if the file isn't there yet.
 * Deliberately not drei's useTexture — that suspends and then throws on a 404,
 * which would take the whole card down while photography is still missing.
 */
export function usePhotoTexture(src?: string) {
  const [texture, setTexture] = useState<Texture | null>(null)

  useEffect(() => {
    if (!src) {
      setTexture(null)
      return
    }
    let live = true
    let loaded: Texture | null = null

    new TextureLoader().load(
      src,
      (t) => {
        if (!live) {
          t.dispose()
          return
        }
        t.colorSpace = SRGBColorSpace
        t.minFilter = LinearFilter
        t.generateMipmaps = false
        loaded = t
        setTexture(t)
      },
      undefined,
      () => live && setTexture(null),
    )

    return () => {
      live = false
      loaded?.dispose()
    }
  }, [src])

  return texture
}

/**
 * A photo as a physical object: a thick cream-edged print, bowed very slightly
 * like paper does, floating over its own shadow and catching the same lights as
 * the cakes around it. The photo is lit geometry rather than a flat <img>.
 */
export function PhotoSlab({
  texture,
  width = 3.2,
  aspect = 4 / 3,
  accent = 'berry',
  /** how much the print bows, in world units */
  bow = 0.12,
}: {
  texture: Texture
  width?: number
  aspect?: number
  accent?: AccentName
  bow?: number
}) {
  const height = width / aspect
  const group = useRef<Group>(null)

  // A shallow cylinder section reads as a bowed print far more cheaply than
  // displacing a plane, and keeps the silhouette curved at the edges too.
  const radius = useMemo(() => (width * width) / (8 * bow) + bow / 2, [width, bow])
  const theta = useMemo(() => 2 * Math.asin(width / (2 * radius)), [width, radius])

  useFrame(({ clock }) => {
    if (!group.current) return
    // barely-there drift so the print never looks pinned to the card
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.012
  })

  return (
    <group ref={group}>
      {/* the print itself — backing board */}
      <RoundedBox args={[width + 0.16, height + 0.16, 0.1]} radius={0.07} smoothness={4} position={[0, 0, -0.06]}>
        <meshStandardMaterial color="#fffdf9" roughness={0.72} />
      </RoundedBox>

      {/* The photo, bowed. The cylinder's axis runs up Y, so its centre sits
          one radius behind the card and only the arc facing the camera is
          generated — the surface then bulges forward by exactly `bow`. */}
      <mesh position={[0, 0, -(radius - bow)]}>
        <cylinderGeometry args={[radius, radius, height, 64, 1, true, -theta / 2, theta]} />
        <meshStandardMaterial map={texture} roughness={0.34} metalness={0.02} side={DoubleSide} />
      </mesh>

      {/* a wash of the card's accent bounced back onto the print */}
      <pointLight position={[0, -height, 1.6]} intensity={2.4} distance={5} color={accentHex[accent]} />
    </group>
  )
}
