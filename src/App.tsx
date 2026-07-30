import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { TrustRibbon } from './sections/TrustRibbon'
import { Categories } from './sections/Categories'
import { Bestsellers } from './sections/Bestsellers'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Testimonials } from './sections/Testimonials'
import { FAQ } from './sections/FAQ'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { SharedCanvas } from './three/Stage'
import { useSmoothScroll } from './lib/hooks'

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
        <Categories />
        <Bestsellers />
        <Process />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      {/* single WebGL context shared by every 3D moment on the page */}
      <SharedCanvas eventSource={root} />
    </div>
  )
}
