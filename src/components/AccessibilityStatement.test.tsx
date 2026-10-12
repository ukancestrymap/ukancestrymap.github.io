import { expect, it } from 'vitest'
import { render } from 'vitest-browser-react'
import { en } from '../content/en'
import { accessibilityIssueUrl, wcagUrl } from '../content/links'
import { AccessibilityStatement } from './AccessibilityStatement'

const { statement } = en

it('is headed as the accessibility statement, with a section for each part', async () => {
  const screen = await render(<AccessibilityStatement />)
  await expect
    .element(screen.getByRole('heading', { level: 1 }))
    .toHaveTextContent(statement.heading)
  const sections = screen
    .getByRole('heading', { level: 2 })
    .elements()
    .map((heading) => heading.textContent)
  expect(sections).toEqual([
    statement.limitationsHeading,
    statement.reportingHeading,
    statement.technicalHeading,
    statement.testingHeading,
  ])
})

it('lists what works and the known limitations', async () => {
  const screen = await render(<AccessibilityStatement />)
  for (const item of [...statement.abilities, ...statement.limitations]) {
    await expect
      .element(screen.getByRole('listitem').filter({ hasText: item }))
      .toBeInTheDocument()
  }
})

it.each([
  ['the accessibility issue form', statement.reportLink, accessibilityIssueUrl],
  ['the standard', statement.standardLink, wcagUrl],
  ['back to the map', statement.back, import.meta.env.BASE_URL],
])('links to %s', async (_, name, href) => {
  const screen = await render(<AccessibilityStatement />)
  await expect
    .element(screen.getByRole('link', { name }))
    .toHaveAttribute('href', href)
})

it('says when it was prepared', async () => {
  const screen = await render(<AccessibilityStatement />)
  await expect.element(screen.getByText(statement.prepared)).toBeVisible()
})
