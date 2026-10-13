// The end-to-end tests' `test`, with each page answering every request to the
// analytics server itself: the counting script in Deploy's builds, which its
// tests rebuild, and the privacy page's embedded dashboard. So the tests count
// no visits and do not depend on that server.

import { test as base } from '@playwright/test'
import { analyticsOrigin } from '../src/content/links.ts'

export { expect, type Page } from '@playwright/test'

/** Playwright's `test`, with the analytics server's responses empty. */
export const test = base.extend({
  // Playwright names the second argument `use`, which React's lint takes for its hook.
  page: async ({ page }, provide) => {
    await page.route(`${analyticsOrigin}/**`, (route) =>
      route.fulfill({ body: '' }),
    )
    await provide(page)
  },
})
