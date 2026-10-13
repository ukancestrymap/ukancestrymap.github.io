import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { en } from '../content/en'
import { feedbackIssueUrl, plausibleDataPolicyUrl } from '../content/links'
import { PrivacyPolicy } from './PrivacyPolicy'

const { privacy } = en

it('says what is and is not counted', async () => {
  const screen = await render(<PrivacyPolicy />)
  await expect
    .element(screen.getByRole('heading', { level: 1 }))
    .toHaveTextContent(privacy.heading)
  for (const item of [...privacy.counted, ...privacy.notCounted]) {
    await expect
      .element(screen.getByRole('listitem').filter({ hasText: item }))
      .toBeInTheDocument()
  }
  await expect.element(screen.getByText(privacy.storage)).toBeVisible()
})

it.each([
  [
    'the analytics page',
    privacy.statisticsLink,
    `${import.meta.env.BASE_URL}analytics/`,
  ],
  ["Plausible's data policy", privacy.policyLink, plausibleDataPolicyUrl],
  ['the feedback form', privacy.questionLink, feedbackIssueUrl],
])('links to %s', async (_, name, href) => {
  const screen = await render(<PrivacyPolicy />)
  await expect
    .element(screen.getByRole('link', { name }))
    .toHaveAttribute('href', href)
})
