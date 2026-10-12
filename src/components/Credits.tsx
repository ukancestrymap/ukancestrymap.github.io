// Ports the credit line in App.js from the original frontend
// (OxfordRSE/fastsmc_app_frontend), adding the dataset's DOI and the
// attribution that the map boundaries' licence requires. Only the copyright
// line shows in the panel; the full credits open in a dialog, as the Open
// Government Licence lets the attribution be linked rather than always shown.

import { dataUrl, mapLicenceUrl, paperUrl } from '../content/links'
import { useCopy } from '../content/useCopy'
import { LinkedText } from './LinkedText'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

/**
 * The credits at the foot of the side panel: a copyright line, and a button
 * opening the full credits.
 *
 * @returns The copyright line and the button; the dialog opens over the page.
 */
export function Credits() {
  const copy = useCopy()
  return (
    <footer className="flex items-center justify-between gap-2 border-t pt-4 text-xs text-muted-foreground">
      <p>{copy.credits.copyright}</p>
      <div className="flex items-center gap-1">
        {/* The accessibility statement, a page of its own. */}
        <a
          href={`${import.meta.env.BASE_URL}accessibility/`}
          className="px-2 underline-offset-4 hover:text-foreground hover:underline"
        >
          {copy.statement.link}
        </a>
        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="ghost"
                size="xs"
                className="text-muted-foreground"
              />
            }
          >
            {copy.credits.open}
          </DialogTrigger>
          <DialogContent
            closeLabel={copy.info.close}
            className="max-h-[85dvh] overflow-y-auto sm:max-w-lg"
          >
            <DialogHeader>
              <DialogTitle>{copy.credits.title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <p>{copy.credits.copyright}</p>
              <p>{copy.credits.developers}</p>
              <p>
                <LinkedText
                  text={copy.credits.paper}
                  link={copy.credits.paperLink}
                  href={paperUrl}
                />
              </p>
              <p>
                <LinkedText
                  text={copy.credits.data}
                  link={copy.credits.dataLink}
                  href={dataUrl}
                />
              </p>
              <p>
                {copy.credits.map.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p>
                <LinkedText
                  text={copy.credits.mapLicence}
                  link={copy.credits.mapLicenceLink}
                  href={mapLicenceUrl}
                />
              </p>
            </div>
            <DialogFooter showCloseButton closeLabel={copy.info.close} />
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  )
}
