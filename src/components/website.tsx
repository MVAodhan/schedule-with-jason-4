import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Episode } from '@/types'
import { Textarea } from './ui/textarea'
import { returnNZSTString, returnPSTString } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'

const Website = ({ episode }: { episode: Episode }) => {
  const [websiteScheduled, setWebsiteScheduled] = useState<boolean>(false)
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="row-span-2 flex flex-col gap-2">
            <div>
              <div className="font-bold text-md"> Name</div>
              <div>{episode.guest_name}</div>
            </div>
            {episode.guest_twitter && (
              <div>
                <div className="font-bold text-md">Twitter</div>
                <div>{episode.guest_twitter}</div>
              </div>
            )}
          </div>
          <div>
            <div className="font-bold text-md">Title</div>
            <div>{episode.title}</div>
          </div>
          <div className="col-span-2">
            <div className="font-bold text-md">Description</div>
            <Textarea defaultValue={episode.description} />
          </div>
          <div>
            <div className="font-bold text-md">NZ Date</div>
            <div>{returnNZSTString(episode.date)}</div>
          </div>
          <div>
            <div className="font-bold text-md">US Date</div>
            <div>{returnPSTString(episode.date)}</div>
          </div>
        </div>
        <div className="mt-2 flex flex-col">
          <div>
            <div>Scheduled</div>
            <Checkbox
              defaultChecked={websiteScheduled}
              onCheckedChange={() => setWebsiteScheduled((prev) => !prev)}
            />
          </div>
          <Button>Update website status</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Website
