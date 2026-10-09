import { HomeHero } from './HomeHero'
import { HomeBelowFold } from './HomeBelowFold'

/** Full home page when mounted as a single island (tests / storybook). */
export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      <HomeHero />
      <HomeBelowFold />
    </div>
  )
}
