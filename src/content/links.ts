// Addresses the app links to. Kept apart from the copy in en.ts because they are
// the same in every language.

/**
 * The paper describing the analysis, as published.
 *
 * @remarks
 * The original app linked the bioRxiv preprint instead.
 */
export const paperUrl = 'https://doi.org/10.1038/s41467-020-19588-x'

/** The published dataset the map shows. */
export const dataUrl = 'https://doi.org/10.5281/zenodo.4012677'

/** The licence of the map boundaries, which asks to be linked where possible. */
export const mapLicenceUrl =
  'https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/'

/**
 * The site's repository on GitHub: its source, history and issues.
 *
 * @remarks
 * The site's final home. Until it moves there, this and the issue links below
 * lead nowhere.
 */
export const repositoryUrl =
  'https://github.com/ukancestrymap/ukancestrymap.github.io'

/** The issue form for reporting an accessibility problem. */
export const accessibilityIssueUrl = `${repositoryUrl}/issues/new?template=accessibility.yml`

/** The issue form for feedback, a bug or an idea. */
export const feedbackIssueUrl = `${repositoryUrl}/issues/new?template=feedback.yml`

/** The accessibility standard the site aims to meet. */
export const wcagUrl = 'https://www.w3.org/TR/WCAG22/'
