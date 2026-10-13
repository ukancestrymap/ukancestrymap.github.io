import { expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-react'
import { en } from '../content/en'
import { analyticsDashboardUrl, plausibleUrl } from '../content/links'
import { AnalyticsPage } from './AnalyticsPage'

// A dashboard address that loads nothing, so the tests make no request to the
// analytics server.
vi.mock('../content/links', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../content/links')>()),
  analyticsDashboardUrl: 'about:blank#dashboard',
}))

const { analytics } = en

it('embeds the public dashboard, named for screen readers, in the page theme', async () => {
  const screen = await render(<AnalyticsPage />)
  await expect
    .element(screen.getByTitle(analytics.statisticsTitle))
    .toHaveAttribute('src', `${analyticsDashboardUrl}&embed=true&theme=light`)
})

it.each([
  [
    'the privacy policy',
    analytics.policyLink,
    `${import.meta.env.BASE_URL}privacy/`,
  ],
  [
    'the dashboard on its own page',
    analytics.statisticsLink,
    analyticsDashboardUrl,
  ],
  ['Plausible', analytics.toolLink, plausibleUrl],
])('links to %s', async (_, name, href) => {
  const screen = await render(<AnalyticsPage />)
  await expect
    .element(screen.getByRole('link', { name }))
    .toHaveAttribute('href', href)
})
