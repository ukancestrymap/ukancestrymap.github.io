// New: modelled on the Chaste project's analytics page, it shows the site's
// visit statistics as the developers see them, from the analytics server's
// public dashboard.

import { analyticsDashboardUrl, plausibleUrl } from '../content/links'
import { useCopy } from '../content/useCopy'
import { useTheme } from '../hooks/useTheme'
import { LinkedText } from './LinkedText'
import { SubPage } from './SubPage'

/**
 * The analytics page, the whole of it.
 *
 * @returns The page, with a link back to the map.
 */
export function AnalyticsPage() {
  const { analytics } = useCopy()
  const { theme } = useTheme()
  // The dashboard drawn in the page's own theme.
  const embedded = `${analyticsDashboardUrl}&embed=true&theme=${theme}`
  return (
    <SubPage heading={analytics.heading}>
      <p>
        <LinkedText
          text={analytics.intro}
          link={analytics.policyLink}
          href={`${import.meta.env.BASE_URL}privacy/`}
        />
      </p>
      <p>
        <LinkedText
          text={analytics.elsewhere}
          link={analytics.statisticsLink}
          href={analyticsDashboardUrl}
        />
      </p>
      {/* As Plausible's own embed code has it: plausible-embed lets its embed
          script fit the height to the dashboard, 1600 px until then; a 1 px
          width stretched by min-width keeps it from overflowing on iOS. Its
          code also sets scrolling="no", deprecated HTML, which matters only
          before that script has fitted the height. */}
      <iframe
        plausible-embed=""
        src={embedded}
        title={analytics.statisticsTitle}
        loading="lazy"
        className="h-[1600px] w-px min-w-full"
      />
      <p className="text-sm text-muted-foreground">
        <LinkedText
          text={analytics.poweredBy}
          link={analytics.toolLink}
          href={plausibleUrl}
        />
      </p>
    </SubPage>
  )
}
