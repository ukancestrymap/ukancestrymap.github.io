import { expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { en } from '../content/en'
import { dataUrl, mapLicenceUrl, paperUrl } from '../content/links'
import { Credits } from './Credits'

async function openCredits() {
  await render(<Credits />)
  await page.getByRole('button', { name: en.credits.open }).click()
  const dialog = page.getByRole('dialog', { name: en.credits.title })
  await expect.element(dialog).toBeVisible()
  return dialog
}

it('shows only the copyright line and a button in the panel', async () => {
  const screen = await render(<Credits />)
  await expect.element(screen.getByText(en.credits.copyright)).toBeVisible()
  await expect
    .element(screen.getByRole('button', { name: en.credits.open }))
    .toBeVisible()
  await expect
    .element(page.getByText(en.credits.developers))
    .not.toBeInTheDocument()
})

it('links to the text pages beneath the copyright line, in order', async () => {
  const screen = await render(<Credits />)
  const nav = screen.getByRole('navigation', { name: en.credits.pages })
  const links = nav
    .getByRole('link')
    .elements()
    .map((link) => [link.textContent, link.getAttribute('href')])
  const base = import.meta.env.BASE_URL
  expect(links).toEqual([
    [en.statement.link, `${base}accessibility/`],
    [en.privacy.link, `${base}privacy/`],
    [en.analytics.link, `${base}analytics/`],
  ])
})

it('shows the developers in the dialog', async () => {
  const dialog = await openCredits()
  await expect.element(dialog.getByText(en.credits.developers)).toBeVisible()
})

it('links to the published paper by its DOI, within its sentence', async () => {
  const dialog = await openCredits()
  const link = dialog.getByRole('link', { name: en.credits.paperLink })
  await expect.element(link).toHaveAttribute('href', paperUrl)
  expect(link.element().parentElement?.textContent).toBe(
    en.credits.paper.replace('{link}', en.credits.paperLink),
  )
})

it('links to the dataset by its DOI, within its sentence', async () => {
  const dialog = await openCredits()
  const link = dialog.getByRole('link', { name: en.credits.dataLink })
  await expect.element(link).toHaveAttribute('href', dataUrl)
  expect(link.element().parentElement?.textContent).toBe(
    en.credits.data.replace('{link}', en.credits.dataLink),
  )
})

it('links to the map licence', async () => {
  const dialog = await openCredits()
  await expect
    .element(dialog.getByRole('link', { name: en.credits.mapLicenceLink }))
    .toHaveAttribute('href', mapLicenceUrl)
})

it.each(en.credits.map)('shows the map attribution "%s"', async (line) => {
  const dialog = await openCredits()
  await expect.element(dialog.getByText(line, { exact: true })).toBeVisible()
})

it('closes with the Escape key', async () => {
  const dialog = await openCredits()
  await userEvent.keyboard('{Escape}')
  await expect.element(dialog).not.toBeInTheDocument()
})
