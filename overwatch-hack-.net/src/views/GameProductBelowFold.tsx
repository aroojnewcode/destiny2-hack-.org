import { SiteFooter } from '../components/SiteFooter'
import { FaqSection } from '../components/FaqSection'
import { FeaturePreviewSection } from '../components/FeaturePreviewSection'
import { IncludedControlsSection } from '../components/IncludedControlsSection'
import { PRODUCT_PAGE_FAQS } from '../data/faqs'
import { PRODUCT_PATH } from '../data/site'
import { DESTINY_PRODUCT_COVER } from '../data/media'

/** Product page content below the buy card — deferred until near viewport. */
export function GameProductBelowFold() {
  return (
    <>
      <IncludedControlsSection />

      <FeaturePreviewSection
        layout="stack"
        excludeSrc={[DESTINY_PRODUCT_COVER]}
      />

      <FaqSection
        heading="Destiny 2 Hack FAQ"
        intro="Status, features, delivery and load questions before checkout."
        items={PRODUCT_PAGE_FAQS}
      />

      <SiteFooter currentPath={PRODUCT_PATH} />
    </>
  )
}
