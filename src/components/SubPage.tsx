// The layout of the site's text pages, such as the accessibility statement and
// the privacy page: a link back to the map and the theme menu, then the text.

import type { ReactNode } from 'react'
import { useCopy } from '../content/useCopy'
import { ThemeMenu } from './ThemeMenu'

/**
 * A text page: a narrow column with a link back to the map.
 *
 * @param props - The page's heading and its content.
 * @returns The whole page.
 */
export function SubPage({
  heading,
  children,
}: {
  readonly heading: string
  readonly children: ReactNode
}) {
  const copy = useCopy()
  return (
    <div className="mx-auto flex max-w-prose flex-col gap-8 px-4 py-6">
      <header className="flex items-center justify-between gap-2">
        <a
          href={import.meta.env.BASE_URL}
          className="text-sm underline underline-offset-4 hover:text-foreground"
        >
          {copy.statement.back}
        </a>
        <ThemeMenu />
      </header>
      <main className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold">{heading}</h1>
        {children}
      </main>
    </div>
  )
}

/**
 * A section of a text page, under its own heading.
 *
 * @param props - The section's heading and its content.
 * @returns The section.
 */
export function Section({
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

/**
 * A bulleted list of sentences or phrases from the copy.
 *
 * @param props - The items.
 * @returns The list.
 */
export function List({ items }: { readonly items: readonly string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
