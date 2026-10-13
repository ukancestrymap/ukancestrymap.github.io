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

/** The OxfordRSE Plausible analytics server, which counts the site's visits. */
export const analyticsOrigin = 'https://plausible-oxrse.fly.dev'

/**
 * The Plausible analytics script.
 *
 * @remarks
 * Only the Deploy workflow's builds include it (see vite.config.ts), so
 * development, pull requests and the tests count nothing.
 */
export const analyticsScriptUrl = `${analyticsOrigin}/js/script.js`

/** Plausible's script that sizes an embedded dashboard to its content. */
export const analyticsEmbedScriptUrl = `${analyticsOrigin}/js/embed.host.js`

/**
 * The site's public dashboard on the analytics server, which the analytics
 * page embeds: the same statistics the developers see.
 */
export const analyticsDashboardUrl = `${analyticsOrigin}/share/ukancestrymap.github.io?auth=1Kv10qOIp8YY_NdfPio4c`

/** Plausible Analytics, the tool that counts the site's visits. */
export const plausibleUrl = 'https://plausible.io/'

/** Plausible's account of what it collects and why. */
export const plausibleDataPolicyUrl = 'https://plausible.io/data-policy'
