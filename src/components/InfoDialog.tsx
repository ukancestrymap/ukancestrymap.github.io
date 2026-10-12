// Ports the "More Information" overlay in UserInterface.js from the original
// frontend (OxfordRSE/fastsmc_app_frontend), adding the overview of how to read
// the map that used to be the dataset selector's help text.

import { useCopy } from '../content/useCopy'
import { feedbackIssueUrl, paperUrl } from '../content/links'
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
 * The "More information" button and the dialog it opens.
 *
 * @returns The button; the dialog opens over the page.
 */
export function InfoDialog() {
  const copy = useCopy()
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        {copy.info.open}
      </DialogTrigger>
      <DialogContent
        closeLabel={copy.info.close}
        className="max-h-[85dvh] overflow-y-auto sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle>{copy.info.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <p>{copy.info.overview}</p>
          <p>{copy.info.about}</p>
          <p>
            <LinkedText
              text={copy.info.feedback}
              link={copy.info.feedbackLink}
              href={feedbackIssueUrl}
            />
          </p>
          <p>
            <LinkedText
              text={copy.info.paper}
              link={copy.info.paperLink}
              href={paperUrl}
            />
          </p>
        </div>
        <DialogFooter showCloseButton closeLabel={copy.info.close} />
      </DialogContent>
    </Dialog>
  )
}
