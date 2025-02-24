import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Episode } from '@/types'
import { Textarea } from './ui/textarea'
import { returnNZSTString, returnPSTString } from '@/lib/utils'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { pb } from '@/lib/pocketbase'
import { toast } from '@/hooks/use-toast'
import Title from './title'

const Website = ({ episode }: { episode: Episode }) => {
  const [websiteScheduled, setWebsiteScheduled] = useState<boolean>(false)

  const updateWebsiteStatus = async () => {
    await pb.collection('episodes').update(episode.id, { website: websiteScheduled })
  }
  return (
    <Card>
      <CardHeader>
        <Title episode={episode} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="row-span-2 flex flex-col gap-2">
            <div>
              <div className="font-semibold italic text-md"> Name</div>
              <div>{episode.guest_name}</div>
            </div>
            {episode.guest_twitter && (
              <div>
                <div className="font-bold text-md">Twitter</div>
                <div>{episode.guest_twitter}</div>
              </div>
            )}
          </div>

          <div className="col-span-2">
            <div className="font-semibold italic text-md">Description</div>
            <Textarea defaultValue={episode.description} />
          </div>
          <div>
            <div className="font-semibold italic text-md">NZ Date</div>
            <div>{returnNZSTString(episode.date)}</div>
          </div>
          <div>
            <div className="font-semibold italic text-md">US Date</div>
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
          <Button
            onClick={() => {
              updateWebsiteStatus()
              toast({
                title: 'Updated Website Status',
              })
            }}
          >
            Update website status
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Website
