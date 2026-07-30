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
 * Loads a whole set of photos in one effect, so callers never have to run a
 * hook per image. Entries stay null until their file resolves.
 */
export function usePhotoTextures(srcs: string[]) {
  const key = srcs.join('|')
  const [textures, setTextures] = useState<(Texture | null)[]>(() => srcs.map(() => null))

  useEffect(() => {
    let live = true
    const list = key ? key.split('|') : []
    const loaded: (Texture | null)[] = list.map(() => null)
    setTextures(loaded.slice())

    const loader = new TextureLoader()
    list.forEach((src, i) => {
      loader.load(
        src,
        (t) => {
          if (!live) {
            t.dispose()
            return
          }
          t.colorSpace = SRGBColorSpace
          t.minFilter = LinearFilter
          t.generateMipmaps = false
          loaded[i] = t
          setTextures(loaded.slice())
        },
        undefined,
        () => {},
      )
    })

    return () => {
      live = false
      loaded.forEach((t) => t?.dispose())
    }
  }, [key])

  return textures
}

/** Reads the real pixel aspect so portrait cakes aren't squashed into 4:3. */
function textureAspect(texture: Texture) {
  const img = texture.image as { width?: number; height?: number } | undefined
  if (!img?.width || !img?.height) return 1
  return img.width / img.height
}

/**
 * A photo as a physical object: a thick cream-edged print, bowed very slightly
 * the way paper is, floating over its own shadow and catching the same lights
 * as everything around it. The photo is lit geometry, not a flat <img>.
 *
 * Give it a box to fit inside — it preserves the image's real aspect ratio.
 */
export function PhotoSlab({
  texture,
  maxWidth = 3.2,
  maxHeight = 2.4,
  accent = 'berry',
  /** how far the print bows toward the viewer, in world units */
  bow = 0.1,
  /** cream border around the image */
  border = 0.09,
  drift = true,
}: {
  texture: Texture
  maxWidth?: number
  maxHeight?: number
  accent?: AccentName
  bow?: number
  border?: number
  drift?: boolean
}) {
  const group = useRef<Group>(null)

  const { width, height } = useMemo(() => {
    const aspect = textureAspect(texture)
    // contain: shrink whichever dimension overflows the given box
    let w = maxWidth
    let h = w / aspect
    if (h > maxHeight) {
      h = maxHeight
      w = h * aspect
    }
    return { width: w, height: h }
  }, [texture, maxWidth, maxHeight])

  // A shallow cylinder section reads as a bowed print far more cheaply than
  // displacing a plane, and keeps the silhouette curved at the edges too.
  const radius = useMemo(() => (width * width) / (8 * bow) + bow / 2, [width, bow])
  const theta = useMemo(() => 2 * Math.asin(width / (2 * radius)), [width, radius])

  useFrame(({ clock }) => {
    if (!group.current || !drift) return
    // barely-there sway so the print never looks pinned flat to the card
    group.current.rotation.z = Math.sin(clock.elapsedTime * 0.5) * 0.012
  })

  return (
    <group ref={group}>
      {/* the print's backing board */}
      <RoundedBox
        args={[width + border * 2, height + border * 2, 0.1]}
        radius={0.06}
        smoothness={4}
        position={[0, 0, -0.06]}
      >
        <meshStandardMaterial color="#fffdf9" roughness={0.72} />
      </RoundedBox>

      {/* The photo, bowed. The cylinder's axis runs up Y, its centre sits one
          radius behind the card, and only the arc facing the camera is built —
          so the surface bulges forward by exactly `bow`. */}
      <mesh position={[0, 0, -(radius - bow)]}>
        <cylinderGeometry args={[radius, radius, height, 64, 1, true, -theta / 2, theta]} />
        <meshStandardMaterial map={texture} roughness={0.34} metalness={0.02} side={DoubleSide} />
      </mesh>

      {/* a wash of the card's accent bounced back onto the print */}
      <pointLight position={[0, -height, 1.6]} intensity={2.4} distance={5} color={accentHex[accent]} />
    </group>
  )
}
