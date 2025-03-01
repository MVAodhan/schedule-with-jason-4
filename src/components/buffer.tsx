'use client'

import { Episode } from '@/types'
import { Card, CardContent, CardHeader } from './ui/card'
import { Textarea } from './ui/textarea'
import { Clipboard } from 'lucide-react'
import { Button } from './ui/button'
import { useRef, useState } from 'react'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'
import { liveTweet, ninetyMinuteTweet, returnPSTDate, twoWeekTweet } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { pb } from '@/lib/pocketbase'
import Title from './title'

const Buffer = ({ episode }: { episode: Episode }) => {
  const bufferDescRef = useRef<HTMLTextAreaElement>(null)
  const [ytLiveLinkDefault, setYtLiveLinkDefault] = useState('')

  const [twTweet, setTwTweet] = useState(false)
  const [nmTweet, setNmTweet] = useState(false)
  const [lTweet, setLTweet] = useState(false)

  const updateBufferStatuses = async () => {
    await pb.collection('episodes').update(episode!.id, {
      youtube_link: ytLiveLinkDefault,
      scheduled_tweet: twTweet,
      ninety_minute_tweet: nmTweet,
      live_tweet: lTweet,
    })
  }
  return (
    <Card>
      <CardHeader>
        <Title episode={episode} />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col py-2 gap-2">
          <div>Buffer Description</div>
          {episode.guest_twitter && (
            <Button
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(episode.guest_twitter!)}
            >
              <Clipboard />
              Guest Twitter Handel
            </Button>
          )}
          <div className="flex items-center">
            <Textarea defaultValue={episode.description} ref={bufferDescRef} />
            <Button
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(bufferDescRef.current?.value as string)}
            >
              <Clipboard />
            </Button>
          </div>
          <div className="w-full">
            <div>Youtube Link</div>
            <Input onChange={(e) => setYtLiveLinkDefault(e.target.value)} />
          </div>
          {ytLiveLinkDefault.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 py-5">
              <div className="flex flex-col justify-center gap-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      twoWeekTweet(episode.description, ytLiveLinkDefault),
                    )
                    toast({
                      title: 'Copied Two Week Tweet',
                    })
                  }}
                >
                  <Clipboard />
                  Two Weeks
                </Button>
                <div className="flex justify-center">
                  {returnPSTDate(episode.date, 'two weeks')}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      ninetyMinuteTweet(episode.description, ytLiveLinkDefault),
                    )
                    toast({
                      title: 'Copied Ninety Minute Tweet',
                    })
                  }}
                >
                  <Clipboard />
                  Ninety Munutes
                </Button>
                <div className="flex justify-center">
                  {returnPSTDate(episode.date, 'ninety minutes')}
                </div>
              </div>
              <div className="flex flex-col justify-center gap-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(liveTweet(episode.description))
                    toast({
                      title: 'Copied Live Tweet',
                    })
                  }}
                >
                  <Clipboard />
                  Live
                </Button>
                <div className="flex justify-center">{returnPSTDate(episode.date)}</div>
              </div>
              <div className="flex justify-around">
                <div>Two Weeks</div>
                <Checkbox
                  defaultChecked={twTweet}
                  onCheckedChange={() => setTwTweet((prev) => !prev)}
                />
              </div>
              <div className="flex justify-around">
                <div>Ninety Minutes</div>
                <Checkbox
                  defaultChecked={nmTweet}
                  onCheckedChange={() => setNmTweet((prev) => !prev)}
                />
              </div>
              <div className="flex justify-around">
                <div>Live</div>
                <Checkbox
                  defaultChecked={lTweet}
                  onCheckedChange={() => setLTweet((prev) => !prev)}
                />
              </div>
              <Button className="w-full col-span-3" onClick={updateBufferStatuses}>
                Update buffer status
              </Button>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default Buffer
