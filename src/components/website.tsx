import React from 'react'
import { Card, CardContent } from './ui/card'
import { Episode } from '@/types'
import { Textarea } from './ui/textarea'
import { returnNZSTString, returnPSTString } from '@/lib/utils'

const Website = ({ episode }: { episode: Episode }) => {
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="row-span-2">
            <div>
              <div className="font-bold text-lg">Guest Name</div>
              <div>{episode.guest_name}</div>
            </div>
            {episode.guest_twitter && (
              <div>
                <div className="font-bold text-lg">Guest Twitter</div>
                <div>{episode.guest_name}</div>
              </div>
            )}
          </div>
          <div>
            <div className="font-bold text-lg">Title</div>
            <div>{episode.title}</div>
          </div>
          <div className="col-span-2">
            <div className="font-bold text-lg">Description</div>
            <Textarea defaultValue={episode.description} />
          </div>
          <div>
            <div className="font-bold text-lg">US Date</div>
            <div>{returnPSTString(episode.date)}</div>
          </div>
          <div>
            <div className="font-bold text-lg">NZ Date</div>
            <div>{returnNZSTString(episode.date)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Website
