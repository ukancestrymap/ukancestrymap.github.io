// New: the original frontend (OxfordRSE/fastsmc_app_frontend) had no
// accessibility statement. Loosely follows the GOV.UK model statement, as a best
// effort for a research project rather than a public body's service: what works,
// the known limitations, how to report a problem, the standard aimed at, and how
// the site was tested.

import { accessibilityIssueUrl, wcagUrl } from '../content/links'
import { useCopy } from '../content/useCopy'
import { LinkedText } from './LinkedText'
import { List, Section, SubPage } from './SubPage'

/**
 * The accessibility statement, the whole of its page.
 *
 * @returns The page, with a link back to the map.
 */
export function AccessibilityStatement() {
  const { statement } = useCopy()
  return (
    <SubPage heading={statement.heading}>
      <div className="flex flex-col gap-3">
        <p>{statement.intro}</p>
        <p>{statement.ableTo}</p>
        <List items={statement.abilities} />
      </div>
      <Section heading={statement.limitationsHeading}>
        <List items={statement.limitations} />
      </Section>
      <Section heading={statement.reportingHeading}>
        <p>
          <LinkedText
            text={statement.reporting}
            link={statement.reportLink}
            href={accessibilityIssueUrl}
          />
        </p>
        <p>{statement.reportingNote}</p>
      </Section>
      <Section heading={statement.technicalHeading}>
        <p>
          <LinkedText
            text={statement.technical}
            link={statement.standardLink}
            href={wcagUrl}
          />
        </p>
      </Section>
      <Section heading={statement.testingHeading}>
        <p>{statement.testingIntro}</p>
        <List items={statement.tests} />
        <p>{statement.testingByHand}</p>
      </Section>
      <p className="text-sm text-muted-foreground">{statement.prepared}</p>
    </SubPage>
  )
}
