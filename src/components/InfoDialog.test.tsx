import { expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-react'
import { en } from '../content/en'
import { feedbackIssueUrl, paperUrl } from '../content/links'
import { InfoDialog } from './InfoDialog'

async function openDialog() {
  await render(<InfoDialog />)
  await page.getByRole('button', { name: en.info.open }).click()
  const dialog = page.getByRole('dialog', { name: en.info.title })
  await expect.element(dialog).toBeVisible()
  return dialog
}

it('is closed until asked for', async () => {
  await render(<InfoDialog />)
  await expect.element(page.getByRole('dialog')).not.toBeInTheDocument()
})

it('explains the map and who made it', async () => {
  const dialog = await openDialog()
  await expect.element(dialog.getByText(en.info.overview)).toBeVisible()
  await expect.element(dialog.getByText(en.info.about)).toBeVisible()
})

it('links to the paper', async () => {
  const dialog = await openDialog()
  await expect
    .element(dialog.getByRole('link', { name: en.info.paperLink }))
    .toHaveAttribute('href', paperUrl)
})

it('invites feedback through GitHub', async () => {
  const dialog = await openDialog()
  await expect
    .element(dialog.getByRole('link', { name: en.info.feedbackLink }))
    .toHaveAttribute('href', feedbackIssueUrl)
})

it.each([
  ['the close button in the corner', 0],
  ['the close button at the foot', 1],
])('closes with %s', async (_, index) => {
  const dialog = await openDialog()
  await dialog.getByRole('button', { name: en.info.close }).nth(index).click()
  await expect.element(dialog).not.toBeInTheDocument()
})

it('closes with the Escape key', async () => {
  const dialog = await openDialog()
  await userEvent.keyboard('{Escape}')
  await expect.element(dialog).not.toBeInTheDocument()
})
