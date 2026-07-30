import { Suspense, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Float, PerspectiveCamera, View } from '@react-three/drei'
import type { Group } from 'three'
import { CanvasTexture, MathUtils } from 'three'

/**
 * Every 3D moment on the page draws into this one canvas. drei's <View>
 * scissors a region per placement, so six category props plus the hero cost a
 * single WebGL context instead of seven.
 */
export function SharedCanvas({ eventSource }: { eventSource: RefObject<HTMLElement | null> }) {
  return (
    <Canvas
      className="!fixed inset-0 !h-screen !w-screen pointer-events-none"
      style={{ zIndex: 30 }}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <View.Port />
    </Canvas>
  )
}

/** Warm key light plus candy-coloured rims, so white frosting never goes grey. */
function Lights({ intensity = 1 }: { intensity?: number }) {
  return (
    <>
      <ambientLight intensity={1.1 * intensity} />
      <directionalLight position={[4, 6, 4]} intensity={2.4 * intensity} color="#fff4e2" />
      <directionalLight position={[-5, 2, -3]} intensity={0.8 * intensity} color="#ffd9ec" />
      <pointLight position={[-2.4, 1.2, 2.4]} intensity={14 * intensity} color="#ff8ec4" />
      <pointLight position={[2.6, -0.6, 2]} intensity={10 * intensity} color="#7ff0d8" />
    </>
  )
}

/** Follows the cursor with a lazy lerp — subtle enough to read as parallax. */
function PointerTilt({ children, strength = 1 }: { children: ReactNode; strength?: number }) {
  const group = useRef<Group>(null)
  useFrame(({ pointer }, delta) => {
    if (!group.current) return
    const k = 1 - Math.pow(0.0018, delta)
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, pointer.x * 0.38 * strength, k)
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.22 * strength, k)
  })
  return <group ref={group}>{children}</group>
}

function Spin({ children, speed = 0.18 }: { children: ReactNode; speed?: number }) {
  const group = useRef<Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * speed
  })
  return <group ref={group}>{children}</group>
}

/**
 * Cheap soft shadow — a radial-gradient sprite instead of a depth pass, so a
 * card costs one extra quad rather than a whole shadow render.
 */
const shadowTexture = (() => {
  let cached: CanvasTexture | null = null
  return () => {
    if (cached) return cached
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(58,42,68,0.55)')
    g.addColorStop(0.5, 'rgba(58,42,68,0.22)')
    g.addColorStop(1, 'rgba(58,42,68,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    cached = new CanvasTexture(canvas)
    return cached
  }
})()

function FakeShadow({ y = -1.5, scale = 2.4 }) {
  const map = useMemo(() => shadowTexture(), [])
  return (
    <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[scale, scale * 0.85, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={map} transparent depthWrite={false} />
    </mesh>
  )
}

type StageProps = {
  children: ReactNode
  className?: string
  /** camera distance from the subject — smaller crops in tighter */
  distance?: number
  /**
   * How far above the subject the camera sits, in degrees. Flat things
   * (cookies, donuts) need a steep angle or you end up staring at their edge;
   * tall things (cakes) want a near-level eye line.
   */
  elevation?: number
  /** shifts the subject up or down inside the frame */
  offsetY?: number
  spin?: number
  tilt?: number
  floatIntensity?: number
  shadow?: 'contact' | 'fake' | 'none'
  lightIntensity?: number
}

export function Stage3D({
  children,
  className,
  distance = 6,
  elevation = 12,
  offsetY = 0,
  spin = 0.18,
  tilt = 1,
  floatIntensity = 0.6,
  shadow = 'fake',
  lightIntensity = 1,
}: StageProps) {
  const e = (elevation * Math.PI) / 180
  return (
    <View className={className}>
      {/* orbit the camera up and pitch it back down so it always frames origin */}
      <PerspectiveCamera
        makeDefault
        fov={35}
        position={[0, Math.sin(e) * distance + offsetY, Math.cos(e) * distance]}
        rotation={[-e, 0, 0]}
      />
      <Lights intensity={lightIntensity} />
      <Suspense fallback={null}>
        <PointerTilt strength={tilt}>
          <Float speed={1.6} rotationIntensity={0.25} floatIntensity={floatIntensity}>
            <Spin speed={spin}>{children}</Spin>
          </Float>
        </PointerTilt>
        {shadow === 'contact' && (
          <ContactShadows position={[0, -1.15, 0]} opacity={0.3} scale={8} blur={2.6} far={4} color="#4a2f3d" />
        )}
        {shadow === 'fake' && <FakeShadow />}
      </Suspense>
    </View>
  )
}

export { View }
