import { motion, useScroll, useSpring } from 'framer-motion'
import { Suspense, lazy, useRef } from 'react'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { TrustRibbon } from './sections/TrustRibbon'
import { Gallery } from './sections/Gallery'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Testimonials } from './sections/Testimonials'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { useSmoothScroll } from './lib/hooks'

// Three.js is by far the heaviest dependency here, so the entire 3D layer is
// pulled in after the page has painted rather than blocking it.
const SharedCanvas = lazy(() => import('./three/SharedCanvas'))

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-berry via-butter to-mint"
    />
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  useSmoothScroll()

  return (
    <div ref={root} className="relative">
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />
        <TrustRibbon />
        <Gallery />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* single WebGL context shared by every 3D moment on the page */}
      <Suspense fallback={null}>
        <SharedCanvas eventSource={root} />
      </Suspense>
    </div>
  )
}
