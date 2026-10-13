// New: the original frontend (OxfordRSE/fastsmc_app_frontend) loaded Google
// Analytics without saying so. Modelled on the Chaste project's privacy policy:
// what is and is not counted, and where to see the statistics or ask.

import { feedbackIssueUrl, plausibleDataPolicyUrl } from '../content/links'
import { useCopy } from '../content/useCopy'
import { LinkedText } from './LinkedText'
import { List, Section, SubPage } from './SubPage'

/**
 * The privacy policy, the whole of its page.
 *
 * @returns The page, with a link back to the map.
 */
export function PrivacyPolicy() {
  const { privacy } = useCopy()
  return (
    <SubPage heading={privacy.heading}>
      <p>{privacy.intro}</p>
      <Section heading={privacy.countedHeading}>
        <List items={privacy.counted} />
      </Section>
      <Section heading={privacy.notCountedHeading}>
        <List items={privacy.notCounted} />
        <p>{privacy.storage}</p>
      </Section>
      <Section heading={privacy.transparencyHeading}>
        <p>
          <LinkedText
            text={privacy.transparency}
            link={privacy.statisticsLink}
            href={`${import.meta.env.BASE_URL}analytics/`}
          />
        </p>
      </Section>
      <Section heading={privacy.moreHeading}>
        <p>
          <LinkedText
            text={privacy.policy}
            link={privacy.policyLink}
            href={plausibleDataPolicyUrl}
          />
        </p>
        <p>
          <LinkedText
            text={privacy.question}
            link={privacy.questionLink}
            href={feedbackIssueUrl}
          />
        </p>
      </Section>
      <p className="text-sm text-muted-foreground">{privacy.updated}</p>
    </SubPage>
  )
}
