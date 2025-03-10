import { Clipboard } from 'lucide-react'
import { Button } from './ui/button'
import { Episode } from '@/types'
import { liveLink, returnNZSTString, returnPSTString } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader } from './ui/card'
import { useState } from 'react'
import { Checkbox } from './ui/checkbox'
import Title from './title'
import { useToast } from '@/hooks/use-toast'
import { pb } from '@/lib/pocketbase'

const Caldendar = ({ episode }: { episode: Episode }) => {
  const [calendarScheduled, setCalendarScheduled] = useState<boolean>(false)
  const { toast } = useToast()

  const updateCalendar = async () => {
    await pb.collection('episode').update(episode!.id, {
      calendar: calendarScheduled,
    })
    toast({
      title: 'Updated Calendar Status',
    })
  }
  return (
    <Card>
      <CardHeader>
        <Title episode={episode} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="col-span-2 flex justify-center">
            <div className="">{`LWJ: ${episode.title}`}</div>
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(`LWJ: ${episode.title}`)
                toast({
                  title: 'Copied Calendar Title',
                })
              }}
            >
              <Clipboard />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <div>Date (PST)</div>
              <div>{returnPSTString(episode.date)}</div>
            </div>
            <div>
              <div>Date (NZST)</div>
              <div>{returnNZSTString(episode.date)}</div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <div className="">Invite</div>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(
                    'lengstorf.com_9plj1m6u9vtddldoinl0hs2vgk@group.calendar.google.com',
                  )
                  toast({
                    title: 'Copied Invite',
                  })
                }}
              >
                <Clipboard />
              </Button>
            </div>
            <div className="flex items-center ">
              <div className="">Location</div>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(liveLink)
                  toast({
                    title: 'Copied location',
                  })
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
                  toast({
                    title: 'Copied description',
                  })
                }}
              >
                <Clipboard />
              </Button>
            </div>
            <div className="mt-2 flex flex-col w-full">
              <div>
                <div>Scheduled</div>
                <Checkbox
                  defaultChecked={calendarScheduled}
                  onCheckedChange={() => setCalendarScheduled((prev) => !prev)}
                />
              </div>
              <Button
                onClick={() => {
                  updateCalendar()
                }}
              >
                Update calendar status
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Caldendar
