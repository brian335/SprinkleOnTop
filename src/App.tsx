import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { TrustRibbon } from './sections/TrustRibbon'
import { Gallery } from './sections/Gallery'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Testimonials } from './sections/Testimonials'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

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
    </div>
  )
}
