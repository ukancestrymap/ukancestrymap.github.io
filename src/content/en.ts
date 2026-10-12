// Every piece of user-visible text in the app. Components read it through
// useCopy(); none is written anywhere else, and lint rejects text in JSX.
//
// To add a language, copy this file (for example to cy.ts), declare the object
// as `Copy` so the compiler rejects missing or misspelled entries, and translate.
//
// Has no imports, because vite.config.ts also reads it to set the page title.
//
// Ports help_text.js from the original frontend (OxfordRSE/fastsmc_app_frontend):
// help_datatype and help_mode became help.measure and help.colourRange, and
// help_dataset, reworded without the dropped dataset selector, became
// info.overview in the information dialog. The dialog and footer text come from
// UserInterface.js and App.js.
//
// Sentences containing a link mark its place with {link}; the link's text is a
// separate entry, so a translation can move the link within the sentence.

/** All user-visible text, for one language. */
export interface Copy {
  /** The app's name: the page title and main heading. */
  readonly appTitle: string
  /** Shown while the data downloads. */
  readonly loading: string
  /** Shown if the data cannot be downloaded. */
  readonly loadError: string
  /** A percentage, such as "46%", given as a number of percent, such as 46. */
  readonly percent: (value: number) => string
  /** A percentage on a chart axis, with a set number of decimals. */
  readonly percentTick: (value: number, fractionDigits: number) => string
  /** Names of the two measures, as offered in the measure selector. */
  readonly measures: {
    readonly ancestors: string
    readonly genome: string
  }
  /** Names of the colour-range modes, as offered in the advanced settings. */
  readonly colourRangeModes: {
    readonly 'second-largest': string
    readonly percentiles: string
    readonly custom: string
  }
  /** Labels and descriptions of the controls in the side panel. */
  readonly controls: {
    /** Label of the measure selector. */
    readonly measure: string
    /** Label of the time slider; the help text refers to it by this name. */
    readonly years: string
    /** Explains the time slider. */
    readonly yearsDescription: string
    /** The time slider's current value, such as "600 years". */
    readonly yearsValue: (years: number) => string
    /** Label of the postcode entry. */
    readonly postcode: string
    /** Explains the postcode entry. */
    readonly postcodeDescription: string
    /** Shown in the empty postcode entry. */
    readonly postcodePlaceholder: string
    /** Name of the button that opens the list of postcode areas, for screen readers. */
    readonly postcodeList: string
    /** Shown when no area matches what was typed. */
    readonly noMatch: string
    /** An area in the postcode list, such as "Birmingham (B)". */
    readonly area: (name: string, code: string) => string
    /** An area in the postcode list that has no data and cannot be chosen. */
    readonly areaWithoutData: (name: string, code: string) => string
    /** Label of the checkbox revealing the advanced settings; the help text refers to it. */
    readonly showAdvanced: string
    /** Heading of the colour range settings. */
    readonly colourRange: string
    /** Explains the colour range settings. */
    readonly colourRangeDescription: string
    /** Label of the colour range mode selector. */
    readonly colourRangeMode: string
    /** Name of the colour range slider's lower handle, for screen readers. */
    readonly lightest: string
    /** Name of the colour range slider's upper handle, for screen readers. */
    readonly darkest: string
    /** The colour range slider's current values, in percent. */
    readonly rangeValues: (low: number, high: number) => string
    /** Label of the shareable link to the current view. */
    readonly shareLink: string
    /** Explains the shareable link. */
    readonly shareLinkDescription: string
    /** Name of the button that copies the shareable link, for screen readers. */
    readonly copyLink: string
    /** Announced once the link has been copied. */
    readonly linkCopied: string
    /** Name of a help button, for screen readers, such as "Help: Measure". */
    readonly help: (topic: string) => string
  }
  /** The details box below the controls. */
  readonly details: {
    /**
     * The selected area's strongest link with another area.
     *
     * @param selected - The selected area's place name, such as "Birmingham".
     * @param other - The other area's name and code, such as "Walsall (WS)".
     * @param percent - The link as a percentage of the selected area's link with itself.
     */
    readonly topLink: (
      selected: string,
      other: string,
      percent: string,
    ) => string
    /**
     * The link with the area under the pointer.
     *
     * @param selected - The selected area's place name.
     * @param other - The inspected area's name and code.
     * @param percent - The link as a percentage of the selected area's link with itself.
     * @param rank - Its rank among the other areas, 1 for the most related.
     * @param of - How many other areas there are.
     */
    readonly inspectedLink: (
      selected: string,
      other: string,
      percent: string,
      rank: number,
      of: number,
    ) => string
    /** Shown for an inspected area without data, given its name and code. */
    readonly inspectedNoData: (other: string) => string
    /** Shown until an area other than the selected one is inspected. */
    readonly inspectPrompt: string
    /** Text of the button that selects the area inspected by a tap. */
    readonly select: string
    /** Text of the button beside "no data" that explains it. */
    readonly why: string
    /** That button's full name for screen readers, given the area's name and code. */
    readonly whyLabel: (area: string) => string
    /** That button's full name for screen readers, given the area's name and code. */
    readonly selectLabel: (area: string) => string
    /** Heading of the chart. */
    readonly topAreas: string
    /** States the unit of the chart, given the selected area's place name. */
    readonly chartUnit: (selected: string) => string
    /** Describes the chart for screen readers. */
    readonly chartLabel: (area: string) => string
    /** One bar of the chart, for screen readers. */
    readonly chartEntry: (area: string, percent: string) => string
  }
  /** The dialog listing every area's exact values: also the text alternative to the map and chart. */
  readonly dataTable: {
    /** Label of the button that opens the dialog. */
    readonly open: string
    /** The dialog's title, given the selected area's name and code. */
    readonly title: (area: string) => string
    /**
     * Says what the table holds.
     *
     * @param selected - The selected area's place name.
     * @param measure - The measure's name, as in {@link Copy.measures}.
     * @param years - The time threshold in years.
     */
    readonly description: (
      selected: string,
      measure: string,
      years: number,
    ) => string
    /** Heading of the rank column. */
    readonly rank: string
    /** Heading of the area column. */
    readonly area: string
    /** Heading of the percentage column, given the selected area's code, which keeps it short. */
    readonly share: (code: string) => string
    /** Headings of the mean column, for each measure. */
    readonly mean: {
      readonly ancestors: string
      readonly genome: string
    }
    /** Heading of the interval column: a plain name, which the description explains. */
    readonly interval: string
    /** A percentage, such as "46.2%", given as a number of percent, finer than {@link Copy.percent}. */
    readonly percent: (value: number) => string
    /** A 95% interval in percent, such as "40.1%–53.2%". */
    readonly intervalValue: (lower: number, upper: number) => string
    /** An exact value of the measure, such as a mean. */
    readonly value: (value: number) => string
    /** Shown across the value columns of an area without data. */
    readonly noData: string
  }
  /** The dialog explaining an area without data. */
  readonly noData: {
    /** Its title, given the area's name and code. */
    readonly title: (area: string) => string
    /** The explanation. */
    readonly explanation: string
  }
  /** The colour theme menu. */
  readonly theme: {
    /** Name of the button that opens the menu. */
    readonly label: string
    /** Follow the device's light or dark setting. */
    readonly system: string
    /** Always light. */
    readonly light: string
    /** Always dark. */
    readonly dark: string
  }
  /** The map itself, for screen readers, and its zoom controls. */
  readonly map: {
    /** Names the map, a list of areas to move through with the keyboard. */
    readonly label: string
    /** Describes the map's keys, for screen readers. */
    readonly keys: string
    /** An area as a screen reader announces it, given its name and code and its percentage. */
    readonly option: (area: string, percent: string) => string
    /** An area without data, as a screen reader announces it. */
    readonly optionNoData: (area: string) => string
    /** Label of the zoom-in button. */
    readonly zoomIn: string
    /** Label of the zoom-out button. */
    readonly zoomOut: string
    /** Label of the button that returns to the whole map. */
    readonly resetZoom: string
  }
  /** The map's colour legend. */
  readonly legend: {
    /** Says what the colours show, given the selected area's place name. */
    readonly title: (selected: string) => string
    /** An end of the colour scale that values below it share, such as "8% or less". */
    readonly atMost: (percent: string) => string
    /** An end of the colour scale that values above it share, such as "46% or more". */
    readonly atLeast: (percent: string) => string
  }
  /** The information dialog. */
  readonly info: {
    /** Label of the button that opens the dialog. */
    readonly open: string
    /** The dialog's title. */
    readonly title: string
    /** Label of the buttons that close the dialog. */
    readonly close: string
    /** How to read the map. */
    readonly overview: string
    /** Who made the site, and the data it shows. */
    readonly about: string
    /** An invitation to send feedback; `{link}` marks where {@link Copy.info.feedbackLink} goes. */
    readonly feedback: string
    /** The feedback form, linked. */
    readonly feedbackLink: string
    /** Points to the paper; `{link}` marks where {@link Copy.info.paperLink} goes. */
    readonly paper: string
    /** The paper's citation, linked to it. */
    readonly paperLink: string
  }
  /** The credits at the foot of the side panel. */
  readonly credits: {
    /** The copyright notice: the legal owner, not the authors. */
    readonly copyright: string
    /** The people who made the site. */
    readonly developers: string
    /** Cites the published paper; `{link}` marks where {@link Copy.credits.paperLink} goes. */
    readonly paper: string
    /** The paper's DOI, linked to it. */
    readonly paperLink: string
    /** Cites the dataset; `{link}` marks where {@link Copy.credits.dataLink} goes. */
    readonly data: string
    /** The dataset's DOI, linked to it. */
    readonly dataLink: string
    /** The map boundaries' attribution, required by their licence: exactly as in data/PROVENANCE.md. */
    readonly map: readonly string[]
    /** Names the map's licence; `{link}` marks where {@link Copy.credits.mapLicenceLink} goes. */
    readonly mapLicence: string
    /** The map licence's name, linked to it. */
    readonly mapLicenceLink: string
    /** Label of the button that opens the full credits. */
    readonly open: string
    /** Title of the full credits' dialog. */
    readonly title: string
  }
  /** The accessibility statement, a page of its own. */
  readonly statement: {
    /** The page's title in the browser tab. */
    readonly pageTitle: string
    /** The footer's link to the page. */
    readonly link: string
    /** The link back to the map. */
    readonly back: string
    /** The page's heading. */
    readonly heading: string
    /** What the statement covers and who maintains the site. */
    readonly intro: string
    /** Introduces the list of what people should be able to do. */
    readonly ableTo: string
    /** What people should be able to do. */
    readonly abilities: readonly string[]
    /** Heading of the known limitations. */
    readonly limitationsHeading: string
    /** The known limitations. */
    readonly limitations: readonly string[]
    /** Heading of how to report a problem. */
    readonly reportingHeading: string
    /** How to report a problem; `{link}` marks where {@link Copy.statement.reportLink} goes. */
    readonly reporting: string
    /** The accessibility issue form, linked. */
    readonly reportLink: string
    /** What reporting needs, and what to expect. */
    readonly reportingNote: string
    /** Heading of the technical information. */
    readonly technicalHeading: string
    /** The standard aimed at; `{link}` marks where {@link Copy.statement.standardLink} goes. */
    readonly technical: string
    /** The standard's name, linked. */
    readonly standardLink: string
    /** Heading of how the site was tested. */
    readonly testingHeading: string
    /** Introduces the list of automated checks. */
    readonly testingIntro: string
    /** The automated checks. */
    readonly tests: readonly string[]
    /** The checks made by hand. */
    readonly testingByHand: string
    /** When the statement was prepared. */
    readonly prepared: string
  }
  /** Explanations shown in the help popovers. */
  readonly help: {
    /** The measure selector. */
    readonly measure: string
    /** The colour-range settings. */
    readonly colourRange: string
  }
}

// One sentence per line, joined for display, so edits produce clean diffs.
const sentences = (...lines: string[]) => lines.join(' ')

// Exact values span several orders of magnitude, so show 3 significant figures.
const value = new Intl.NumberFormat('en-GB', { maximumSignificantDigits: 3 })
const years = new Intl.NumberFormat('en-GB')
// Percentages of the selected area's link with itself, with a set number of
// decimals; a small but non-zero value reads "<1%" (or "<0.1%") rather than a
// misleading "0%".
const percentTo = (fractionDigits: number) => {
  const format = new Intl.NumberFormat('en-GB', {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
  const step = 10 ** -fractionDigits
  return (value: number) =>
    value > 0 && value < step / 2
      ? `<${format.format(step / 100)}`
      : format.format(value / 100)
}
// To the nearest 1% in the panel and the legend; to 0.1% in the table, where
// many areas share a whole percentage.
const asPercent = percentTo(0)
const asTablePercent = percentTo(1)
// Axis ticks, with as many decimals as their spacing needs.
const asTickPercent = (value: number, fractionDigits: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100)
// 1st, 2nd, 3rd, 4th, 11th, 21st and so on.
const ordinalRules = new Intl.PluralRules('en-GB', { type: 'ordinal' })
const ordinalSuffixes: Readonly<Partial<Record<Intl.LDMLPluralRule, string>>> =
  { one: 'st', two: 'nd', few: 'rd' }
const ordinal = (n: number) =>
  `${String(n)}${ordinalSuffixes[ordinalRules.select(n)] ?? 'th'}`

/** English text. */
export const en: Copy = {
  appTitle: 'UK Ancestry Map',
  loading: 'Loading the map...',
  loadError:
    'The map data could not be loaded. Please check your connection and reload the page.',
  percent: asPercent,
  percentTick: asTickPercent,

  measures: {
    ancestors: 'number of ancestors',
    genome: 'percent shared genome',
  },

  colourRangeModes: {
    'second-largest': 'second largest',
    percentiles: '95% percentiles',
    custom: 'set by user',
  },

  controls: {
    measure: 'Measure',
    years: 'Time threshold',
    yearsDescription: 'Ancestry calculated this many years in the past.',
    yearsValue: (count) => `${years.format(count)} years`,
    postcode: 'Postcode area',
    postcodeDescription: 'Type an area code, such as S or HA, or a place name.',
    postcodePlaceholder: 'Enter postcode...',
    postcodeList: 'Show all postcode areas',
    noMatch: 'No matching area.',
    area: (name, code) => `${name} (${code})`,
    areaWithoutData: (name, code) => `${name} (${code}): no data`,
    showAdvanced: 'Show advanced',
    colourRange: 'Colour range',
    colourRangeDescription:
      'Select the range of colours to display in the map.',
    colourRangeMode: 'Mode',
    lightest: 'Value shown in the lightest colour',
    darkest: 'Value shown in the darkest colour',
    rangeValues: (low, high) => `${asPercent(low)} to ${asPercent(high)}`,
    shareLink: 'Copy parameters',
    shareLinkDescription: 'Use this URL to save your current parameters.',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    help: (topic) => `Help: ${topic}`,
  },

  details: {
    topLink: (selected, other, share) =>
      `Most related: ${other}, at ${share} of ${selected}'s link with itself.`,
    inspectedLink: (selected, other, share, rank, of) =>
      `${other}: ${share} of ${selected}'s link with itself, the ${ordinal(rank)} most related of ${String(of)}.`,
    inspectedNoData: (other) => `${other}: no data.`,
    inspectPrompt:
      'Point at or tap an area on the map, or a bar in the chart, to compare it with the selected area.',
    select: 'Select',
    why: 'Why?',
    whyLabel: (area) => `Why is there no data for ${area}?`,
    selectLabel: (area) => `Select ${area}`,
    topAreas: 'Top 10 most related areas',
    chartUnit: (selected) =>
      `As a percentage of ${selected}'s link with itself.`,
    chartLabel: (area) =>
      `Bar chart of the 10 areas most related to ${area}, with error bars`,
    chartEntry: (area, share) => `${area}: ${share}`,
  },

  dataTable: {
    open: 'Show all values',
    title: (area) => `All values for ${area}`,
    description: (selected, measure, count) =>
      sentences(
        `Every area's link with ${selected} over the past ${years.format(count)} years, measured by ${measure}.`,
        `${selected} itself comes first, as the yardstick for the percentages; the other areas follow from the most related.`,
        'The likely range is the 95% confidence interval of each percentage.',
      ),
    rank: 'Rank',
    area: 'Area',
    share: (code) => `% of ${code}'s link with itself`,
    mean: {
      ancestors: 'Mean number of ancestors',
      genome: 'Mean percent shared genome',
    },
    interval: 'Likely range',
    percent: asTablePercent,
    // An en dash, the typographic mark for a range.
    intervalValue: (lower, upper) =>
      `${asTablePercent(lower)}–${asTablePercent(upper)}`,
    value: (mean) => value.format(mean),
    noData: 'no data',
  },

  noData: {
    title: (area) => `No data for ${area}`,
    // Deliberately general until the reason is confirmed.
    explanation: sentences(
      'There is not enough data for this area to estimate its genetic links with other areas.',
      'Areas without data are shown hatched in grey on the map.',
    ),
  },

  theme: {
    label: 'Colour theme',
    system: 'System',
    light: 'Light',
    dark: 'Dark',
  },

  map: {
    label: 'Map of UK postcode areas',
    keys: sentences(
      "Move between areas with the arrow keys, or type the start of an area's code or name to jump to it.",
      'Press Enter to select an area, and Escape to stop comparing.',
      'Zoom with plus and minus, and press 0 to see the whole map.',
    ),
    option: (area, share) => `${area}, ${share}`,
    optionNoData: (area) => `${area}, no data`,
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    resetZoom: 'Show the whole map',
  },

  legend: {
    title: (selected) => `% of ${selected}'s link with itself`,
    atMost: (share) => `${share} or less`,
    atLeast: (share) => `${share} or more`,
  },

  info: {
    open: 'More information',
    title: 'More information',
    close: 'Close',
    overview: sentences(
      'The map shows genetic relationships between UK postcode areas, measured by identity-by-descent (IBD) over the past 300 to 1,500 years, depending on the "Time threshold".',
      'The intensity of the colour reflects how closely related the selected area, outlined in orange, is to every other area.',
      'Areas hatched in grey have too little data for this analysis.',
      'Point at or tap an area to outline it in black and compare it; click it, or tap it again, to select it.',
      'With a keyboard, move to the map and use the arrow keys.',
      'Zoom in with the buttons on the map, the mouse wheel, or by pinching.',
      'More detail appears in the box below the controls.',
      'Use "Show advanced" to reveal additional settings.',
    ),
    about: sentences(
      'This website was developed by Fergus Cooper, Martin Robinson, Juba Nait Saada, and Pier Palamara, as part of research done at the University of Oxford, UK.',
      'The data reflects genetic relatedness in the past 1,500 years among samples from the UK Biobank data set, which contains the genomes of about 500,000 donors from the UK.',
    ),
    feedback:
      'We welcome feedback, bug reports, and comments on patterns reflecting historical or demographic events you may find in the data: please {link}.',
    feedbackLink: 'open an issue on GitHub',
    paper: 'Additional details on the analysis are in {link}.',
    paperLink: 'Nait Saada et al., Nature Communications 11, 6130 (2020)',
  },

  credits: {
    copyright: '© 2019-2026 University of Oxford.',
    developers:
      'Developed by Fergus Cooper, Martin Robinson, Juba Nait Saada and Pier Palamara.',
    paper: 'Paper: {link}.',
    paperLink: 'doi:10.1038/s41467-020-19588-x',
    data: 'Data: {link}, licensed under CC BY 4.0.',
    dataLink: 'doi:10.5281/zenodo.4012677',
    map: [
      'Postal Boundaries © GeoLytix copyright and database right 2012.',
      'Contains Ordnance Survey data © Crown copyright and database right 2012.',
      'Contains Royal Mail data © Royal Mail copyright and database right 2012.',
      'Contains National Statistics data © Crown copyright and database right 2012.',
    ],
    mapLicence: 'Map boundaries used under the {link}.',
    mapLicenceLink: 'Open Government Licence',
    open: 'Credits',
    title: 'Credits',
  },

  statement: {
    pageTitle: 'Accessibility statement: UK Ancestry Map',
    link: 'Accessibility',
    back: 'Back to the map',
    heading: 'Accessibility statement',
    intro: sentences(
      'This statement covers the UK Ancestry Map.',
      'The map is a research project, maintained by the people who developed it.',
    ),
    ableTo:
      'We want as many people as possible to be able to use it. For example, you should be able to:',
    abilities: [
      'use the whole site, the map included, with a keyboard alone',
      'use it on a touch screen: tap an area to compare it, and tap it again to select it',
      'zoom in to 400% without losing content, and use it on a narrow phone screen',
      'read every value without the map, in the table that "Show all values" opens',
      'choose a light or dark theme, or follow your device',
      "use your device's high-contrast colours, and turn off animation",
      "tell the map's colours apart with the commonest kinds of colour blindness",
    ],
    limitationsHeading: 'Known limitations',
    limitations: [
      'Many postcode areas, especially in London, are small when the whole map is shown. Zoom in with the buttons on the map, the mouse wheel or by pinching, or choose an area in the "Postcode area" box.',
      'The map shows how related areas are by colour. The same values are written in the details beside the map and in the table that "Show all values" opens.',
      'We have not yet tested the site by hand with screen readers, such as NVDA or VoiceOver.',
      'The site is only available in English.',
    ],
    reportingHeading: 'Reporting a problem',
    reporting:
      'If anything on the site is hard to use, or you cannot use it at all, please {link}. It helps to say what you were trying to do, and which device, browser and any assistive technology you used.',
    reportLink: 'report it on GitHub',
    reportingNote: sentences(
      'Reporting needs a free GitHub account.',
      'We read every report, but as a research project we cannot promise how soon we will reply.',
    ),
    technicalHeading: 'Technical information',
    technical: sentences(
      'We aim to meet the {link} at level AA.',
      'The site has not been audited independently, so we cannot say for certain that it does; the limitations we know of are listed above.',
    ),
    standardLink: 'Web Content Accessibility Guidelines (WCAG), version 2.2',
    testingHeading: 'How we tested the site',
    testingIntro: 'Automated checks run whenever the site changes:',
    tests: [
      'the axe-core accessibility checker, applying the WCAG 2.2 level A and AA rules in the light and dark themes and with high-contrast colours',
      'checks that the page fits a narrow screen, keeps all its text with wider letter, word and line spacing, and does not animate when less motion is asked for',
      'tests that the map works with a keyboard and on a touch screen, and that its colours keep enough contrast, and stay in order with simulated colour blindness',
    ],
    testingByHand:
      'The developers also checked the site by hand, with a keyboard and in desktop browsers.',
    prepared: 'This statement was prepared on 12 October 2026.',
  },

  help: {
    measure: sentences(
      'Select which measure of shared genetic ancestry to display.',
      '"Percent shared genome" measures the percentage of the genome that two typical individuals from the two areas share identical-by-descent, inherited from common ancestors who lived between today and the selected time threshold.',
      'This is usually a very small fraction, because little of the genome is inherited from ancestors who lived in recent centuries.',
      '"Number of ancestors" measures how many genetic ancestors two typical individuals from the two areas share on average over the same period.',
      'These numbers are also usually small.',
      "The map and the panel show each area's link as a percentage of the selected area's link with itself, which is usually the strongest.",
    ),

    colourRange: sentences(
      'This option sets the colour range used on the map, which can magnify patterns within a particular band of genetic relatedness.',
      'Clicking on different areas shows that the strongest genetic relationships are almost always between individuals living in the same postcode area.',
      'For instance, individuals from Birmingham (B) are more closely related to other individuals from Birmingham than to individuals from any other area.',
      'The pattern holds across nearly all areas, even cosmopolitan ones such as London.',
      'It reflects limited movement of genetic ancestors ("gene flow") in recent centuries, known as isolation by distance.',
      'If the lightest colour meant no shared ancestry and the darkest meant the largest value for the selected area, the map would be almost white everywhere except the selected area itself, hiding the patterns between different areas.',
      'You can see this by choosing "set by user" and dragging the range to its full extent.',
      'To bring out intermediate relationships, choose "second largest" or "95% percentiles".',
      '"Second largest" sets the lightest colour to zero shared ancestry and the darkest to the second largest value for the selected area.',
      '"95% percentiles" ignores the lowest and highest 5% of areas, setting the lightest colour to the 5th percentile and the darkest to the 95th.',
    ),
  },
}
