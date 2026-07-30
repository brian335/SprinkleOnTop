import { PhotoSlab, usePhotoTexture } from '../PhotoSlab'
import { Sprinkles } from '../Sprinkles'
import { Stage3D } from '../Stage'
import type { AccentName } from '../../lib/site'

/**
 * A single cake photo standing as a lit print. Used for the smaller accents
 * around the page, and loaded on demand along with the rest of the 3D.
 */
export default function PrintStage({
  src,
  accent,
  className,
  distance = 5.6,
  maxWidth = 2.4,
  maxHeight = 3,
  sprinkles = 0,
  lightIntensity = 1,
  shadow = 'contact',
}: {
  src: string
  accent: AccentName
  className: string
  distance?: number
  maxWidth?: number
  maxHeight?: number
  sprinkles?: number
  lightIntensity?: number
  shadow?: 'contact' | 'fake' | 'none'
}) {
  const texture = usePhotoTexture(src)
  if (!texture) return null

  return (
    <Stage3D
      className={className}
      distance={distance}
      elevation={5}
      spin={0}
      tilt={0.8}
      shadow={shadow}
      lightIntensity={lightIntensity}
    >
      <PhotoSlab texture={texture} maxWidth={maxWidth} maxHeight={maxHeight} accent={accent} />
      {sprinkles > 0 && <Sprinkles count={sprinkles} spread={[2.8, 2.4, 1.4]} size={0.9} />}
    </Stage3D>
  )
}
