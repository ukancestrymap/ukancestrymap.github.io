// New: the original frontend (OxfordRSE/fastsmc_app_frontend) had no
// accessibility statement. Loosely follows the GOV.UK model statement, as a best
// effort for a research project rather than a public body's service: what works,
// the known limitations, how to report a problem, the standard aimed at, and how
// the site was tested.

import type { ReactNode } from 'react'
import { accessibilityIssueUrl, wcagUrl } from '../content/links'
import { useCopy } from '../content/useCopy'
import { LinkedText } from './LinkedText'
import { ThemeMenu } from './ThemeMenu'

function Section({
  heading,
  children,
}: {
  readonly heading: string
  readonly children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">{heading}</h2>
      {children}
    </section>
  )
}

function List({ items }: { readonly items: readonly string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/**
 * The accessibility statement, the whole of its page.
 *
 * @returns The page's content, with a link back to the map.
 */
export function AccessibilityStatement() {
  const copy = useCopy()
  const { statement } = copy
  return (
    <div className="mx-auto flex max-w-prose flex-col gap-8 px-4 py-6">
      <header className="flex items-center justify-between gap-2">
        <a
          href={import.meta.env.BASE_URL}
          className="text-sm underline underline-offset-4 hover:text-foreground"
        >
          {statement.back}
        </a>
        <ThemeMenu />
      </header>
      <main className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold">{statement.heading}</h1>
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
      </main>
    </div>
  )
}
