import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { TrustRibbon } from './sections/TrustRibbon'
import { CakeStyles } from './sections/CakeStyles'
import { Gallery } from './sections/Gallery'
import { Signature } from './sections/Signature'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Testimonials } from './sections/Testimonials'
import { FAQ } from './sections/FAQ'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { MoreBakes } from './sections/MoreBakes'
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

/**
 * React Router does not restore or resolve scroll itself: land at the top of a
 * new page, but honour a hash when one was carried across from another page.
 */
function ScrollBehaviour() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // wait a frame so the target section has actually mounted
      const id = requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(id)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

function Home() {
  return (
    <main>
      <Hero />
      <TrustRibbon />
      <CakeStyles />
      <Gallery />
      <Signature />
      <Process />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  useSmoothScroll()

  return (
    <div ref={root} className="relative">
      <ScrollProgress />
      <ScrollBehaviour />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more" element={<MoreBakes />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />

      {/* single WebGL context shared by every 3D moment on the page */}
      <SharedCanvas eventSource={root} />
    </div>
  )
}
