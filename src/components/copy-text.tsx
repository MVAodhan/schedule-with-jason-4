import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { generateYoutubeDescription } from '@/lib/utils'
import { Episode, ListLink } from '@/types'

const CopyText = ({ episode, links }: { episode: Episode; links: ListLink[] }) => {
  return (
    <Card>
      <CardContent>
        <Button
          onClick={() => navigator.clipboard.writeText(generateYoutubeDescription(episode, links))}
        >
          Youtube Description
        </Button>
      </CardContent>
    </Card>
  )
}

export default CopyText
