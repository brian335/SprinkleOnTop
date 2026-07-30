import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { accentHex, type AccentName } from '../lib/site'

/* Shared palette for the baked goods themselves (not the brand accents). */
const dough = {
  sponge: '#f6d9a8',
  cocoa: '#6b3f2a',
  crumb: '#c98a4b',
  golden: '#e8a95c',
  cream: '#fff7ea',
  oat: '#d9b47f',
  cherry: '#e63950',
  leaf: '#4caf50',
}

type Props = { accent?: AccentName }

/** Soft, slightly waxy finish — reads as frosting rather than plastic. */
function Frosting({ color, ...rest }: { color: string } & Record<string, unknown>) {
  return <meshStandardMaterial color={color} roughness={0.42} metalness={0} {...rest} />
}

function Glaze({ color }: { color: string }) {
  return <meshPhysicalMaterial color={color} roughness={0.18} clearcoat={1} clearcoatRoughness={0.25} />
}

/** Piped rosettes ringing a tier edge. */
function Rosettes({
  count,
  radius,
  y,
  size,
  color,
}: {
  count: number
  radius: number
  y: number
  size: number
  color: string
}) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2
        return [Math.cos(a) * radius, y, Math.sin(a) * radius] as const
      }),
    [count, radius, y],
  )
  return (
    <>
      {items.map((p, i) => (
        <mesh key={i} position={[p[0], p[1], p[2]]} castShadow>
          <sphereGeometry args={[size, 16, 16]} />
          <Frosting color={color} />
        </mesh>
      ))}
    </>
  )
}

function Candle({ x, z, color }: { x: number; z: number; color: string }) {
  const flame = useRef<Group>(null)
  useFrame(({ clock }) => {
    if (!flame.current) return
    const t = clock.elapsedTime * 6 + x
    flame.current.scale.setScalar(1 + Math.sin(t) * 0.12)
  })
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.44, 12]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      {/* wick */}
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.06, 6]} />
        <meshStandardMaterial color="#3a2f2f" />
      </mesh>
      <group ref={flame} position={[0, 0.55, 0]}>
        <mesh>
          <coneGeometry args={[0.055, 0.16, 12]} />
          <meshStandardMaterial
            color="#ffd166"
            emissive="#ff9f1c"
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>
        <pointLight color="#ffb703" intensity={1.4} distance={2.2} />
      </group>
    </group>
  )
}

function Cherry({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.14, 20, 20]} />
        <Glaze color={dough.cherry} />
      </mesh>
      <mesh position={[0.02, 0.16, 0]} rotation={[0, 0, -0.35]}>
        <cylinderGeometry args={[0.012, 0.012, 0.18, 6]} />
        <meshStandardMaterial color={dough.leaf} />
      </mesh>
    </group>
  )
}

/* -------------------------------------------------------------------------- */

export function Cake({ accent = 'berry' }: Props) {
  const c = accentHex[accent]
  return (
    // offset so the cake's visual centre — not its board — sits at the origin
    <group position={[0, -1.42, 0]}>
      {/* board */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 48]} />
        <meshStandardMaterial color="#fffdf9" roughness={0.9} />
      </mesh>

      {/* lower tier */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.12, 1.12, 0.76, 48]} />
        <Frosting color={dough.sponge} />
      </mesh>
      {/* cream filling stripe */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[1.14, 1.14, 0.14, 48]} />
        <Frosting color={dough.cream} />
      </mesh>
      {/* frosting cap that drips over the edge */}
      <mesh position={[0, 0.84, 0]} castShadow>
        <cylinderGeometry args={[1.17, 1.17, 0.14, 48]} />
        <Glaze color={c} />
      </mesh>
      <Rosettes count={14} radius={1.1} y={0.92} size={0.11} color={dough.cream} />

      {/* upper tier */}
      <mesh position={[0, 1.24, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.62, 40]} />
        <Frosting color={c} />
      </mesh>
      <mesh position={[0, 1.57, 0]} castShadow>
        <cylinderGeometry args={[0.74, 0.74, 0.1, 40]} />
        <Glaze color={dough.cream} />
      </mesh>
      <Rosettes count={9} radius={0.66} y={1.63} size={0.1} color={c} />

      {/* candles stand on the top tier, not inside it */}
      <group position={[0, 1.62, 0]}>
        <Candle x={-0.22} z={0.1} color={accentHex.butter} />
        <Candle x={0.2} z={-0.16} color={accentHex.mint} />
        <Cherry position={[0.02, 0.12, 0.36]} />
      </group>
    </group>
  )
}

/** Piped swirl built as a shrinking helix of spheres. */
function Swirl({ color, turns = 2.4, steps = 26 }: { color: string; turns?: number; steps?: number }) {
  const beads = useMemo(
    () =>
      Array.from({ length: steps }, (_, i) => {
        const t = i / (steps - 1)
        const a = t * Math.PI * 2 * turns
        const r = 0.46 * (1 - t * 0.82)
        return {
          pos: [Math.cos(a) * r, t * 0.78, Math.sin(a) * r] as [number, number, number],
          s: 0.26 * (1 - t * 0.6),
        }
      }),
    [turns, steps],
  )
  return (
    <>
      {beads.map((b, i) => (
        <mesh key={i} position={b.pos} castShadow>
          <sphereGeometry args={[b.s, 16, 16]} />
          <Frosting color={color} />
        </mesh>
      ))}
    </>
  )
}

export function Cupcake({ accent = 'grape' }: Props) {
  const c = accentHex[accent]
  return (
    <group position={[0, -0.96, 0]}>
      {/* fluted liner */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.62, 0.44, 0.8, 26, 1, false]} />
        <meshStandardMaterial color={c} roughness={0.55} flatShading />
      </mesh>
      {/* cake dome peeking over the liner */}
      <mesh position={[0, 0.86, 0]} castShadow>
        <sphereGeometry args={[0.64, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Frosting color={dough.crumb} />
      </mesh>
      <group position={[0, 0.92, 0]}>
        <Swirl color={dough.cream} />
      </group>
      <Cherry position={[0, 1.78, 0]} />
    </group>
  )
}

export function Bun({ accent = 'mint' }: Props) {
  const c = accentHex[accent]
  // piped cream bulging out of the split, ringed around the seam
  const cream = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        return [Math.cos(a) * 0.94, 0, Math.sin(a) * 0.94] as [number, number, number]
      }),
    [],
  )

  return (
    <group>
      {/* bottom half */}
      <mesh position={[0, -0.3, 0]} scale={[1, 0.52, 1]} castShadow receiveShadow>
        <sphereGeometry args={[1.02, 40, 28]} />
        <meshStandardMaterial color={dough.golden} roughness={0.78} />
      </mesh>

      {/* cream layer in the split */}
      <mesh position={[0, -0.02, 0]} castShadow>
        <cylinderGeometry args={[0.92, 0.92, 0.26, 40]} />
        <Frosting color={dough.cream} />
      </mesh>
      {cream.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <sphereGeometry args={[0.17, 16, 16]} />
          <Frosting color={dough.cream} />
        </mesh>
      ))}

      {/* top half, sitting slightly askew like a real split bun */}
      <group position={[0, 0.26, 0]} rotation={[0.06, 0, -0.05]}>
        <mesh scale={[0.98, 0.5, 0.98]} castShadow receiveShadow>
          <sphereGeometry args={[1.0, 40, 28]} />
          <meshStandardMaterial color={dough.golden} roughness={0.78} />
        </mesh>
        {/* accent dusting so the card colour carries through */}
        {[0, 1, 2, 3, 4].map((i) => {
          const a = i * 2.399963
          const r = 0.55 * Math.sqrt((i + 0.6) / 5)
          return (
            <mesh key={i} position={[Math.cos(a) * r, 0.46, Math.sin(a) * r]} rotation={[0, i, 0.5]}>
              <capsuleGeometry args={[0.035, 0.1, 4, 8]} />
              <meshStandardMaterial color={c} roughness={0.4} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

function Chips({
  count,
  color,
  radius,
  y,
  size,
  seed = 1,
}: {
  count: number
  color: string
  radius: number
  y: number
  size: number
  seed?: number
}) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // sunflower spiral: deterministic, and spreads evenly across the disc
        // instead of clumping the way a modulo scatter does
        const a = (i + seed) * 2.399963
        const r = radius * Math.sqrt((i + 0.6) / count)
        return {
          pos: [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number],
          rot: [(i % 3) * 0.6, i * 0.9, (i % 5) * 0.4] as [number, number, number],
        }
      }),
    [count, radius, y, seed],
  )
  return (
    <>
      {items.map((c, i) => (
        <mesh key={i} position={c.pos} rotation={c.rot} castShadow>
          <dodecahedronGeometry args={[size, 0]} />
          <meshStandardMaterial color={color} roughness={0.35} />
        </mesh>
      ))}
    </>
  )
}

export function Cookie({ accent = 'tangerine' }: Props) {
  return (
    <group rotation={[0, 0, 0.04]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.05, 1, 0.26, 40]} />
        <meshStandardMaterial color={dough.crumb} roughness={0.85} />
      </mesh>
      <Chips count={11} color={dough.cocoa} radius={0.82} y={0.15} size={0.13} />
      <Chips count={5} color={accentHex[accent]} radius={0.9} y={0.14} size={0.07} seed={3} />
    </group>
  )
}

export function HealthyCookie({ accent = 'sky' }: Props) {
  return (
    <group rotation={[0, 0, -0.04]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.02, 0.98, 0.3, 36]} />
        <meshStandardMaterial color={dough.oat} roughness={0.95} flatShading />
      </mesh>
      {/* oats and seeds */}
      <Chips count={14} color="#f0e0c0" radius={0.8} y={0.17} size={0.09} seed={2} />
      <Chips count={7} color="#4a3524" radius={0.86} y={0.17} size={0.06} seed={5} />
      <Chips count={4} color={accentHex[accent]} radius={0.7} y={0.17} size={0.06} seed={7} />
    </group>
  )
}

export function Donut({ accent = 'butter' }: Props) {
  const c = accentHex[accent]
  const sprinkles = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const a = (i / 26) * Math.PI * 2 * 3.7
        const tube = 0.34
        const wobble = ((i * 0.618) % 1 - 0.5) * 1.2
        const x = (0.78 + Math.cos(wobble) * tube * 0.85) * Math.cos(a)
        const z = (0.78 + Math.cos(wobble) * tube * 0.85) * Math.sin(a)
        const y = Math.sin(wobble) * tube * 0.85 + 0.06
        return {
          pos: [x, y, z] as [number, number, number],
          rot: [i * 0.7, i * 1.3, i * 0.4] as [number, number, number],
          color: Object.values(accentHex)[i % 6],
        }
      }),
    [],
  )
  return (
    <group rotation={[0, 0, 0.06]}>
      {/* deeper-baked dough so the glaze reads as a separate layer */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[0.78, 0.34, 24, 48]} />
        <meshStandardMaterial color={dough.crumb} roughness={0.78} />
      </mesh>
      {/* glaze sits proud of the dough and only covers the top half */}
      <mesh position={[0, 0.1, 0]} scale={[1.02, 0.82, 1.02]}>
        <torusGeometry args={[0.78, 0.35, 24, 48]} />
        <Glaze color={c} />
      </mesh>
      {sprinkles.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot}>
          <capsuleGeometry args={[0.036, 0.1, 4, 8]} />
          <meshStandardMaterial color={s.color} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * A stack of fudge brownies. Dark crumb with a paler crackled top, since that
 * split-sugar crust is the thing people actually look for.
 */
export function Brownie({ accent = 'grape' }: Props) {
  const c = accentHex[accent]
  const squares = [
    { pos: [-0.05, -0.34, 0.05] as [number, number, number], rot: 0.06 },
    { pos: [0.06, 0.02, -0.04] as [number, number, number], rot: -0.14 },
    { pos: [-0.02, 0.38, 0.03] as [number, number, number], rot: 0.09 },
  ]

  return (
    <group rotation={[0, 0.5, 0]}>
      {squares.map((s, i) => (
        <group key={i} position={s.pos} rotation={[0, s.rot, 0]}>
          {/* the fudgy body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.25, 0.34, 1.25]} />
            <meshStandardMaterial color="#3a2118" roughness={0.88} />
          </mesh>
          {/* crackled sugar crust, a shade lighter and slightly proud */}
          <mesh position={[0, 0.18, 0]}>
            <boxGeometry args={[1.22, 0.04, 1.22]} />
            <meshStandardMaterial color="#6b4430" roughness={0.6} flatShading />
          </mesh>
        </group>
      ))}

      {/* a couple of chocolate chunks resting on top */}
      <mesh position={[0.24, 0.62, 0.16]} rotation={[0.4, 0.6, 0.2]} castShadow>
        <boxGeometry args={[0.22, 0.16, 0.22]} />
        <meshStandardMaterial color="#24140e" roughness={0.5} />
      </mesh>
      <mesh position={[-0.28, 0.6, -0.14]} rotation={[0.2, 1.1, 0.5]} castShadow>
        <boxGeometry args={[0.18, 0.14, 0.18]} />
        <meshStandardMaterial color="#24140e" roughness={0.5} />
      </mesh>

      {/* the accent shows up as a thin drizzle rather than colouring the bake */}
      <mesh position={[0, 0.58, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
        <torusGeometry args={[0.42, 0.028, 10, 32, Math.PI * 1.3]} />
        <Glaze color={c} />
      </mesh>
    </group>
  )
}
