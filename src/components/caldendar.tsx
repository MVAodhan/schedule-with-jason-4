import { Clipboard } from 'lucide-react'
import { Button } from './ui/button'
import { Episode } from '@/types'
import { liveLink, returnPSTString } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { Card, CardContent } from './ui/card'
import { useState } from 'react'
import { Checkbox } from './ui/checkbox'

const Caldendar = ({ episode }: { episode: Episode }) => {
  const [calendarScheduled, setCalendarScheduled] = useState<boolean>(false)
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="">{`LWJ: ${episode.title}`}</div>
              <Button variant="ghost">
                <Clipboard onClick={() => navigator.clipboard.writeText(`LWJ: ${episode.title}`)} />
              </Button>
            </div>

            <div>
              <div>Date (PST)</div>
              <div>{returnPSTString(episode.date)}</div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="">Invite</div>
              <Button
                variant="ghost"
                onClick={() =>
                  navigator.clipboard.writeText(
                    'lengstorf.com_9plj1m6u9vtddldoinl0hs2vgk@group.calendar.google.com',
                  )
                }
              >
                <Clipboard />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="">Location</div>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(liveLink)
                }}
              >
                <Clipboard />
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 col-span-2">
            <div className="w-full">
              <div className="">Description</div>
            </div>
            <div className="w-full flex items-center">
              <Textarea defaultValue={episode.description} />
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(episode.description)
                }}
              >
                <Clipboard />
              </Button>
            </div>
            <div className="w-full">
              <div>Scheduled</div>
              <Checkbox
                defaultChecked={calendarScheduled}
                onCheckedChange={() => setCalendarScheduled((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Caldendar
