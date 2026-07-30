import { CakeCarousel } from '../CakeCarousel'
import { Sprinkles } from '../Sprinkles'
import { Stage3D } from '../Stage'

/** The hero's sliding row of cakes. Loaded on demand, never in the first paint. */
export default function CarouselStage({ compact }: { compact: boolean }) {
  return (
    <Stage3D
      className="absolute inset-0"
      distance={compact ? 7.4 : 6.2}
      elevation={4}
      tilt={0}
      spin={0}
      floatIntensity={0}
      shadow="none"
    >
      <CakeCarousel spacing={compact ? 1.95 : 2.05} />
      <Sprinkles count={compact ? 35 : 70} spread={[4.6, 3, 1.6]} />
    </Stage3D>
  )
}
