'use client'

import { Episode } from '@/types'
import { Card, CardContent } from './ui/card'
import { Textarea } from './ui/textarea'
import { Clipboard } from 'lucide-react'
import { Button } from './ui/button'
import { useRef, useState } from 'react'
import { Input } from './ui/input'
import { Checkbox } from './ui/checkbox'

const Buffer = ({ episode }: { episode: Episode }) => {
  const bufferDescRef = useRef<HTMLTextAreaElement>(null)
  const [ytLiveLinkDefault, setYtLiveLinkDefault] = useState('')
  return (
    <Card>
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
              <div className="flex justify-center">
                <Button>
                  <Clipboard />
                  Two Weeks
                </Button>
              </div>
              <div className="flex justify-center">
                <Button>
                  <Clipboard />
                  Ninety Munutes
                </Button>
              </div>
              <div className="flex justify-center">
                <Button>
                  <Clipboard />
                  Live
                </Button>
              </div>
              <div className="flex justify-around">
                <div>Two Weeks</div>
                <Checkbox />
              </div>
              <div className="flex justify-around">
                <div>Ninety Minutes</div>
                <Checkbox />
              </div>
              <div className="flex justify-around">
                <div>Line</div>
                <Checkbox />
              </div>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default Buffer
