import { FeaturePreviewVideo } from './FeaturePreviewVideo'

type DestinyProductPreviewProps = {
  className?: string
  wide?: boolean
  interactive?: boolean
  priority?: boolean
}

/** Product-page feature preview (same file as homepage inline block). */
export function DestinyProductPreview({
  className = '',
  wide = false,
  interactive = false,
  priority = false,
}: DestinyProductPreviewProps) {
  return (
    <FeaturePreviewVideo
      className={className}
      variant="product"
      wide={wide}
      interactive={interactive}
      priority={priority}
    />
  )
}
